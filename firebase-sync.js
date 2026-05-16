/**
 * FIREBASE SYNC - Sincronizza tutti i dati in Firebase
 * Esegui questo script UNA VOLTA per inizializzare Firebase
 */

console.log('%c🔥 FIREBASE DATA SYNC INIZIATO', 'color: #d4af37; font-size: 16px; font-weight: bold');

// Dati di default completi
const DEFAULT_DATA = {
    bookings: [
        {
            id: 'DEMO_001',
            clientName: 'Marco Rossi',
            clientEmail: 'marco@example.com',
            clientPhone: '+39 011 555 1234',
            service: 'Taglio Uomo',
            date: '2026-05-20',
            time: '14:30',
            notes: 'Prenotazione demo',
            status: 'confirmed',
            createdAt: new Date().toISOString()
        },
        {
            id: 'DEMO_002',
            clientName: 'Giulia Bianchi',
            clientEmail: 'giulia@example.com',
            clientPhone: '+39 011 666 2345',
            service: 'Taglio Donna',
            date: '2026-05-21',
            time: '15:00',
            notes: 'Taglio e styling',
            status: 'confirmed',
            createdAt: new Date().toISOString()
        }
    ],
    clients: [
        {
            id: 'CLIENT_001',
            name: 'Marco Rossi',
            email: 'marco@example.com',
            phone: '+39 011 555 1234',
            totalBookings: 5,
            lastBooking: '2026-05-20'
        },
        {
            id: 'CLIENT_002',
            name: 'Giulia Bianchi',
            email: 'giulia@example.com',
            phone: '+39 011 666 2345',
            totalBookings: 3,
            lastBooking: '2026-05-21'
        }
    ],
    services: [
        {
            id: 1,
            name: 'Taglio Uomo',
            description: 'Taglio classico e professionale',
            price: 25,
            duration: 30,
            icon: '✂️'
        },
        {
            id: 2,
            name: 'Taglio Donna',
            description: 'Taglio e styling',
            price: 35,
            duration: 45,
            icon: '💇'
        },
        {
            id: 3,
            name: 'Trattamento',
            description: 'Barba o viso',
            price: 20,
            duration: 20,
            icon: '🧖'
        },
        {
            id: 4,
            name: 'Colore',
            description: 'Colorazione completa',
            price: 80,
            duration: 120,
            icon: '💇‍♀️'
        }
    ],
    reviews: [
        {
            name: 'Marco Rossi',
            stars: 5,
            text: 'Tagli perfetti e veloce. Sono 5 anni che vengo qui!',
            date: '25 Marzo 2024'
        },
        {
            name: 'Giulia Bianchi',
            stars: 5,
            text: 'Professionalità e cortesia. Ambiente pulito e accogliente.',
            date: '18 Marzo 2024'
        },
        {
            name: 'Luca Conti',
            stars: 5,
            text: 'Miglior parrucchiere in città. Consigliato a tutti!',
            date: '10 Marzo 2024'
        }
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
    ],
    busySlots: [],
    issues: [],
    securityCodes: {
        sito1: {
            nome: 'Parrucchiere Rossi',
            dataCreazione: '2026-05-13',
            codicNumerico: '48291736574829374829163847',
            codicAlfabetico: 'SALONACCESS2026KEYSECRETCODE'
        }
    }
};

// Funzione per salvare in Firebase
async function syncToFirebase() {
    try {
        // Controlla se DatabaseAdapter è disponibile
        if (typeof DatabaseAdapter === 'undefined') {
            console.log('⚠️ DatabaseAdapter non disponibile, usando localStorage');
            localStorage.setItem('bookingDB', JSON.stringify(DEFAULT_DATA));
            console.log('✅ Dati salvati in localStorage');
            return;
        }

        // Salva in Firebase tramite DatabaseAdapter
        console.log('📤 Salvando dati in Firebase...');
        const result = await DatabaseAdapter.save(DEFAULT_DATA);

        if (result) {
            console.log('✅ Dati sincronizzati su Firebase con successo!');
            console.log('📊 Dati salvati:');
            console.log('   - Prenotazioni:', DEFAULT_DATA.bookings.length);
            console.log('   - Clienti:', DEFAULT_DATA.clients.length);
            console.log('   - Servizi:', DEFAULT_DATA.services.length);
            console.log('   - Recensioni:', DEFAULT_DATA.reviews.length);
            console.log('   - Account parrucchiere:', DEFAULT_DATA.parrucchiere.length);

            // Verifica che i dati siano stati salvati
            console.log('\n📥 Verificando i dati salvati...');
            const verifyData = await DatabaseAdapter.load();

            if (verifyData) {
                console.log('✅ Verifica completata - Dati presenti su Firebase:');
                console.log('   - Prenotazioni:', (verifyData.bookings || []).length);
                console.log('   - Clienti:', (verifyData.clients || []).length);
                console.log('   - Servizi:', (verifyData.services || []).length);
            }
        }
    } catch (error) {
        console.error('❌ Errore sincronizzazione:', error);
        console.log('💾 Salvando in localStorage come fallback...');
        localStorage.setItem('bookingDB', JSON.stringify(DEFAULT_DATA));
        console.log('✅ Dati salvati in localStorage');
    }
}

// Esegui sync quando il DOM è caricato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncToFirebase);
} else {
    syncToFirebase();
}

// Export per uso manuale
window.syncFirebaseData = syncToFirebase;
console.log('\n💡 Per sincronizzare manualmente, esegui: syncFirebaseData()');
