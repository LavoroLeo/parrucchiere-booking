/**
 * DASHBOARD COLUMNS MODIFIER
 * Aggiunge colonna "Parrucchiere" alla tabella prenotazioni
 * Mantiene lo stile uguale, aggiunge solo la funzionalità
 */

const DashboardColumns = {
    // Monitora quando la tabella viene creata/aggiornata
    init() {
        console.log('📊 Initializing Dashboard Columns...');

        // Monitora la creazione di tabelle nel DOM
        this.observeTableChanges();

        // Controlla subito se esiste già una tabella
        setTimeout(() => {
            this.addParrucchiereColumnToTables();
        }, 1000);
    },

    observeTableChanges() {
        // MutationObserver per rilevare quando vengono aggiunte nuove tabelle
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'TABLE' || (node.querySelectorAll && node.querySelectorAll('table').length > 0)) {
                            console.log('📊 Nuova tabella rilevata');
                            setTimeout(() => this.addParrucchiereColumnToTables(), 100);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    addParrucchiereColumnToTables() {
        const tables = document.querySelectorAll('table');

        tables.forEach((table) => {
            // Controlla se la tabella ha già la colonna parrucchiere
            if (table.querySelector('th:contains("Parrucchiere")') ||
                table.querySelector('th[data-field="parrucchiere"]')) {
                return; // Già aggiunto
            }

            // Trova la riga header
            const headerRow = table.querySelector('thead tr');
            if (!headerRow) return;

            // Conta le colonne
            const headerCells = headerRow.querySelectorAll('th');
            const cellCount = headerCells.length;

            // Inserisci colonna "Parrucchiere" prima dell'ultimo
            if (cellCount > 0) {
                const th = document.createElement('th');
                th.textContent = '👨‍💼 Parrucchiere';
                th.style.cssText = 'padding: 10px; text-align: center; font-weight: bold;';
                th.dataset.field = 'parrucchiere';

                // Inserisci prima della colonna azioni (se esiste)
                const ultimaTh = headerCells[cellCount - 1];
                if (ultimaTh.textContent.toLowerCase().includes('azioni') ||
                    ultimaTh.textContent.toLowerCase().includes('azioni')) {
                    ultimaTh.parentElement.insertBefore(th, ultimaTh);
                } else {
                    headerRow.appendChild(th);
                }

                console.log('✅ Colonna Parrucchiere aggiunta');
            }

            // Aggiungi i dati parrucchiere a ogni riga
            const bodyRows = table.querySelector('tbody')?.querySelectorAll('tr') || [];
            bodyRows.forEach((row) => {
                if (row.querySelector('[data-field="parrucchiere"]')) {
                    return; // Già aggiunto
                }

                // BUG FIX: Estrai parrucchiereId dai dati localStorage
                const parrucchiereId = this.getParrucchiereIdForRow(row) ||
                    row.dataset.parrucchiereId;

                const td = document.createElement('td');
                td.dataset.field = 'parrucchiere';
                td.style.cssText = 'padding: 10px; text-align: center;';

                if (parrucchiereId) {
                    const parrucchiere = window.getParrucchiereById ?
                        window.getParrucchiereById(parrucchiereId) : null;

                    if (parrucchiere) {
                        td.textContent = `${parrucchiere.name} ${parrucchiere.surname}`;
                    } else {
                        td.textContent = parrucchiereId;
                    }
                } else {
                    td.textContent = '-';
                }

                // BUG FIX: Salva parrucchiereId come data attribute
                if (parrucchiereId) {
                    row.dataset.parrucchiereId = parrucchiereId;
                }

                // Inserisci prima della colonna azioni
                const azioneTd = row.querySelector('td:last-child');
                if (azioneTd && azioneTd.textContent.toLowerCase().includes('modifica')) {
                    row.insertBefore(td, azioneTd);
                } else {
                    row.appendChild(td);
                }
            });
        });
    },

    getParrucchiereIdForRow(row) {
        // Estrae il parrucchiereId dalla prenotazione nel database
        try {
            const data = window.LocalStorage ? window.LocalStorage.load() : JSON.parse(localStorage.getItem('bookingDB') || '{}');

            // Cerca di trovare il booking ID dalla riga (es: nella prima colonna)
            const cells = row.querySelectorAll('td');
            if (cells.length === 0) return null;

            // Il primo cell potrebbe contenere l'ID o il nome del cliente
            // Cerca nella lista dei booking
            for (const booking of (data.bookings || [])) {
                // Verifica se questa riga corrisponde a questa prenotazione
                const rowText = row.textContent.toLowerCase();

                if (rowText.includes(booking.clientName?.toLowerCase()) &&
                    rowText.includes(booking.date) &&
                    rowText.includes(booking.time)) {
                    return booking.parrucchiereId || 'p1'; // Default a p1 se non trovato
                }
            }
        } catch (e) {
            console.log('⚠️ Errore estraendo parrucchiereId:', e.message);
        }

        return null;
    }
};

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => DashboardColumns.init(), 500);
    });
} else {
    setTimeout(() => DashboardColumns.init(), 500);
}
