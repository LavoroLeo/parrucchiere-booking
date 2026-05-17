/**
 * HYBRID STORAGE SYSTEM
 * PRIMARY: localStorage (always available, fast)
 * SECONDARY: Firebase REST API (backup/sync when available)
 *
 * Se cancella cache → localStorage è sempre disponibile
 * Se Firebase down → localStorage funziona da solo
 * Se Firebase up → sincronizza dati in background
 */

const FIREBASE_DB_URL = 'https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app';
const BUSINESS_ID = 'demo-parrucchiere-rossi';

// 🔐 CODICI DI ACCESSO PARRUCCHIERE (20 cifre + 20 lettere)
const ACCESS_CODE_NUMBERS = '82947365019284756301';  // 20 cifre
const ACCESS_CODE_LETTERS = 'KXMQPVLZNRWHJDGFCBYA';  // 20 lettere

console.log('%c💾 HYBRID STORAGE SYSTEM INIZIALIZZATO', 'color: #00ff00; font-size: 14px; font-weight: bold');
console.log('✅ PRIMARY: localStorage (locale, sempre disponibile)');
console.log('✅ SECONDARY: Firebase (backup opzionale)');

// ============================================
// LOCALSTORAGE - PRIMARY (sempre disponibile)
// ============================================

const LocalStorage = {
    load() {
        try {
            const saved = localStorage.getItem('bookingDB');
            if (saved) {
                const data = JSON.parse(saved);
                console.log('💾 Dati caricati da localStorage');
                return data;
            }
        } catch (e) {
            console.warn('⚠️ Errore lettura localStorage:', e.message);
        }
        return this.getDefaultData();
    },

    save(data) {
        try {
            localStorage.setItem('bookingDB', JSON.stringify(data));
            console.log('💾 Dati salvati in localStorage');
            return true;
        } catch (e) {
            console.warn('⚠️ Errore salvataggio localStorage:', e.message);
            return false;
        }
    },

    getDefaultData() {
        return {
            bookings: [],
            clients: [],
            services: [
                { id: 1, name: 'Taglio Uomo', description: 'Taglio classico', price: 25, duration: 30, icon: '✂️' },
                { id: 2, name: 'Taglio Donna', description: 'Taglio e styling', price: 35, duration: 45, icon: '💇' },
                { id: 3, name: 'Trattamento', description: 'Barba o viso', price: 20, duration: 20, icon: '🧖' },
                { id: 4, name: 'Colore', description: 'Colorazione completa', price: 80, duration: 120, icon: '💇‍♀️' },
                { id: 5, name: 'pedicure', description: 'rtghyjug', price: 30, duration: 40, icon: '✨' }
            ],
            reviews: [],
            settings: {
                name: 'Parrucchiere Rossi',
                phone: '+39 011 555 1234',
                email: 'info@parrucchiererossi.it',
                address: 'Via Roma 15, Torino',
                hoursStart: '09:00',
                hoursEnd: '18:00',
                satStart: '09:00',
                satEnd: '14:00'
            },
            socialLinks: {
                facebook: 'https://facebook.com/parrucchiererossi',
                instagram: 'https://instagram.com/parrucchiererossi',
                tiktok: 'https://tiktok.com/@parrucchiererossi'
            },
            parrucchieri: [
                {
                    id: 'p1',
                    name: 'Marco',
                    surname: 'Rossi',
                    email: 'admin@salone.it',
                    password: 'DemoPass123!',
                    isOwner: true,
                    specializations: ['Taglio Uomo', 'Taglio Donna', 'Colore', 'Barba'],
                    hoursStart: '09:00',
                    hoursEnd: '18:00',
                    satStart: '09:00',
                    satEnd: '14:00',
                    phone: '+39 011 555 1234',
                    photo: '',
                    socialLinks: {
                        facebook: 'https://facebook.com/parrucchiererossi',
                        instagram: 'https://instagram.com/parrucchiererossi',
                        tiktok: 'https://tiktok.com/@parrucchiererossi'
                    }
                },
                {
                    id: 'p2',
                    name: 'Anna',
                    surname: 'Bianchi',
                    email: 'parrucchiere1@salone.it',
                    password: 'DemoPass456!',
                    isOwner: false,
                    specializations: ['Taglio Donna', 'Styling', 'Colore'],
                    hoursStart: '10:00',
                    hoursEnd: '17:00',
                    satStart: '09:00',
                    satEnd: '14:00',
                    phone: '+39 333 444 555',
                    photo: ''
                }
            ],
            securityCodes: {
                accessCode1: '82947365019284756301',
                accessCode2: 'KXMQPVLZNRWHJDGFCBYA',
                description: 'Codici di accesso per la pagina di login parrucchiere'
            }
        };
    }
};

