/* ========================================
   FIREBASE DATABASE LAYER
   Provides abstraction for data storage
   Falls back to localStorage if Firebase not configured
   ======================================== */

// Check if Firebase is available and configured
function isFirebaseEnabled() {
    try {
        const enabled = typeof firebase !== 'undefined' &&
               typeof firebase.database === 'function' &&
               firebase.apps &&
               firebase.apps.length > 0;
        console.log('🔥 Firebase enabled:', enabled);
        if (enabled) {
            console.log('✅ Firebase SDK caricato correttamente');
        }
        return enabled;
    } catch (e) {
        console.warn('🔥 Firebase check failed:', e.message);
        return false;
    }
}

// Storage abstraction layer
const DatabaseAdapter = {
    // Load all data
    async load() {
        if (isFirebaseEnabled()) {
            try {
                const businessId = getBusinessId();
                console.log('📥 Caricamento da Firebase..., businessId:', businessId);
                const snapshot = await getBusinessRef(businessId).get();
                if (snapshot.exists()) {
                    console.log('✅ Dati caricati da Firebase:', snapshot.val());
                    return snapshot.val();
                }
                console.log('⚠️ Nessun dato su Firebase, usando default');
                return this.getDefaultDatabase();
            } catch (e) {
                console.warn('❌ Firebase load fallito, usando localStorage:', e);
                return this.loadFromLocalStorage();
            }
        }
        console.log('💾 Firebase non abilitato, caricamento da localStorage');
        return this.loadFromLocalStorage();
    },

    // Save all data
    async save(data) {
        if (isFirebaseEnabled()) {
            try {
                const businessId = getBusinessId();
                console.log('📤 Salvataggio su Firebase..., businessId:', businessId);
                await getBusinessRef(businessId).set(data);
                console.log('✅ Dati salvati su Firebase');
                return true;
            } catch (e) {
                console.warn('❌ Firebase save fallito, usando localStorage:', e);
                return this.saveToLocalStorage(data);
            }
        }
        console.log('💾 Firebase non abilitato, salvataggio su localStorage');
        return this.saveToLocalStorage(data);
    },

    // Load from localStorage (fallback/demo mode)
    loadFromLocalStorage() {
        const saved = localStorage.getItem('bookingDB');
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultDatabase();
    },

    // Save to localStorage (fallback/demo mode)
    saveToLocalStorage(data) {
        localStorage.setItem('bookingDB', JSON.stringify(data));
        return true;
    },

    // Get default empty database structure
    getDefaultDatabase() {
        return {
            bookings: [],
            clients: [],
            issues: [],
            busySlots: [],
            securityCodes: {
                sito1: {
                    nome: 'Parrucchiere Rossi',
                    dataCreazione: '2026-05-13',
                    codicNumerico: '48291736574829374829163847',
                    codicAlfabetico: 'SALONACCESS2026KEYSECRETCODE'
                },
                sito2: {
                    nome: 'Parrucchiere [Nome]',
                    dataCreazione: 'Da configurare',
                    codicNumerico: '57384920583949285749283849',
                    codicAlfabetico: 'BARBERSHOPSECUREACCESS2026KEY'
                },
                sito3: {
                    nome: 'Parrucchiere [Nome]',
                    dataCreazione: 'Da configurare',
                    codicNumerico: '93847562938475629384756293',
                    codicAlfabetico: 'HAIRSALONSECURITYACCESSCODE26'
                }
            },
            services: [
                { id: 1, name: 'Taglio Uomo', description: 'Taglio classico e professionale', price: 25, duration: 30, icon: '✂️' },
                { id: 2, name: 'Taglio Donna', description: 'Taglio e styling', price: 35, duration: 45, icon: '💇' },
                { id: 3, name: 'Trattamento', description: 'Barba o viso', price: 20, duration: 20, icon: '🧖' },
                { id: 4, name: 'Colore', description: 'Colorazione completa', price: 80, duration: 120, icon: '💇‍♀️' }
            ],
            reviews: [
                { name: 'Marco Rossi', stars: 5, text: 'Tagli perfetti e veloce. Sono 5 anni che vengo qui!', date: '25 Marzo 2024' },
                { name: 'Giulia Bianchi', stars: 5, text: 'Professionalità e cortesia. Ambiente pulito e accogliente.', date: '18 Marzo 2024' },
                { name: 'Luca Conti', stars: 5, text: 'Miglior parrucchiere in città. Consigliato a tutti!', date: '10 Marzo 2024' }
            ],
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
                {
                    email: 'demo@parrucchiererossi.it',
                    password: 'demo2026',
                    name: 'Demo Admin'
                },
                {
                    email: 'parrucchiere@parrucchiererossi.it',
                    password: '123456',
                    name: 'Parrucchiere Rossi'
                }
            ]
        };
    }
};

// Initialize database on page load
let firebaseData = null;

async function initializeDatabase() {
    firebaseData = await DatabaseAdapter.load();
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDatabase);
} else {
    initializeDatabase();
}
