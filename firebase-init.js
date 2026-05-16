/**
 * FIREBASE INITIALIZATION - NPM Version
 * Moderna, affidabile, senza CDN rotto
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5qAqCxYuE3FvkvBT3FZScFPLzGG6OE",
    authDomain: "parrucchieri-online.firebaseapp.com",
    databaseURL: "https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "parrucchieri-online",
    storageBucket: "parrucchieri-online.firebasestorage.app",
    messagingSenderId: "744961592639",
    appId: "1:744961592639:web:bf257e1f805394eeca178a"
};

// Initialize Firebase
let db = null;
let firebaseInitialized = false;

export function initializeFirebaseApp() {
    try {
        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        firebaseInitialized = true;
        console.log('🔥 Firebase inizializzato correttamente via NPM');
        return true;
    } catch (error) {
        console.error('❌ Errore inizializzazione Firebase:', error);
        return false;
    }
}

export function isFirebaseInitialized() {
    return firebaseInitialized && db !== null;
}

export function getDB() {
    return db;
}

// Helper: Get business reference
export function getBusinessRef(businessId = 'demo-parrucchiere-rossi') {
    if (!db) return null;
    return ref(db, `businesses/${businessId}`);
}

// Helper: Load data from Firebase
export async function loadDataFromFirebase(businessId = 'demo-parrucchiere-rossi') {
    if (!isFirebaseInitialized()) {
        throw new Error('Firebase non inizializzato');
    }

    try {
        const snapshot = await get(getBusinessRef(businessId));
        if (snapshot.exists()) {
            console.log('✅ Dati caricati da Firebase');
            return snapshot.val();
        } else {
            console.log('⚠️ Nessun dato su Firebase');
            return null;
        }
    } catch (error) {
        console.error('❌ Errore caricamento da Firebase:', error);
        throw error;
    }
}

// Helper: Save data to Firebase
export async function saveDataToFirebase(data, businessId = 'demo-parrucchiere-rossi') {
    if (!isFirebaseInitialized()) {
        throw new Error('Firebase non inizializzato');
    }

    try {
        await set(getBusinessRef(businessId), data);
        console.log('✅ Dati salvati su Firebase');
        return true;
    } catch (error) {
        console.error('❌ Errore salvataggio su Firebase:', error);
        throw error;
    }
}

// Initialize on module load
initializeFirebaseApp();