// ============================================
// FIREBASE - SECONDARY (backup/sync opzionale)
// ============================================

const FirebaseSync = {
    async load() {
        try {
            console.log('🔄 Sincronizzando da Firebase...');
            const response = await fetch(
                `${FIREBASE_DB_URL}/businesses/${BUSINESS_ID}.json`,
                { method: 'GET' }
            );

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log('🔥 Dati sincronizzati da Firebase');
                    // Salva in localStorage come backup
                    localStorage.setItem('bookingDB', JSON.stringify(data));
                    return data;
                }
            }
        } catch (error) {
            console.log('⚠️ Firebase non disponibile:', error.message);
        }
        return null;
    },

    async save(data) {
        try {
            const response = await fetch(
                `${FIREBASE_DB_URL}/businesses/${BUSINESS_ID}.json`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );

            if (response.ok) {
                console.log('🔥 Dati sincronizzati su Firebase');
                return true;
            }
        } catch (error) {
            console.log('⚠️ Firebase sync fallito:', error.message);
        }
        return false;
    }
};

// ============================================
// HYBRID DATABASE ADAPTER
// ============================================

const DatabaseAdapter = {
    async load() {
        // 1. Carica da localStorage (primary)
        let data = LocalStorage.load();

        // 2. SE localStorage è vuoto (cache cancellata) → carica da Firebase
        if (!data || (data.bookings && data.bookings.length === 0 && data.clients && data.clients.length === 0)) {
            console.log('⚠️ localStorage vuoto, ripristino da Firebase...');
            const firebaseData = await FirebaseSync.load();
            if (firebaseData) {
                data = firebaseData;
                // Salva immediatamente in localStorage per future sessioni
                LocalStorage.save(data);
                console.log('✅ Dati ripristinati da Firebase e salvati in localStorage');
            }
        }

        // 3. In background, sincronizza sempre con Firebase per dati più recenti
        (async () => {
            const firebaseData = await FirebaseSync.load();
            if (firebaseData) {
                // Se Firebase ha dati, assicura che localStorage sia aggiornato
                data = firebaseData;
                LocalStorage.save(data);
                console.log('🔄 Sincronizzazione completata con Firebase');
            }
        })();

        return data;
    },

    async save(data) {
        // 1. Salva SEMPRE in localStorage (primary - garantito e immediato)
        const localResult = LocalStorage.save(data);

        // 2. Prova a sincronizzare su Firebase in background
        (async () => {
            await FirebaseSync.save(data);
        })();

        return localResult; // Ritorna il risultato di localStorage (la sola che importa)
    }
};

// ============================================
// UTILITY FUNCTIONS - PARRUCCHIERI
// ============================================

function getParrucchieri() {
    const data = LocalStorage.load();
    return data.parrucchieri || [];
}

function getParrucchiereById(parrucchiereId) {
    const parrucchieri = getParrucchieri();
    return parrucchieri.find(p => p.id === parrucchiereId);
}

