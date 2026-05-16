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
                { id: 4, name: 'Colore', description: 'Colorazione completa', price: 80, duration: 120, icon: '💇‍♀️' }
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
            parrucchiere: [
                { email: 'demo@parrucchiererossi.it', password: 'demo2026', name: 'Demo Admin' },
                { email: 'parrucchiere@parrucchiererossi.it', password: '123456', name: 'Parrucchiere Rossi' }
            ]
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
// UTILITY FUNCTIONS
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

console.log('%c✅ SISTEMA IBRIDO PRONTO', 'color: #00ff00; font-size: 14px; font-weight: bold');
console.log('📊 localStorage (Primary) ✅ SEMPRE DISPONIBILE');
console.log('🔥 Firebase (Secondary) ✅ BACKUP/SYNC OPZIONALE');
