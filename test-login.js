#!/usr/bin/env node

/**
 * Test script to verify handleLoginInFile logic
 */

// Simulate localStorage
const mockLocalStorage = {
    data: {},
    getItem(key) {
        return this.data[key] || null;
    },
    setItem(key, value) {
        this.data[key] = value;
    }
};

// Simulate window object
const mockWindow = {
    localStorage: mockLocalStorage,
    FIREBASE_REST_LOADED: true
};

// Define LocalStorage object (from firebase-rest.js)
const LocalStorage = {
    load() {
        try {
            const saved = mockLocalStorage.getItem('bookingDB');
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
            mockLocalStorage.setItem('bookingDB', JSON.stringify(data));
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
                satEnd: '14:00',
                logo: null,
                dividers: {
                    enabled: true,
                    color: '#d4af37',
                    height: 3,
                    glowIntensity: 0.6,
                    sections: ['hero-prenota', 'prenota-servizi', 'servizi-recensioni', 'recensioni-social', 'social-contatti']
                }
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

// Test function equivalent to handleLoginInFile
function testLogin(email, password) {
    console.log('\n═══════════════════════════════════════');
    console.log(`🔐 TESTING LOGIN: ${email} / ${password}`);
    console.log('═══════════════════════════════════════');

    const emailInput = email.trim();
    const passwordInput = password.trim();

    if (!emailInput || !passwordInput) {
        console.log('❌ Inserisci email e password');
        return false;
    }

    const emailLower = emailInput.toLowerCase();
    const passwordValue = passwordInput;

    try {
        let data = null;

        // Try LocalStorage first
        console.log('📦 Loading data...');
        if (typeof LocalStorage !== 'undefined' && LocalStorage.load) {
            console.log('✅ Using LocalStorage.load()');
            data = LocalStorage.load();
        }

        // If not available, try direct localStorage
        if (!data) {
            console.log('📦 Trying localStorage.getItem()');
            const stored = mockLocalStorage.getItem('bookingDB');
            if (stored) {
                data = JSON.parse(stored);
                console.log('✅ Got data from localStorage');
            }
        }

        // If still empty, use default data
        if (!data || !data.parrucchieri) {
            console.log('📦 Using default data');
            if (typeof LocalStorage !== 'undefined' && LocalStorage.getDefaultData) {
                data = LocalStorage.getDefaultData();
                console.log('✅ Default data loaded');
            } else {
                throw new Error('Sistema non inizializzato');
            }
        }

        // Log available credentials
        console.log('📋 Available credentials:');
        data.parrucchieri.forEach(p => {
            console.log(`  - ${p.email} / ${p.password}`);
        });

        // Find parrucchiere
        console.log(`🔍 Searching for: { email: ${emailLower}, password: ${passwordValue} }`);
        const parrucchiere = data.parrucchieri.find(p => {
            const emailMatch = p.email.toLowerCase() === emailLower;
            const passwordMatch = p.password === passwordValue;
            console.log(`  Checking: ${p.email.toLowerCase()} === ${emailLower} (${emailMatch}) && ${p.password} === ${passwordValue} (${passwordMatch})`);
            return emailMatch && passwordMatch;
        });

        if (parrucchiere) {
            console.log('✅✅✅ LOGIN RIUSCITO:', parrucchiere.name, parrucchiere.surname);
            return true;
        } else {
            console.log('❌ CREDENZIALI NON VALIDE');
            return false;
        }
    } catch (error) {
        console.error('❌ ERRORE:', error);
        return false;
    }
}

// Run tests
console.log('\n🧪 TESTING LOGIN SYSTEM\n');

testLogin('admin@salone.it', 'DemoPass123!');
testLogin('parrucchiere1@salone.it', 'DemoPass456!');
testLogin('wrong@email.it', 'WrongPassword');

console.log('\n✅ Tests completed');
