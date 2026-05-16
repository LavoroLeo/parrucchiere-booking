/**
 * FIREBASE AUTO-SAVE
 * Salva automaticamente TUTTI i dati in Firebase ogni volta che cambiano
 */

console.log('%c💾 FIREBASE AUTO-SAVE ATTIVATO', 'color: #00aa00; font-size: 14px; font-weight: bold');

let autoSaveTimer = null;
const AUTOSAVE_DELAY = 1000; // Salva 1 secondo dopo l'ultima modifica

/**
 * Funzione per salvare i dati in Firebase
 * Viene chiamata automaticamente quando i dati cambiano
 */
async function autoSaveToFirebase() {
    try {
        if (typeof DatabaseAdapter === 'undefined') {
            console.warn('DatabaseAdapter non disponibile per auto-save');
            return;
        }

        // Carica i dati locali
        const data = JSON.parse(localStorage.getItem('bookingDB') || '{}');

        if (Object.keys(data).length === 0) {
            console.log('⚠️ Nessun dato da salvare');
            return;
        }

        // Salva in Firebase
        console.log('💾 Auto-saving data in Firebase...');
        const result = await DatabaseAdapter.save(data);

        if (result) {
            console.log('✅ Auto-save completato', {
                bookings: (data.bookings || []).length,
                clients: (data.clients || []).length,
                services: (data.services || []).length
            });
        }
    } catch (error) {
        console.warn('⚠️ Auto-save error:', error.message);
    }
}

/**
 * Intercetta i cambiamenti nel localStorage
 * Quando localStorage cambia, attiva auto-save con ritardo
 */
window.addEventListener('storage', (e) => {
    if (e.key === 'bookingDB') {
        // Cancella il timer precedente
        if (autoSaveTimer) clearTimeout(autoSaveTimer);

        // Imposta un nuovo timer
        autoSaveTimer = setTimeout(autoSaveToFirebase, AUTOSAVE_DELAY);
        console.log('📝 Cambiamento rilevato, auto-save programmato...');
    }
});

/**
 * Monitora i cambiamenti manuali alle prenotazioni
 * Se qualcosa modifica directamente i dati, lo salva
 */
const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
    originalSetItem.call(this, key, value);

    if (key === 'bookingDB') {
        // Cancella il timer precedente
        if (autoSaveTimer) clearTimeout(autoSaveTimer);

        // Imposta un nuovo timer
        autoSaveTimer = setTimeout(autoSaveToFirebase, AUTOSAVE_DELAY);
    }
};

/**
 * Salva prima di uscire dalla pagina
 * Assicura che tutti i dati siano salvati quando l'utente se ne va
 */
window.addEventListener('beforeunload', async (e) => {
    try {
        if (typeof DatabaseAdapter !== 'undefined') {
            const data = JSON.parse(localStorage.getItem('bookingDB') || '{}');
            if (Object.keys(data).length > 0) {
                await DatabaseAdapter.save(data);
                console.log('✅ Dati salvati prima di uscire');
            }
        }
    } catch (error) {
        console.warn('Errore salvataggio finale:', error.message);
    }
});

/**
 * Funzione manuale per forzare il salvataggio
 */
window.forceFirebaseSave = async function() {
    console.log('🔄 Forzando salvataggio in Firebase...');
    await autoSaveToFirebase();
};

console.log('✅ Auto-save configurato - I dati si salveranno automaticamente');
console.log('💡 Per forzare il salvataggio, esegui: forceFirebaseSave()');
