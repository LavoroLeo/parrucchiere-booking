// Test della logica di ricerca prenotazioni
const https = require('https');

const FIREBASE_URL = 'https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app';
const BUSINESS_ID = 'demo-parrucchiere-rossi';

https.get(`${FIREBASE_URL}/businesses/${BUSINESS_ID}.json`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const result = JSON.parse(data);
        let bookings = result.bookings;

        if (bookings && !Array.isArray(bookings)) {
            bookings = Object.values(bookings);
        }

        console.log('Tot prenotazioni:', bookings.length);

        // Test: cerca Mario Rossi
        function testSearch(searchName, searchSurname) {
            console.log(`\n🔍 Cerca: ${searchName} ${searchSurname}`);
            const searchN = searchName.trim().toLowerCase();
            const searchS = searchSurname.trim().toLowerCase();
            const searchFull = (searchN + ' ' + searchS).trim();

            const booking = bookings.find(b => {
                const bookingCliente = (b.cliente || '').trim().toLowerCase();
                const bookingClientName = (b.clientName || '').trim().toLowerCase();
                const bookingClientSurname = (b.clientSurname || '').trim().toLowerCase();
                const bookingFullName2 = (bookingClientName + ' ' + bookingClientSurname).trim();

                return bookingCliente === searchFull ||
                       bookingFullName2 === searchFull ||
                       (bookingClientName === searchN && bookingClientSurname === searchS);
            });

            if (booking) {
                console.log('✅ TROVATA:', booking.cliente || (booking.clientName + ' ' + booking.clientSurname));
                console.log('   Data:', booking.data || booking.date);
                console.log('   Servizio:', booking.servizio || booking.service);
            } else {
                console.log('❌ NON TROVATA');
            }
        }

        testSearch('Mario', 'Rossi');
        testSearch('elisa', 'truffa');
        testSearch('aaa', 'aaaa');
        testSearch('Wrong', 'Person');
    });
});
