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
        // Prova a leggere dall'URL (es: ?parrucchiereId=p2)
        const params = new URLSearchParams(window.location.search);
        if (params.has('parrucchiereId')) {
            return params.get('parrucchiereId');
        }

        // Prova a leggere dai dati di login
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        if (!loggedInEmail) return null;

        // Trova il parrucchiere con questa email
        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        const parrucchiere = parrucchieri.find(p => p.email === loggedInEmail && !p.isOwner);

        return parrucchiere ? parrucchiere.id : null;
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

        // Nascondi sezione impostazioni (solo per il proprietario)
        const settingsSection = document.querySelector('[id*="settings"], [class*="settings"]');
        if (settingsSection) {
            settingsSection.style.display = 'none';
        }

        // Mostra un banner che dice "Stai visualizzando solo le tue prenotazioni"
        const banner = document.createElement('div');
        banner.style.cssText = `
            background: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 12px 16px;
            margin-bottom: 20px;
            border-radius: 4px;
            color: #1976d2;
            font-weight: 500;
        `;
        banner.textContent = '👤 Stai visualizzando solo le tue prenotazioni';

        const mainContent = document.querySelector('[id*="content"], [class*="content"], .container');
        if (mainContent && mainContent.firstChild) {
            mainContent.insertBefore(banner, mainContent.firstChild);
        }

        console.log('✅ Features admin nascoste');
    }
};

// Inizializza
CollegaDashboard.init();