function getAvailableSlots(parrucchiereId, date) {
    const data = LocalStorage.load();
    const parrucchiere = getParrucchiereById(parrucchiereId);

    if (!parrucchiere) return [];

    // FIX BUG: Usa local date, non UTC
    const dateObj = new Date(date + 'T00:00:00');
    const dayOfWeek = dateObj.getDay(); // 0=domenica, 6=sabato
    const isSaturday = dayOfWeek === 6;
    const hoursStart = isSaturday ? parrucchiere.satStart : parrucchiere.hoursStart;
    const hoursEnd = isSaturday ? parrucchiere.satEnd : parrucchiere.hoursEnd;

    // Genera gli slot disponibili (ogni 30 minuti)
    const slots = [];

    // BUG FIX: Null check per orari
    if (!hoursStart || !hoursEnd) {
        console.warn('⚠️ Orari non configurati per parrucchiere:', parrucchiereId);
        return [];
    }

    const [startH, startM] = hoursStart.split(':').map(Number);
    const [endH, endM] = hoursEnd.split(':').map(Number);

    // FIX BUG: Includi l'ultima ora
    for (let h = startH; h <= endH; h++) {
        for (let m = 0; m < 60; m += 30) {
            // Non aggiungere slot dopo l'orario di fine
            if (h === endH && m > 0) break;
            if (h > endH) break;

            const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

            // Controlla se è già occupato
            const isOccupied = data.bookings.some(b =>
                b.parrucchiereId === parrucchiereId &&
                b.date === date &&
                b.time === timeStr &&
                b.status !== 'cancelled'
            );

            slots.push({
                time: timeStr,
                available: !isOccupied
            });
        }
    }

    return slots;
}

function addParrucchiere(parrucchiere) {
    const data = LocalStorage.load();

    // Genera ID univoco
    parrucchiere.id = 'p' + Date.now();
    parrucchiere.isOwner = false;

    if (!data.parrucchieri) {
        data.parrucchieri = [];
    }

    data.parrucchieri.push(parrucchiere);
    LocalStorage.save(data);

    // BUG FIX: Sincronizza immediatamente con Firebase
    (async () => {
        await FirebaseSync.save(data);
        console.log('🔥 Parrucchiere sincronizzato con Firebase:', parrucchiere.id);
    })();

    console.log('✅ Parrucchiere aggiunto:', parrucchiere.name, parrucchiere.id);
    return parrucchiere;
}

function updateParrucchiere(parrucchiereId, updates) {
    const data = LocalStorage.load();

    // BUG FIX: Null check per parrucchieri array
    if (!data.parrucchieri || data.parrucchieri.length === 0) {
        console.warn('⚠️ Nessun parrucchiere trovato');
        return null;
    }

    const index = data.parrucchieri.findIndex(p => p.id === parrucchiereId);

    if (index !== -1) {
        data.parrucchieri[index] = { ...data.parrucchieri[index], ...updates };
        LocalStorage.save(data);

        // BUG FIX: Sincronizza con Firebase
        (async () => {
            await FirebaseSync.save(data);
        })();

        console.log('✅ Parrucchiere aggiornato:', parrucchiereId);
        return data.parrucchieri[index];
    }

    console.warn('⚠️ Parrucchiere non trovato:', parrucchiereId);
    return null;
}

// ============================================
// UTILITY FUNCTIONS - CODICI ACCESSO
// ============================================

function updateSecurityCodes(newAccessCode1, newAccessCode2) {
    const data = LocalStorage.load();

    if (!data.securityCodes) {
        data.securityCodes = {};
    }

    data.securityCodes.accessCode1 = newAccessCode1;
    data.securityCodes.accessCode2 = newAccessCode2;
    data.securityCodes.description = 'Codici di accesso per la pagina di login parrucchiere';

    // Salva in localStorage
    LocalStorage.save(data);
    console.log('💾 Security codes salvati in localStorage');

    // Sincronizza immediatamente con Firebase
    (async () => {
        const result = await FirebaseSync.save(data);
        if (result) {
            console.log('🔥 Security codes sincronizzati con Firebase');
        } else {
            console.warn('⚠️ Errore sincronizzazione security codes con Firebase');
        }
    })();

    console.log('✅ Security codes aggiornati:');
    console.log('   Code1 (20 cifre):', newAccessCode1);
    console.log('   Code2 (20 lettere):', newAccessCode2);

    return data.securityCodes;
}

