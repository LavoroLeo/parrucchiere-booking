/**
 * SISTEMA DI SELEZIONE PARRUCCHIERI
 * - Dropdown con parrucchieri disponibili
 * - Calcolo orari disponibili dinamici
 * - Mostra specialità di ogni parrucchiere
 */

const ParrucchieriSelector = {
    selectedParrucchiereId: null,
    selectedDate: null,

    // Inizializza il dropdown parrucchieri nel form
    init() {
        console.log('👨‍💼 Initializing Parrucchieri Selector...');

        // Crea il dropdown se non esiste
        const bookingForm = document.getElementById('booking-form');
        if (!bookingForm) return;

        // Controlla se il dropdown esiste già
        if (document.getElementById('parrucchiere-select')) {
            return; // Già inizializzato
        }

        // Crea il selettore parrucchiere
        const parrucchieriDiv = document.createElement('div');
        parrucchieriDiv.id = 'parrucchieri-container';
        parrucchieriDiv.style.cssText = `
            margin-bottom: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
        `;

        const label = document.createElement('label');
        label.style.cssText = 'display: block; font-weight: bold; margin-bottom: 10px;';
        label.textContent = '👨‍💼 Scegli il Parrucchiere:';

        const select = document.createElement('select');
        select.id = 'parrucchiere-select';
        select.style.cssText = `
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            margin-bottom: 10px;
        `;

        // Opzione default
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Seleziona un parrucchiere --';
        select.appendChild(defaultOption);

        // Popola con i parrucchieri
        const parrucchieri = window.getParrucchieri ? window.getParrucchieri() : [];
        parrucchieri.forEach(p => {
            // BUG FIX: Null check per specializations
            if (!p || !p.id || !p.name) {
                console.warn('⚠️ Parrucchiere incompleto:', p);
                return;
            }

            const option = document.createElement('option');
            option.value = p.id;
            option.dataset.name = p.name || '';
            option.dataset.surname = p.surname || '';
            option.dataset.specializations = (p.specializations || []).join(', ');
            option.textContent = `${p.name} ${p.surname || ''}`;
            select.appendChild(option);
        });

        // Info parrucchiere selezionato
        const infoDiv = document.createElement('div');
        infoDiv.id = 'parrucchiere-info';
        infoDiv.style.cssText = `
            padding: 10px;
            background: white;
            border-radius: 5px;
            font-size: 13px;
            color: #666;
            display: none;
        `;

        // Event listener
        select.addEventListener('change', (e) => {
            this.selectedParrucchiereId = e.target.value;
            const option = e.target.options[e.target.selectedIndex];

            if (e.target.value) {
                infoDiv.style.display = 'block';
                infoDiv.innerHTML = `
                    <strong>${option.dataset.name} ${option.dataset.surname}</strong><br>
                    Specialità: ${option.dataset.specializations}
                `;

                // Aggiorna gli orari disponibili
                if (this.selectedDate) {
                    this.updateAvailableHours(this.selectedDate);
                }
            } else {
                infoDiv.style.display = 'none';
                infoDiv.innerHTML = '';
                this.selectedParrucchiereId = null;
            }
        });

        parrucchieriDiv.appendChild(label);
        parrucchieriDiv.appendChild(select);
        parrucchieriDiv.appendChild(infoDiv);

        // Crea un input nascosto per il parrucchiereId
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'parrucchiereId';
        hiddenInput.name = 'parrucchiereId';
        hiddenInput.value = '';
        bookingForm.appendChild(hiddenInput);

        // Aggiorna l'input nascosto quando cambia la selezione
        select.addEventListener('change', (e) => {
            hiddenInput.value = e.target.value;
        });

        // BUG FIX: Monitora il cambio di data e aggiorna orari
        const dateInput = document.getElementById('newBookingDate') ||
            bookingForm.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                if (this.selectedParrucchiereId) {
                    this.onDateChange(e.target.value);
                }
            });
        }

        // Inserisci prima del resto del form
        const firstFormElement = bookingForm.querySelector('input, select, textarea, button');
        if (firstFormElement) {
            bookingForm.insertBefore(parrucchieriDiv, firstFormElement);
        } else {
            bookingForm.appendChild(parrucchieriDiv);
        }

        // Intercetta il salvataggio della prenotazione
        this.interceptBookingSave();

        console.log('✅ Parrucchieri Selector caricato');
    },

    // Intercetta il salvataggio della prenotazione per aggiungere parrucchiereId
    interceptBookingSave() {
        // Trova il bottone di submit
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn) return;

        const originalOnclick = submitBtn.onclick;

        submitBtn.addEventListener('click', () => {
            // Assicura che parrucchiereId sia impostato
            if (!document.getElementById('parrucchiereId').value) {
                alert('Per favore seleziona un parrucchiere!');
                return;
            }

            // Se esiste una funzione confermaPrenotazione, intercettala
            if (window.confermaPrenotazione) {
                // Sovrascrivi temporaneamente la funzione
                const originalConfirm = window.confermaPrenotazione;
                window.confermaPrenotazione = () => {
                    // Aggiungi parrucchiereId ai dati
                    const parrucchiereId = document.getElementById('parrucchiereId').value;
                    console.log('👨‍💼 Prenotazione con parrucchiere:', parrucchiereId);

                    // Salva in una variabile globale
                    window.currentParrucchiereId = parrucchiereId;

                    // Chiama la funzione originale
                    originalConfirm();
                };
            }
        });
    },

    // Aggiorna gli orari disponibili in base al parrucchiere
    updateAvailableHours(date) {
        if (!this.selectedParrucchiereId) return;

        console.log('📅 Aggiornamento orari disponibili:', date);

        const slots = window.getAvailableSlots ?
            window.getAvailableSlots(this.selectedParrucchiereId, date) :
            [];

        // Trova il select dell'orario
        const timeSelect = document.querySelector('select[name="time"], select[id*="time"], select[id*="hour"]');

        if (timeSelect) {
            // Salva le opzioni disabilitate
            const options = timeSelect.querySelectorAll('option');
            options.forEach(opt => {
                if (opt.value === '') return; // Skip default option

                const slot = slots.find(s => s.time === opt.value);
                if (slot) {
                    opt.disabled = !slot.available;
                    opt.style.color = slot.available ? 'black' : '#ccc';
                } else {
                    opt.disabled = true;
                }
            });

            console.log('✅ Orari aggiornati:', slots.length, 'slot disponibili');
        }
    },

    // Monitora il cambio di data e aggiorna gli orari
    onDateChange(date) {
        this.selectedDate = date;
        this.updateAvailableHours(date);
    }
};

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => ParrucchieriSelector.init(), 500);
    });
} else {
    setTimeout(() => ParrucchieriSelector.init(), 500);
}
