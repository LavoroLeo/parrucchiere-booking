/**
 * COLLEGA DASHBOARD
 * Dashboard personalizzata per parrucchieri colleghi
 * Mostra solo le loro prenotazioni (non tutte quelle del salone)
 */

const CollegaDashboard = {
    currentParrucchiereId: null,

    init() {
        console.log('👤 Initializing Collega Dashboard...');

        // Estrai parrucchiereId dall'URL o dai dati di login
        this.currentParrucchiereId = this.getParrucchiereId();

        if (!this.currentParrucchiereId) {
            console.log('👤 Non è un collega, dashboard normale');
            return;
        }

        // Modifica la visualizzazione delle prenotazioni
        setTimeout(() => {
            this.filterBookingsForCollega();
            this.hideAdminOnlyFeatures();
        }, 1000);
    },

    getParrucchiereId() {
        // Prova 1: Leggere dal sessionStorage salvato dal login handler
        const currentParrucchiereId = localStorage.getItem('currentParrucchiereId');
        if (currentParrucchiereId) {
            console.log('✅ ParrucchiereId letto da localStorage:', currentParrucchiereId);
            return currentParrucchiereId;
        }

        // Prova 2: Leggere dall'URL (es: ?parrucchiereId=p2)
        const params = new URLSearchParams(window.location.search);
        if (params.has('parrucchiereId')) {
            console.log('✅ ParrucchiereId letto da URL:', params.get('parrucchiereId'));
            return params.get('parrucchiereId');
        }

        // Prova 3: Leggere dai dati di login (email)
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        if (!loggedInEmail) {
            console.log('⚠️ loggedInEmail non trovato');
            return null;
        }

        console.log('🔍 Cercando parrucchiere con email:', loggedInEmail);

        // Trova il parrucchiere con questa email
        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        const parrucchiere = parrucchieri.find(p => p.email === loggedInEmail);

        if (!parrucchiere) {
            console.warn('⚠️ Parrucchiere non trovato con email:', loggedInEmail);
            return null;
        }

        console.log('✅ Parrucchiere trovato:', parrucchiere.id, parrucchiere.name);
        return parrucchiere.id;
    },

    filterBookingsForCollega() {
        if (!this.currentParrucchiereId) return;

        console.log('📊 Filtrando prenotazioni per collega:', this.currentParrucchiereId);

        // Trova tutte le tabelle di prenotazione
        const tables = document.querySelectorAll('table');

        tables.forEach((table) => {
            const bodyRows = table.querySelector('tbody')?.querySelectorAll('tr') || [];

            bodyRows.forEach((row) => {
                // Leggi il parrucchiereId della riga
                const parrucchiereCell = row.querySelector('[data-field="parrucchiere"]');
                if (!parrucchiereCell) return;

                const rowParrucchiereId = row.dataset.parrucchiereId;

                // Se la prenotazione NON è di questo collega, nascondi la riga
                if (rowParrucchiereId && rowParrucchiereId !== this.currentParrucchiereId) {
                    row.style.display = 'none';
                }
            });
        });
    },

    hideAdminOnlyFeatures() {
        if (!this.currentParrucchiereId) return;

        // Nascondi bottone "Crea Collega" (solo per il proprietario)
        const createCollegaBtn = document.getElementById('create-collega-btn');
        if (createCollegaBtn) {
            createCollegaBtn.style.display = 'none';
        }

        // Nascondi sezione impostazioni PRINCIPALE (solo per il proprietario)
        const settingsSection = document.querySelector('[id*="settings"], [class*="settings"]');
        if (settingsSection) {
            settingsSection.style.display = 'none';
        }


        // Aggiungi sezione "Impostazioni Collega" (SOLO Cambia Email/Password)
        this.addCollegaSettingsPanel();

        console.log('✅ Features admin nascoste');
    },

    addCollegaSettingsPanel() {
        if (!this.currentParrucchiereId) return;

        // Trova il parrucchiere corrente
        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        const currentParrucchiere = parrucchieri.find(p => p.id === this.currentParrucchiereId);

        if (!currentParrucchiere) return;

        // Crea la sezione Impostazioni
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'collega-settings-panel';
        settingsPanel.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;

        settingsPanel.innerHTML = `
            <h3 style="margin-top: 0; color: #333; font-size: 18px; margin-bottom: 20px;">⚙️ Impostazioni Profilo</h3>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Email Attuale:</label>
                <input type="email" id="collega-email-display" value="${currentParrucchiere.email}" disabled style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    background: #f5f5f5;
                    color: #666;
                    font-size: 14px;
                " readonly>
                <button onclick="CollegaDashboard.openChangeEmailModal()" style="
                    margin-top: 8px;
                    padding: 10px 16px;
                    background: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                ">Cambia Email</button>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Password:</label>
                <p style="color: #666; font-size: 13px; margin: 0 0 12px 0;">La tua password è protetta. Puoi cambiarla qui.</p>
                <button onclick="CollegaDashboard.openChangePasswordModal()" style="
                    padding: 10px 16px;
                    background: #FF9800;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                ">Cambia Password</button>
            </div>
        `;

        // Inserisci prima del footer
        const mainContent = document.querySelector('[id*="content"], [class*="content"], .container');
        if (mainContent) {
            mainContent.appendChild(settingsPanel);
        }
    },

    openChangeEmailModal() {
        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        const currentParrucchiere = parrucchieri.find(p => p.id === this.currentParrucchiereId);

        if (!currentParrucchiere) return;

        const newEmail = prompt(`Inserisci la nuova email:\n\nEmail attuale: ${currentParrucchiere.email}\n\n⚠️ Devi usare questa email per accedere in futuro!`);

        if (!newEmail || newEmail.trim() === '') return;

        if (!newEmail.includes('@')) {
            alert('❌ Email non valida!');
            return;
        }

        // Aggiorna in memoria
        currentParrucchiere.email = newEmail.trim();

        // Salva in Firebase
        if (window.updateParrucchiere) {
            window.updateParrucchiere(this.currentParrucchiereId, { email: newEmail.trim() });
            alert(`✅ Email cambiata con successo!\n\nNuova email: ${newEmail}\n\n⚠️ Al prossimo accesso usa questa email.`);

            // Aggiorna il display
            document.getElementById('collega-email-display').value = newEmail;
        }
    },

    openChangePasswordModal() {
        const currentPassword = prompt('Inserisci la password attuale (per confermare):');

        if (!currentPassword) return;

        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        const currentParrucchiere = parrucchieri.find(p => p.id === this.currentParrucchiereId);

        if (!currentParrucchiere || currentParrucchiere.password !== currentPassword) {
            alert('❌ Password attuale non corretta!');
            return;
        }

        const newPassword = prompt('Inserisci la nuova password:\n\n⚠️ Min 8 caratteri, con lettere e numeri');

        if (!newPassword || newPassword.trim() === '') return;

        if (newPassword.length < 8) {
            alert('❌ La password deve essere lunga almeno 8 caratteri!');
            return;
        }

        const confirmPassword = prompt('Conferma la nuova password:');

        if (confirmPassword !== newPassword) {
            alert('❌ Le password non coincidono!');
            return;
        }

        // Aggiorna in memoria
        currentParrucchiere.password = newPassword.trim();

        // Salva in Firebase
        if (window.updateParrucchiere) {
            window.updateParrucchiere(this.currentParrucchiereId, { password: newPassword.trim() });
            alert(`✅ Password cambiata con successo!\n\n⚠️ Ricorda: La prossima volta accedi con la nuova password.`);
        }
    }
};

// Inizializza
CollegaDashboard.init();