function getSecurityCodes() {
    const data = LocalStorage.load();
    return data.securityCodes || null;
}

// ============================================
// UTILITY FUNCTIONS - GENERALI
// ============================================

function isFirebaseEnabled() {
    console.log('✅ Sistema ibrido attivo (localStorage + Firebase opzionale)');
    return true; // Il sistema funziona sempre perché localStorage è sempre disponibile
}

async function initializeDatabase() {
    return DatabaseAdapter.load();
}

// ============================================
// EXPORTS
// ============================================

window.DatabaseAdapter = DatabaseAdapter;
window.FirebaseSync = FirebaseSync;
window.LocalStorage = LocalStorage;
window.isFirebaseEnabled = isFirebaseEnabled;
window.initializeDatabase = initializeDatabase;
window.getParrucchieri = getParrucchieri;
window.getParrucchiereById = getParrucchiereById;
window.getAvailableSlots = getAvailableSlots;
window.addParrucchiere = addParrucchiere;
window.updateParrucchiere = updateParrucchiere;
window.updateSecurityCodes = updateSecurityCodes;
window.getSecurityCodes = getSecurityCodes;

console.log('%c✅ SISTEMA IBRIDO PRONTO', 'color: #00ff00; font-size: 14px; font-weight: bold');
console.log('📊 localStorage (Primary) ✅ SEMPRE DISPONIBILE');
console.log('🔥 Firebase (Secondary) ✅ BACKUP/SYNC OPZIONALE');

// ============================================
// NOTIFICATION SYSTEM - MONITORAGGIO PRENOTAZIONI
// ============================================

// Carica il notification handler
const script1 = document.createElement('script');
script1.src = 'notification-handler.js';
document.head.appendChild(script1);

// Carica il parrucchieri selector
const script2 = document.createElement('script');
script2.src = 'parrucchieri-selector.js';
document.head.appendChild(script2);

// Carica il booking interceptor (aggiunge parrucchiereId)
const script3 = document.createElement('script');
script3.src = 'booking-interceptor.js';
document.head.appendChild(script3);

// Carica il dashboard columns modifier (aggiunge colonna parrucchiere)
const script4 = document.createElement('script');
script4.src = 'dashboard-columns.js';
document.head.appendChild(script4);

// Carica il create collega modal
const script5 = document.createElement('script');
script5.src = 'create-collega-modal.js';
document.head.appendChild(script5);

// Carica il collega dashboard (filtra prenotazioni per collega)
const script6 = document.createElement('script');
script6.src = 'collega-dashboard.js';
document.head.appendChild(script6);

// Avvia il monitoraggio delle prenotazioni
async function startBookingMonitoring() {
    console.log('👁️ Avvio monitoraggio prenotazioni...');

    let lastBookingStates = {};

    // Monitora ogni 5 secondi le prenotazioni
    setInterval(async () => {
        try {
            const data = await DatabaseAdapter.load();
            if (!data || !data.bookings) return;

            data.bookings.forEach(booking => {
                const bookingKey = booking.id;
                const currentStatus = booking.status;
                const lastStatus = lastBookingStates[bookingKey];

                // Se lo stato cambia a "completata"
                if (lastStatus !== 'completata' && currentStatus === 'completata') {
                    console.log('🎉 Prenotazione completata:', booking.clientName, bookingKey);

                    // Mostra notifica al cliente
                    if (window.NotificationSystem) {
                        window.NotificationSystem.showNotification(
                            '✂️ Prenotazione Completata!',
                            `La tua prenotazione con ${booking.service} è terminata. Grazie per aver scelto Parrucchiere Rossi!`,
                            booking.token,
                            booking.id
                        );
                    }
                }

                // Aggiorna lo stato
                lastBookingStates[bookingKey] = currentStatus;
            });
        } catch (error) {
            console.log('⚠️ Errore monitoraggio prenotazioni:', error.message);
        }
    }, 5000); // Controlla ogni 5 secondi
}

// Avvia il monitoraggio quando il database è pronto
setTimeout(() => {
    startBookingMonitoring();
}, 2000);
