/**
 * FIREBASE REST API - Soluzione definitiva
 * Usa REST HTTP (niente SDK, niente errori ES6)
 * Funziona perfettamente con script tags
 */

const FIREBASE_DB_URL = 'https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app';
const BUSINESS_ID = 'demo-parrucchiere-rossi';

console.log('%c🔥 FIREBASE REST API INIZIALIZZATO', 'color: #00ff00; font-size: 14px; font-weight: bold');

// Database Adapter che usa REST API
const FirebaseREST = {
    // Carica dati da Firebase via REST
    async load() {
        try {
            console.log('📥 Caricando da Firebase REST API...');

            const response = await fetch(
                `${FIREBASE_DB_URL}/businesses/${BUSINESS_ID}.json`,
                { method: 'GET' }
            );

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log('✅ Dati caricati da Firebase REST API');
                    return data;
                }
            }

            console.log('⚠️ Nessun dato su Firebase, usando default');
            return this.getDefaultData();
        } catch (error) {
            console.warn('⚠️ Firebase REST error:', error.message);
            console.log('💾 Usando localStorage');
            return this.loadFromLocalStorage();
        }
    },

    // Salva dati su Firebase via REST
    async save(data) {
        try {
            console.log('📤 Salvando su Firebase REST API...');

            const response = await fetch(
                `${FIREBASE_DB_URL}/businesses/${BUSINESS_ID}.json`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );

            if (response.ok) {
                console.log('✅ Dati salvati su Firebase REST API');
                return true;
            } else {
                console.warn('⚠️ Errore salvataggio Firebase');
                this.saveToLocalStorage(data);
                return false;
            }
        } catch (error) {
            console.warn('⚠️ Firebase REST save error:', error.message);
            console.log('💾 Salvando su localStorage');
            this.saveToLocalStorage(data);
            return false;
        }
    },

    // LocalStorage fallback
    loadFromLocalStorage() {
        const saved = localStorage.getItem('bookingDB');
        return saved ? JSON.parse(saved) : this.getDefaultData();
    },

    saveToLocalStorage(data) {
        localStorage.setItem('bookingDB', JSON.stringify(data));
        return true;
    },

    // Dati di default
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

// Sostituisci DatabaseAdapter con la versione REST
if (typeof DatabaseAdapter !== 'undefined') {
    Object.assign(DatabaseAdapter, FirebaseREST);
} else {
    window.DatabaseAdapter = FirebaseREST;
}

console.log('✅ Firebase REST API pronto - niente errori ES6!');
