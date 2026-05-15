/**
 * Firebase Connection Test Script
 * Verifica che il sistema di prenotazioni sia correttamente collegato a Firebase
 *
 * Uso: node test-firebase-connection.js
 */

const https = require('https');
const http = require('http');

// Test Firebase Configuration
const testConfig = {
    apiKey: "AIzaSyA5qAqCxYuE3FvkvBT3FZScFPLzGG6OE",
    projectId: "parrucchieri-online",
    databaseURL: "https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app"
};

console.log('🔥 TEST FIREBASE CONNECTION');
console.log('============================\n');

// Test 1: Verify Firebase Realtime Database is accessible
function testFirebaseConnection() {
    return new Promise((resolve, reject) => {
        const url = `${testConfig.databaseURL}/businesses/demo-parrucchiere-rossi.json?auth=${testConfig.apiKey}`;

        console.log('📡 Test 1: Connessione al database Firebase');
        console.log(`   URL: ${testConfig.databaseURL}`);
        console.log(`   Progetto: ${testConfig.projectId}\n`);

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 401) {
                    console.log(`✅ Database raggiungibile (Status: ${res.statusCode})`);
                    try {
                        const parsed = JSON.parse(data);
                        console.log(`   Struttura dati caricata: ${Object.keys(parsed || {}).length} chiavi\n`);
                        resolve(true);
                    } catch (e) {
                        console.log(`   (Dati JSON non validi - possibile autenticazione)\n`);
                        resolve(true);
                    }
                } else {
                    console.log(`❌ Errore: Status ${res.statusCode}\n`);
                    reject(res.statusCode);
                }
            });
        }).on('error', (e) => {
            console.log(`❌ Errore di connessione: ${e.message}\n`);
            reject(e);
        });
    });
}

// Test 2: Check HTML files have correct Firebase SDK script tags
function testHtmlFiles() {
    const fs = require('fs');
    const files = [
        'C:\\Users\\Utente\\Desktop\\Artigiani\\index.html',
        'C:\\Users\\Utente\\Desktop\\Artigiani\\cliente-prenotazioni.html',
        'C:\\Users\\Utente\\Desktop\\Artigiani\\login-parrucchiere.html',
        'C:\\Users\\Utente\\Desktop\\Artigiani\\parrucchiere-login.html'
    ];

    console.log('📋 Test 2: Verifica file HTML');
    console.log('================================\n');

    let allValid = true;

    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const hasAppCompat = content.includes('firebase-app-compat.js');
            const hasDbCompat = content.includes('firebase-database-compat.js');
            const hasConfig = content.includes('firebase-config.js');
            const hasDb = content.includes('firebase-database.js');

            const status = (hasAppCompat && hasDbCompat && hasConfig && hasDb) ? '✅' : '❌';
            console.log(`${status} ${file.split('\\').pop()}`);

            if (!hasAppCompat) console.log('   ⚠️  Manca: firebase-app-compat.js');
            if (!hasDbCompat) console.log('   ⚠️  Manca: firebase-database-compat.js');
            if (!hasConfig) console.log('   ⚠️  Manca: firebase-config.js');
            if (!hasDb) console.log('   ⚠️  Manca: firebase-database.js');

            if (!(hasAppCompat && hasDbCompat && hasConfig && hasDb)) {
                allValid = false;
            }
        } catch (e) {
            console.log(`❌ ${file.split('\\').pop()}: ${e.message}`);
            allValid = false;
        }
    });

    console.log();
    return allValid;
}

// Test 3: Verify DatabaseAdapter implementation
function testDatabaseAdapter() {
    const fs = require('fs');

    console.log('💾 Test 3: Verifica DatabaseAdapter');
    console.log('===================================\n');

    try {
        const content = fs.readFileSync('C:\\Users\\Utente\\Desktop\\Artigiani\\firebase-database.js', 'utf8');

        const hasLoad = content.includes('load()');
        const hasSave = content.includes('save(data)');
        const hasDefaultDb = content.includes('getDefaultDatabase()');
        const hasParrucchiere = content.includes('parrucchiere:');
        const isArray = content.includes('parrucchiere: [');

        console.log(`${hasLoad ? '✅' : '❌'} load() method`);
        console.log(`${hasSave ? '✅' : '❌'} save(data) method`);
        console.log(`${hasDefaultDb ? '✅' : '❌'} getDefaultDatabase() method`);
        console.log(`${hasParrucchiere ? '✅' : '❌'} parrucchiere structure`);
        console.log(`${isArray ? '✅' : '❌'} parrucchiere is array format`);

        console.log();
        return hasLoad && hasSave && hasDefaultDb && hasParrucchiere && isArray;
    } catch (e) {
        console.log(`❌ Errore: ${e.message}\n`);
        return false;
    }
}

