// Firebase Configuration
// Initialize Firebase with your project credentials
// Get these from: https://console.firebase.google.com/

const firebaseConfig = {
    apiKey: "AIzaSyA5qAqCxYuE3FvkvBT3FZScFPLzGG6OE",
    authDomain: "parrucchieri-online.firebaseapp.com",
    databaseURL: "https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "parrucchieri-online",
    storageBucket: "parrucchieri-online.firebasestorage.app",
    messagingSenderId: "744961592639",
    appId: "1:744961592639:web:bf257e1f805394eeca178a"
};

let db = null;
let auth = null;

// Initialize Firebase with error handling
function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            console.log('🔥 Firebase SDK detected, initializing...');
            console.log('   firebase.apps.length:', firebase.apps ? firebase.apps.length : 'undefined');

            if (firebase.apps && firebase.apps.length === 0) {
                // Only initialize if Firebase SDK is loaded and not already initialized
                if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
                    firebase.initializeApp(firebaseConfig);
                    db = firebase.database();
                    auth = firebase.auth();
                    console.log('✅ Firebase initialized successfully');
                    return true;
                } else {
                    console.warn('Firebase config not set. Using localStorage only.');
                    return false;
                }
            } else if (firebase.apps && firebase.apps.length > 0) {
                // Firebase already initialized
                db = firebase.database();
                auth = firebase.auth();
                console.log('✅ Firebase already initialized');
                return true;
            }
        } else {
            console.warn('🔥 Firebase SDK not loaded yet, retrying in 500ms...');
            // Retry after a short delay
            setTimeout(initializeFirebase, 500);
            return false;
        }
    } catch (e) {
        console.warn('❌ Firebase initialization failed:', e.message);
        return false;
    }
}

// Initialize Firebase when SDK is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeFirebase();
    });
} else {
    // DOM already loaded
    initializeFirebase();
}

// Also try to initialize after a delay to ensure SDK is loaded
setTimeout(() => {
    if (!db && typeof firebase !== 'undefined') {
        console.log('🔄 Attempting Firebase initialization after delay...');
        initializeFirebase();
    }
}, 1000);

// Helper function to get business ID (from localStorage or domain)
function getBusinessId() {
    // First check if we're in parrucchiere mode (has parrucchiere session)
    const parrucchiereSession = localStorage.getItem('parrucchiereSession');
    if (parrucchiereSession) {
        try {
            const session = JSON.parse(parrucchiereSession);
            return session.businessId || localStorage.getItem('businessId') || 'demo-parrucchiere-rossi';
        } catch (e) {
            return localStorage.getItem('businessId') || 'demo-parrucchiere-rossi';
        }
    }

    // Otherwise use stored businessId or default
    return localStorage.getItem('businessId') || 'demo-parrucchiere-rossi';
}

// Helper function to get database reference for a specific business
function getBusinessRef(businessId = null) {
    if (!db) return null;
    const bid = businessId || getBusinessId();
    return db.ref(`businesses/${bid}`);
}
