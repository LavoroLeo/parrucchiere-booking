/**
 * CREATE COLLEGA MODAL
 * Form modale per creare un nuovo parrucchiere collega
 */

const CreateCollegaModal = {
    init() {
        console.log('👨‍💼 Initializing Create Collega Modal...');

        // Controlla se siamo in una pagina di prenotazioni (cliente)
        const currentPage = window.location.pathname.toLowerCase();
        if (currentPage.includes('prenotazioni') || currentPage.includes('cliente')) {
            console.log('⚠️ Siamo in una pagina di prenotazioni cliente, Create Collega Modal non inizializzato');
            return;
        }

        // Controlla se siamo nel contesto parrucchiere (parrucchiere dashboard)
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        const currentParrucchiereId = localStorage.getItem('currentParrucchiereId');
        const isOwner = localStorage.getItem('isOwner') === 'true';

        // Se non siamo loggati come parrucchiere O se non siamo il proprietario, NON caricare il modale
        if (!loggedInEmail || !currentParrucchiereId || !isOwner) {
            console.log('⚠️ Non in parrucchiere dashboard o non proprietario, Create Collega Modal non inizializzato');
            return;
        }

        // Crea il bottone "Crea Collega" (visibile solo al proprietario)
        setTimeout(() => {
            this.addCreateCollegaButton();
        }, 1000);
    },

    addCreateCollegaButton() {
        // Trova la dashboard del parrucchiere
        const dashboardSection = document.querySelector('[id*="dashboard"], [class*="dashboard"], .parrucchiere-section');

        if (!dashboardSection) {
            console.log('⚠️ Dashboard non trovata, ma siamo in contesto parrucchiere');
            this.createGlobalButton();
            return;
        }

        // A questo punto sappiamo che siamo il proprietario (controllato in init())

        // Crea il bottone
        const btn = document.createElement('button');
        btn.id = 'create-collega-btn';
        btn.className = 'btn-crea-collega';
        btn.innerHTML = '➕ Crea Collega Parrucchiere';
        btn.style.cssText = `
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            margin: 20px 0;
            transition: transform 0.2s, box-shadow 0.2s;
        `;

        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });

        btn.addEventListener('click', () => this.openModal());

        // Inserisci il bottone prima della sezione del form o all'inizio della dashboard
        const firstElement = dashboardSection.firstChild;
        if (firstElement) {
            dashboardSection.insertBefore(btn, firstElement);
        } else {
            dashboardSection.appendChild(btn);
        }

        console.log('✅ Bottone "Crea Collega" aggiunto');
    },

    createGlobalButton() {
        // Se non trova la dashboard, crea un bottone globale
        const btn = document.createElement('div');
        btn.id = 'create-collega-container';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 999;
        `;

        const buttonEl = document.createElement('button');
        buttonEl.innerHTML = '➕';
        buttonEl.style.cssText = `
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.2s;
        `;

        buttonEl.addEventListener('click', () => this.openModal());
        buttonEl.addEventListener('mouseover', () => {
            buttonEl.style.transform = 'scale(1.1)';
        });
        buttonEl.addEventListener('mouseout', () => {
            buttonEl.style.transform = 'scale(1)';
        });

        btn.appendChild(buttonEl);
        document.body.appendChild(btn);
    },

    openModal() {
        console.log('📝 Opening Create Collega Modal');

        // Rimuovi modale precedente se esiste
        const existingModal = document.getElementById('create-collega-modal');
        if (existingModal) existingModal.remove();

        // Crea la modale
        const modal = document.createElement('div');
        modal.id = 'create-collega-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const form = document.createElement('div');
        form.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease;
        `;

        form.innerHTML = `
            <h2 style="margin: 0 0 30px 0; color: #333;">➕ Crea Collega Parrucchiere</h2>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Nome:</label>
                <input type="text" id="collega-name" placeholder="Es: Anna" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Cognome:</label>
                <input type="text" id="collega-surname" placeholder="Es: Bianchi" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Email:</label>
                <input type="email" id="collega-email" placeholder="collega@parrucchiererossi.it" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Password:</label>
                <input type="password" id="collega-password" placeholder="Password provvisoria" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Specialità (separare con virgola):</label>
                <input type="text" id="collega-specializations" placeholder="Es: Taglio Donna, Colore, Styling" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Orario Inizio:</label>
                <input type="time" id="collega-hoursStart" value="10:00" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Orario Fine:</label>
                <input type="time" id="collega-hoursEnd" value="17:00" style="
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                " required>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 30px;">
                <button onclick="CreateCollegaModal.closeModal()" style="
                    flex: 1;
                    padding: 12px;
                    background: #eee;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Annulla</button>
                <button onclick="CreateCollegaModal.saveCollega()" style="
                    flex: 1;
                    padding: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Crea Collega</button>
            </div>

            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            </style>
        `;

        modal.appendChild(form);
        document.body.appendChild(modal);

        // Chiudi al click esterno
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    },

    saveCollega() {
        const name = document.getElementById('collega-name').value;
        const surname = document.getElementById('collega-surname').value;
        const email = document.getElementById('collega-email').value;
        const password = document.getElementById('collega-password').value;
        const specializations = document.getElementById('collega-specializations').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s);
        const hoursStart = document.getElementById('collega-hoursStart').value;
        const hoursEnd = document.getElementById('collega-hoursEnd').value;

        if (!name || !surname || !email || !password || specializations.length === 0) {
            alert('Per favore compila tutti i campi!');
            return;
        }

        // Crea il nuovo collega
        const newCollega = {
            name,
            surname,
            email,
            password,
            specializations,
            hoursStart,
            hoursEnd,
            satStart: hoursStart,
            satEnd: hoursEnd,
            phone: '',
            photo: '',
            isOwner: false
        };

        // Salva in database
        const savedCollega = window.addParrucchiere ? window.addParrucchiere(newCollega) : null;

        if (savedCollega) {
            console.log('✅ Collega creato:', savedCollega.name, savedCollega.id);
            alert(`✅ Collega "${savedCollega.name} ${savedCollega.surname}" creato con successo!\n\nID: ${savedCollega.id}`);

            this.closeModal();

            // Ricarica la pagina per mostrare il nuovo collega
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            alert('❌ Errore nella creazione del collega');
        }
    },

    closeModal() {
        const modal = document.getElementById('create-collega-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    }
};

// Inizializza
CreateCollegaModal.init();
