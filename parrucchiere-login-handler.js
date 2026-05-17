/**
 * PARRUCCHIERE LOGIN HANDLER
 * Sistema di login multi-parrucchiere
 * - Legge email/password dal form
 * - Cerca in firebase-rest.js (data.parrucchieri[])
 * - Salva loggedInEmail + currentParrucchiereId in localStorage
 * - Reindirizza al dashboard
 */

const ParrucchiereLoginHandler = {
    init() {
        console.log('🔐 Initializing Parrucchiere Login Handler...');

        // Trova il form di login
        this.setupLoginForm();
    },

    setupLoginForm() {
        // Cerca il form nel DOM
        const loginForm = document.getElementById('parrucchiere-login-form') ||
                         document.querySelector('form[data-login="parrucchiere"]');

        if (!loginForm) {
            console.log('⚠️ Form di login non trovato nel HTML');
            return;
        }

        // Aggiungi event listener al form
        loginForm.addEventListener('submit', (e) => {
            console.log('📝 Form submitted, preventing default');
            e.preventDefault();
            this.handleLogin(loginForm);
        });

        // Trova il bottone e aggiungi click event
        const submitButton = loginForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('click', (e) => {
                console.log('🖱️ Button clicked');
                e.preventDefault();
                this.handleLogin(loginForm);
            });
        }

        console.log('✅ Form di login configurato');
    },

    handleLogin(form) {
        // Leggi email e password dal form
        const emailInput = form.querySelector('input[type="email"]') ||
                          form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[type="password"]') ||
                             form.querySelector('input[name="password"]');

        if (!emailInput || !passwordInput) {
            alert('❌ Form non completato correttamente');
            console.error('⚠️ Input non trovati nel form');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Valida
        if (!email || !password) {
            alert('❌ Inserisci email e password!');
            return;
        }

        // Cerca il parrucchiere nei dati
        this.verifyLogin(email, password);
    },

    verifyLogin(email, password) {
        // Carica i parrucchieri da localStorage (firebase-rest.js)
        let data = LocalStorage ? LocalStorage.load() :
                    JSON.parse(localStorage.getItem('bookingDB') || '{}');

        // Se data non ha parrucchieri, usa i dati di default
        if (!data.parrucchieri || data.parrucchieri.length === 0) {
            if (LocalStorage && LocalStorage.getDefaultData) {
                data = LocalStorage.getDefaultData();
                console.log('📊 Usando dati di default per parrucchieri');
                // Salva i dati di default
                if (data.parrucchieri && data.parrucchieri.length > 0) {
                    LocalStorage.save(data);
                }
            } else {
                alert('❌ Nessun parrucchiere configurato nel sistema');
                console.error('⚠️ Dati parrucchieri non trovati');
                return;
            }
        }

        // Cerca il parrucchiere con email/password corretti
        const parrucchiere = data.parrucchieri.find(p =>
            p.email === email && p.password === password
        );

        if (!parrucchiere) {
            alert('❌ Email o password non valida!');
            console.warn('⚠️ Login fallito per email:', email);
            return;
        }

        // ✅ LOGIN RIUSCITO!
        console.log('✅ Login riuscito per:', parrucchiere.name, parrucchiere.surname);

        // Salva i dati di login in localStorage
        localStorage.setItem('loggedInEmail', email);
        localStorage.setItem('currentParrucchiereId', parrucchiere.id);
        localStorage.setItem('isOwner', parrucchiere.isOwner ? 'true' : 'false');
        localStorage.setItem('parrucchiereSession', JSON.stringify({
            email: email,
            parrucchiereId: parrucchiere.id,
            name: parrucchiere.name,
            surname: parrucchiere.surname,
            isOwner: parrucchiere.isOwner,
            loginTime: new Date().toISOString()
        }));

        console.log('💾 Dati di login salvati in localStorage');
        console.log('📊 Parrucchiere:', {
            id: parrucchiere.id,
            name: parrucchiere.name,
            email: parrucchiere.email,
            isOwner: parrucchiere.isOwner
        });

        // Reindirizza al dashboard
        setTimeout(() => {
            if (parrucchiere.isOwner) {
                window.location.href = 'dashboard.html';
            } else {
                // Collega va al dashboard con filtro automatico
                window.location.href = 'dashboard.html?parrucchiereId=' + parrucchiere.id;
            }
        }, 500);
    },

    // Funzione per logout
    logout() {
        console.log('🔓 Logout...');
        localStorage.removeItem('loggedInEmail');
        localStorage.removeItem('currentParrucchiereId');
        localStorage.removeItem('isOwner');
        localStorage.removeItem('parrucchiereSession');
        window.location.href = 'index.html';
    }
};

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => ParrucchiereLoginHandler.init(), 500);
    });
} else {
    setTimeout(() => ParrucchiereLoginHandler.init(), 500);
}

console.log('✅ PARRUCCHIERE LOGIN HANDLER CARICATO');
