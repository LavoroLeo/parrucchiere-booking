/**
 * FIREBASE LOADER - Carica e inizializza Firebase dal bundle
 * Rende Firebase disponibile globalmente
 */

console.log('%c🔥 FIREBASE LOADER AVVIATO', 'color: #d4af37; font-size: 14px; font-weight: bold');

// Aspetta che il bundle sia caricato
(async function loadFirebase() {
    let attempts = 0;
    const maxAttempts = 20; // 20 * 500ms = 10 secondi

    // Controlla se Firebase SDK è disponibile
    while (attempts < maxAttempts) {
        try {
            // Prova a importare Firebase direttamente
            if (typeof window.FirebaseApp !== 'undefined') {
                console.log('✅ Firebase App disponibile dal bundle');
                break;
            }

            // Prova il caricamento dinamico
            const script = document.currentScript;
            if (script && script.src && script.src.includes('firebase-bundle')) {
                console.log('✅ Firebase bundle caricato');
                break;
            }

            attempts++;
            if (attempts % 2 === 0) {
                console.log(`⏳ In attesa Firebase... (${attempts}/${maxAttempts})`);
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e) {
            console.warn('⚠️ Errore caricamento Firebase:', e.message);
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Crea mock Firebase se non disponibile (fallback)
    if (!window.firebase && typeof window.initializeFirebaseApp === 'undefined') {
        console.log('⚠️ Firebase non disponibile, usando localStorage fallback');
        window.firebase = {
            apps: [],
            initializeApp: () => console.log('Firebase fallback - usando localStorage'),
            database: () => ({ ref: () => ({}) }),
            auth: () => ({})
        };
    }

    console.log('✅ Firebase Loader completato');
})();