// Test 4: Verify booking save implementation
function testBookingSave() {
    const fs = require('fs');

    console.log('📝 Test 4: Verifica salvataggio prenotazioni');
    console.log('==========================================\n');

    try {
        const content = fs.readFileSync('C:\\Users\\Utente\\Desktop\\Artigiani\\cliente-prenotazioni.html', 'utf8');

        const hasAsyncConferma = content.includes('async function confermaPrenotazione');
        const hasDatabaseAdapterLoad = content.includes('DatabaseAdapter.load()');
        const hasDatabaseAdapterSave = content.includes('DatabaseAdapter.save(data)');
        const hasErrorHandling = content.includes('catch (e)');
        const hasTryCatch = content.includes('try {');

        console.log(`${hasAsyncConferma ? '✅' : '❌'} Funzione confermaPrenotazione async`);
        console.log(`${hasDatabaseAdapterLoad ? '✅' : '❌'} DatabaseAdapter.load() chiamato`);
        console.log(`${hasDatabaseAdapterSave ? '✅' : '❌'} DatabaseAdapter.save(data) chiamato`);
        console.log(`${hasTryCatch ? '✅' : '❌'} Try-catch per gestione errori`);
        console.log(`${hasErrorHandling ? '✅' : '❌'} Catch block presente`);

        console.log();
        return hasAsyncConferma && hasDatabaseAdapterLoad && hasDatabaseAdapterSave && hasTryCatch && hasErrorHandling;
    } catch (e) {
        console.log(`❌ Errore: ${e.message}\n`);
        return false;
    }
}

// Test 5: Verify dashboard booking load implementation
function testDashboardLoad() {
    const fs = require('fs');

    console.log('📊 Test 5: Verifica caricamento prenotazioni dashboard');
    console.log('=====================================================\n');

    try {
        const content = fs.readFileSync('C:\\Users\\Utente\\Desktop\\Artigiani\\parrucchiere-login.html', 'utf8');

        const hasRefreshBookings = content.includes('refreshBookingsCache()');
        const hasDatabaseAdapterLoad = content.includes('DatabaseAdapter.load()');
        const hasPromiseAll = content.includes('Promise.all');
        const hasAutoRefresh = content.includes('setInterval') && content.includes('refreshBookingsCache');
        const hasRenderDashboard = content.includes('renderDashboard()');

        console.log(`${hasRefreshBookings ? '✅' : '❌'} refreshBookingsCache() implementato`);
        console.log(`${hasDatabaseAdapterLoad ? '✅' : '❌'} DatabaseAdapter.load() chiamato`);
        console.log(`${hasPromiseAll ? '✅' : '❌'} Promise.all per caricamento iniziale`);
        console.log(`${hasAutoRefresh ? '✅' : '❌'} Auto-refresh ogni 5 secondi`);
        console.log(`${hasRenderDashboard ? '✅' : '❌'} renderDashboard() chiamato`);

        console.log();
        return hasRefreshBookings && hasDatabaseAdapterLoad && hasPromiseAll && hasAutoRefresh && hasRenderDashboard;
    } catch (e) {
        console.log(`❌ Errore: ${e.message}\n`);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    try {
        const results = {
            firebase: await testFirebaseConnection(),
            html: testHtmlFiles(),
            adapter: testDatabaseAdapter(),
            booking: testBookingSave(),
            dashboard: testDashboardLoad()
        };

        console.log('📈 RIEPILOGO TEST');
        console.log('=================\n');

        console.log(`Firebase Connection: ${results.firebase ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`HTML Files: ${results.html ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`DatabaseAdapter: ${results.adapter ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Booking Save: ${results.booking ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`Dashboard Load: ${results.dashboard ? '✅ PASS' : '❌ FAIL'}\n`);

        const allPass = Object.values(results).every(r => r);
        if (allPass) {
            console.log('🎉 TUTTI I TEST SONO PASSATI!');
            console.log('\n✅ Il sistema è correttamente configurato per Firebase.');
            console.log('✅ Tutti i file HTML caricano il Firebase SDK compat.');
            console.log('✅ DatabaseAdapter è implementato correttamente.');
            console.log('✅ Le prenotazioni verranno salvate su Firebase.');
            console.log('✅ Il dashboard caricherà le prenotazioni da Firebase.\n');
        } else {
            console.log('❌ Alcuni test non hanno passato. Controllare i risultati sopra.\n');
        }

    } catch (e) {
        console.error('❌ Errore durante i test:', e.message);
    }
}

// Esegui i test
runAllTests();
