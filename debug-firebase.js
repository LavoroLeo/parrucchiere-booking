/**
 * DEBUG SCRIPT - Verifica caricamento Firebase
 * Esegui questo nel browser console per debuggare Firebase
 */

console.log('%c=== FIREBASE DEBUG ===', 'color: #d4af37; font-size: 16px; font-weight: bold');

// Test 1: Firebase SDK caricato?
console.log('\n📡 Test 1: Firebase SDK Caricato?');
console.log('   typeof firebase:', typeof firebase);
console.log('   window.firebase exists:', !!window.firebase);

if (typeof firebase !== 'undefined') {
    console.log('   ✅ Firebase SDK è caricato!');
    console.log('   firebase.apps.length:', firebase.apps.length);
    console.log('   firebase.apps:', firebase.apps);
} else {
    console.log('   ❌ Firebase SDK NON è caricato!');
}

// Test 2: Firebase initialized?
console.log('\n🔧 Test 2: Firebase Inizializzato?');
if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
    console.log('   ✅ Firebase è inizializzato!');
    console.log('   App name:', firebase.apps[0].name);
    const db = firebase.database();
    const auth = firebase.auth();
    console.log('   Database:', !!db);
    console.log('   Auth:', !!auth);
} else {
    console.log('   ⚠️  Firebase NON è inizializzato!');
    console.log('   Motivo: ', firebase === undefined ? 'SDK non caricato' : 'apps.length = ' + (firebase.apps ? firebase.apps.length : 'undefined'));
}

// Test 3: Config caricato?
console.log('\n⚙️  Test 3: Firebase Config Caricato?');
if (typeof firebaseConfig !== 'undefined') {
    console.log('   ✅ firebaseConfig è definito!');
    console.log('   projectId:', firebaseConfig.projectId);
    console.log('   databaseURL:', firebaseConfig.databaseURL);
    console.log('   apiKey:', firebaseConfig.apiKey ? 'SET' : 'NOT SET');
} else {
    console.log('   ❌ firebaseConfig NON è definito!');
}

// Test 4: DatabaseAdapter caricato?
console.log('\n💾 Test 4: DatabaseAdapter Caricato?');
if (typeof DatabaseAdapter !== 'undefined') {
    console.log('   ✅ DatabaseAdapter è disponibile!');
    console.log('   load method:', typeof DatabaseAdapter.load);
    console.log('   save method:', typeof DatabaseAdapter.save);
} else {
    console.log('   ❌ DatabaseAdapter NON è disponibile!');
}

// Test 5: Test Database Connection
console.log('\n🌐 Test 5: Test Connessione Database');
if (typeof DatabaseAdapter !== 'undefined') {
    console.log('   Tentando di caricare dati da Firebase...');
    DatabaseAdapter.load()
        .then(data => {
            console.log('   ✅ Dati caricati con successo!');
            console.log('   Chiavi disponibili:', Object.keys(data || {}).join(', '));
            console.log('   Numero prenotazioni:', (data.bookings || []).length);
        })
        .catch(e => {
            console.log('   ❌ Errore caricamento dati:', e.message);
        });
} else {
    console.log('   ⚠️  DatabaseAdapter non disponibile');
}

// Test 6: Verifica localStorage
console.log('\n💾 Test 6: Dati in localStorage?');
const bookingDB = localStorage.getItem('bookingDB');
if (bookingDB) {
    try {
        const data = JSON.parse(bookingDB);
        console.log('   ✅ bookingDB in localStorage');
        console.log('   Prenotazioni:', (data.bookings || []).length);
        console.log('   Clienti:', (data.clients || []).length);
    } catch (e) {
        console.log('   ❌ bookingDB corrotto:', e.message);
    }
} else {
    console.log('   ℹ️  Nessun bookingDB in localStorage');
}

// Summary
console.log('\n' + '='.repeat(40));
console.log('%cSUMMARY', 'color: #d4af37; font-weight: bold; font-size: 14px');
console.log('='.repeat(40));

const summary = {
    'Firebase SDK': typeof firebase !== 'undefined' ? '✅' : '❌',
    'Firebase Initialized': (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) ? '✅' : '❌',
    'Config Loaded': typeof firebaseConfig !== 'undefined' ? '✅' : '❌',
    'DatabaseAdapter': typeof DatabaseAdapter !== 'undefined' ? '✅' : '❌',
    'localStorage Data': localStorage.getItem('bookingDB') ? '✅' : 'ℹ️'
};

Object.entries(summary).forEach(([key, value]) => {
    console.log(`${value} ${key}`);
});

console.log('='.repeat(40));

// Final check
const allOK = Object.values(summary).slice(0, 4).every(v => v === '✅');
if (allOK) {
    console.log('%c🎉 FIREBASE FUNZIONA CORRETTAMENTE! 🎉', 'color: green; font-size: 16px; font-weight: bold');
} else {
    console.log('%c⚠️  FIREBASE HA PROBLEMI - vedere dettagli sopra', 'color: orange; font-size: 14px; font-weight: bold');
}
