/* ========================================
   BOOKING SYSTEM - JAVASCRIPT
   ======================================== */

// ========== DATA STRUCTURE & STORAGE ==========

const DATABASE = {
    bookings: [],
    clients: [],
    issues: [],
    busySlots: [],
    services: [
        { id: 1, name: 'Taglio Uomo', description: 'Taglio classico e professionale', price: 25, duration: 30, icon: '✂️' },
        { id: 2, name: 'Taglio Donna', description: 'Taglio e styling', price: 35, duration: 45, icon: '💇' },
        { id: 3, name: 'Trattamento', description: 'Barba o viso', price: 20, duration: 20, icon: '🧖' },
        { id: 4, name: 'Colore', description: 'Colorazione completa', price: 80, duration: 120, icon: '💇‍♀️' }
    ],
    reviews: [
        { name: 'Marco Rossi', stars: 5, text: 'Tagli perfetti e veloce. Sono 5 anni che vengo qui!', date: '25 Marzo 2024' },
        { name: 'Giulia Bianchi', stars: 5, text: 'Professionalità e cortesia. Ambiente pulito e accogliente.', date: '18 Marzo 2024' },
        { name: 'Luca Conti', stars: 5, text: 'Miglior parrucchiere in città. Consigliato a tutti!', date: '10 Marzo 2024' },
        { name: 'Francesca Gallo', stars: 5, text: 'Il colore è uscito perfetto. Molto soddisfatta!', date: '5 Marzo 2024' }
    ],
    settings: {
        name: 'Parrucchiere Rossi',
        phone: '+39 011 555 1234',
        email: 'info@parrucchiererossi.it',
        address: 'Via Roma 15, Torino',
        hoursStart: '09:00',
        hoursEnd: '18:00',
        satStart: '09:00',
        satEnd: '14:00'
    },
    parrucchiere: {
        email: 'parrucchiere@parrucchiere.it',
        password: 'parrucchiere123'
    }
};

// ========== UTILITY FUNCTIONS ==========

function loadDatabase() {
    const saved = localStorage.getItem('bookingDB');
    if (saved) {
        const parsed = JSON.parse(saved);
        DATABASE.bookings = parsed.bookings || [];
        DATABASE.clients = parsed.clients || [];
        DATABASE.issues = parsed.issues || [];
        DATABASE.busySlots = parsed.busySlots || [];
        DATABASE.services = parsed.services || DATABASE.services;
        DATABASE.reviews = parsed.reviews || DATABASE.reviews;
        DATABASE.settings = parsed.settings || DATABASE.settings;
    }
}

function saveDatabase() {
    const data = {
        bookings: DATABASE.bookings,
        clients: DATABASE.clients,
        issues: DATABASE.issues,
        busySlots: DATABASE.busySlots,
        services: DATABASE.services,
        reviews: DATABASE.reviews,
        settings: DATABASE.settings
    };

    // Save to localStorage (synchronous, immediate)
    try {
        localStorage.setItem('bookingDB', JSON.stringify(data));
    } catch (e) {
        console.error('localStorage save failed:', e);
    }

    // Also save to Firebase asynchronously if available and configured
    try {
        if (typeof db !== 'undefined' && db !== null && typeof getBusinessRef === 'function') {
            const ref = getBusinessRef();
            if (ref) {
                ref.set(data).catch(e => {
                    console.warn('Firebase save failed:', e);
                });
            }
        }
    } catch (e) {
        // Silent fail for Firebase (localStorage is primary)
    }
}

// Aggiorna i dati azienda in tutta la pagina
function updateCompanyInfo() {
    loadDatabase();
    const settings = DATABASE.settings;

    // Aggiorna header logo text
    const logoText = document.querySelector('.logo-text');
    if (logoText) logoText.textContent = settings.name;

    // Aggiorna header phone
    const headerPhone = document.querySelector('.phone-link');
    if (headerPhone) {
        headerPhone.textContent = `☎️ ${settings.phone}`;
        headerPhone.href = `tel:${settings.phone.replace(/\s+/g, '')}`;
    }

    // Aggiorna hero number
    const heroNumber = document.querySelector('.hero-number');
    if (heroNumber) heroNumber.textContent = settings.phone;

    // Aggiorna bottone CHIAMA nel hero
    const callButton = document.querySelector('a.btn-secondary');
    if (callButton && callButton.href.includes('tel:')) {
        callButton.href = `tel:${settings.phone.replace(/\s+/g, '')}`;
        callButton.innerHTML = `☎️ CHIAMA: ${settings.phone}`;
    }

    // Aggiorna contatti finali
    const contactPhone = document.querySelector('a[href^="tel:"]');
    if (contactPhone && contactPhone.href.includes('011555124')) {
        contactPhone.href = `tel:${settings.phone.replace(/\s+/g, '')}`;
        contactPhone.textContent = settings.phone;
    }

    // Aggiorna contatti nella sezione finale
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        if (item.textContent.includes('☎️')) {
            item.innerHTML = `<span>☎️ <a href="tel:${settings.phone.replace(/\s+/g, '')}">${settings.phone}</a></span>`;
        } else if (item.textContent.includes('📧')) {
            item.innerHTML = `<span>📧 <a href="mailto:${settings.email}">${settings.email}</a></span>`;
        } else if (item.textContent.includes('📍')) {
            item.innerHTML = `<span>📍 ${settings.address}</span>`;
        }
    });

    // Aggiorna location nella prenotazione privata
    const detailLocation = document.getElementById('detailLocation');
    if (detailLocation) detailLocation.textContent = settings.address;

    // Aggiorna nome nella hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = settings.name;
}

function generateUniqueId() {
    return 'booking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('it-IT', options);
}

function parseDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function getAvailableSlots(dateStr) {
    loadDatabase();
    const dayOfWeek = parseDate(dateStr).getDay();
    const slots = [];

    if (dayOfWeek === 0) return slots; // Domenica chiuso

    // Leggi gli orari dal database
    const settings = DATABASE.settings;
    let startTime = settings.hoursStart || '09:00'; // lunedì-venerdì
    let endTime = settings.hoursEnd || '18:00';

    if (dayOfWeek === 6) { // Sabato
        startTime = settings.satStart || '09:00';
        endTime = settings.satEnd || '14:00';
    }

    // Parsa l'orario (format HH:MM)
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    // Genera gli slot di 30 minuti
    let currentHour = startHour;
    let currentMin = startMin;
    const endTotalMin = endHour * 60 + endMin;

    while (currentHour * 60 + currentMin < endTotalMin) {
        const timeStr = String(currentHour).padStart(2, '0') + ':' + String(currentMin).padStart(2, '0');
        slots.push(timeStr);

        currentMin += 30;
        if (currentMin >= 60) {
            currentMin = 0;
            currentHour++;
        }
    }

    return slots;
}

// ========== HOMEPAGE FUNCTIONS ==========

function submitBooking() {
    const date = document.getElementById('bookingDate').value;
    const service = document.getElementById('bookingService').value;
    const name = document.getElementById('clientName').value.trim();
    const surname = document.getElementById('clientSurname').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const notes = document.getElementById('clientNotes').value.trim();

    const selectedTime = document.querySelector('.time-slot.selected');
    const selectedService = document.querySelector('.service-card.selected');

    if (!date || !service || !name || !surname || !phone || !selectedTime) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
    }

    const [serviceName, servicePrice, serviceDuration] = service.split('|');
    const time = selectedTime.textContent;

    const booking = {
        id: generateUniqueId(),
        token: generateToken(),
        date: date,
        time: time,
        service: serviceName,
        price: parseFloat(servicePrice),
        duration: parseInt(serviceDuration),
        clientName: name,
        clientSurname: surname,
        clientPhone: phone,
        notes: notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };

    loadDatabase();
    DATABASE.bookings.push(booking);

    // Aggiungi o aggiorna cliente
    let client = DATABASE.clients.find(c => c.phone === phone);
    if (!client) {
        client = {
            id: generateUniqueId(),
            name: name,
            surname: surname,
            email: '',
            phone: phone,
            bookingCount: 1,
            lastBooking: new Date().toISOString()
        };
        DATABASE.clients.push(client);
    } else {
        client.bookingCount++;
        client.lastBooking = new Date().toISOString();
    }

    saveDatabase();

    // Salva il token in sessionStorage per la pagina di prenotazione
    sessionStorage.setItem('currentBookingToken', booking.token);

    // Reindirizza direttamente alla pagina della prenotazione privata
    window.location.href = `prenotazione.html?token=${booking.token}`;
}

function showBookingAccess() {
    document.getElementById('bookingAccessModal').classList.remove('hidden');
}

function closeBookingAccess() {
    document.getElementById('bookingAccessModal').classList.add('hidden');
}

function accessBooking() {
    const name = document.getElementById('accessName').value.trim();
    const surname = document.getElementById('accessSurname').value.trim();

    if (!name || !surname) {
        alert('Inserisci nome e cognome');
        return;
    }

    loadDatabase();
    const booking = DATABASE.bookings.find(b =>
        b.clientName.toLowerCase() === name.toLowerCase() &&
        b.clientSurname.toLowerCase() === surname.toLowerCase() &&
        b.status !== 'cancelled'
    );

    if (booking) {
        window.location.href = `prenotazione.html?token=${booking.token}`;
    } else {
        alert('Prenotazione non trovata. Controlla i dati inseriti.');
    }
}

function updateTimeSlots() {
    const dateInput = document.getElementById('bookingDate').value;
    const serviceInput = document.getElementById('bookingService').value;
    const slotsContainer = document.getElementById('timeSlots');

    if (!dateInput || !serviceInput) {
        slotsContainer.innerHTML = '<p style="color: #999;">Seleziona data e servizio</p>';
        return;
    }

    const slots = getAvailableSlots(dateInput);

    // Se non ci sono orari disponibili, il negozio è chiuso
    if (slots.length === 0) {
        slotsContainer.innerHTML = `
            <div style="
                color: #333;
                padding: 10px 0;
                text-align: center;
                font-size: 18px;
                font-weight: 500;
                margin: 20px 0;
                letter-spacing: 0.5px;
            ">
                Il negozio è chiuso
            </div>
        `;
        return;
    }

    loadDatabase();

    const bookedTimes = DATABASE.bookings
        .filter(b => b.date === dateInput && b.status !== 'cancelled')
        .map(b => b.time);

    // Filtra i busySlots per la data selezionata
    const busyTimes = DATABASE.busySlots
        .filter(b => b.date === dateInput)
        .map(b => b.time);

    slotsContainer.innerHTML = '';
    let availableCount = 0;

    slots.forEach(slot => {
        const isBooked = bookedTimes.includes(slot) || busyTimes.includes(slot);
        if (!isBooked) availableCount++;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot' + (isBooked ? ' disabled' : '');
        btn.textContent = slot;
        btn.disabled = isBooked;

        if (!isBooked) {
            btn.onclick = function() {
                document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
                btn.classList.add('selected');
                updateSummary();
            };
        }

        slotsContainer.appendChild(btn);
    });

    // Se tutti gli orari sono occupati
    if (availableCount === 0) {
        slotsContainer.innerHTML = `
            <div style="
                background: #f5f5f5;
                border-left: 4px solid #E63946;
                color: #333;
                padding: 30px 25px;
                border-radius: 4px;
                text-align: center;
                font-size: 18px;
                font-weight: 500;
                margin: 20px 0;
                letter-spacing: 0.5px;
            ">
                Tutti gli orari sono occupati
            </div>
        `;
    }
}

function updateSummary() {
    const date = document.getElementById('bookingDate').value;
    const service = document.getElementById('bookingService').value;
    const name = document.getElementById('clientName').value;
    const surname = document.getElementById('clientSurname').value;
    const phone = document.getElementById('clientPhone').value;
    const selectedTime = document.querySelector('.time-slot.selected');

    const summaryContent = document.getElementById('summaryContent');

    if (!date || !service || !selectedTime) {
        summaryContent.innerHTML = '<p style="color: #999;">Compila il form sopra per vedere il riepilogo</p>';
        return;
    }

    const [serviceName, servicePrice] = service.split('|');
    const dateObj = parseDate(date);
    const formattedDate = formatDate(dateObj);

    summaryContent.innerHTML = `
        <div>
            <span>📅 Data:</span>
            <strong>${formattedDate}</strong>
        </div>
        <div>
            <span>🕐 Ora:</span>
            <strong>${selectedTime.textContent}</strong>
        </div>
        <div>
            <span>✂️ Servizio:</span>
            <strong>${serviceName}</strong>
        </div>
        <div>
            <span>💰 Prezzo:</span>
            <strong>${servicePrice}€</strong>
        </div>
        <div>
            <span>👤 Cliente:</span>
            <strong>${name} ${surname}</strong>
        </div>
        <div>
            <span>☎️ Telefono:</span>
            <strong>${phone}</strong>
        </div>
    `;
}

// Aggiungi listeners per aggiornamenti real-time
document.addEventListener('DOMContentLoaded', function() {
    const bookingDateInput = document.getElementById('bookingDate');
    const bookingServiceInput = document.getElementById('bookingService');
    const formInputs = document.querySelectorAll('#bookingForm input[type="text"], #bookingForm input[type="email"], #bookingForm input[type="tel"]');

    if (bookingDateInput) {
        bookingDateInput.addEventListener('change', updateTimeSlots);
        // Imposta data minima a oggi
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.setAttribute('min', today);
    }

    if (bookingServiceInput) {
        bookingServiceInput.addEventListener('change', updateTimeSlots);
    }

    formInputs.forEach(input => {
        input.addEventListener('input', updateSummary);
    });

    // Menu hamburger mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// ========== DASHBOARD CLIENTE FUNCTIONS ==========

function loadBookingFromToken() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
        alert('Token non valido');
        window.location.href = 'index.html';
        return;
    }

    loadDatabase();
    updateDateDisplay();
    const booking = DATABASE.bookings.find(b => b.token === token);

    if (!booking) {
        alert('Prenotazione non trovata');
        window.location.href = 'index.html';
        return;
    }

    // Carica i dettagli della prenotazione
    const dateObj = parseDate(booking.date);
    const formattedDate = formatDate(dateObj);

    document.getElementById('clientGreeting').textContent = `Caro/a ${booking.clientName}, ecco i dettagli della tua prenotazione`;
    document.getElementById('detailDate').textContent = formattedDate;
    document.getElementById('detailTime').textContent = `${booking.time} - ${addMinutes(booking.time, booking.duration)}`;
    document.getElementById('detailService').textContent = booking.service;
    document.getElementById('detailPrice').textContent = `${booking.price}€`;
    document.getElementById('detailLocation').textContent = DATABASE.settings.address;
    document.getElementById('detailNotes').textContent = booking.notes || '-';

    // Salva token nella sessione per le azioni
    sessionStorage.setItem('currentBookingToken', token);
}

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMins = totalMins % 60;
    return String(newHours).padStart(2, '0') + ':' + String(newMins).padStart(2, '0');
}

function editBooking() {
    const token = sessionStorage.getItem('currentBookingToken');
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);

    if (!booking) return;

    document.getElementById('editDate').value = booking.date;
    document.getElementById('editService').value = `${booking.service}|${booking.price}|${booking.duration}`;
    document.getElementById('editNotes').value = booking.notes || '';

    updateEditTimeSlots(booking.date);
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

function updateEditTimeSlots(dateStr) {
    const slots = getAvailableSlots(dateStr);
    const slotsContainer = document.getElementById('editTimeSlots');
    loadDatabase();

    const bookedTimes = DATABASE.bookings
        .filter(b => b.date === dateStr && b.status !== 'cancelled')
        .map(b => b.time);

    slotsContainer.innerHTML = '';
    slots.forEach(slot => {
        const isBooked = bookedTimes.includes(slot);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot' + (isBooked ? ' disabled' : '');
        btn.textContent = slot;
        btn.disabled = isBooked;

        if (!isBooked) {
            btn.onclick = function() {
                document.querySelectorAll('#editTimeSlots .time-slot').forEach(el => el.classList.remove('selected'));
                btn.classList.add('selected');
            };
        }

        slotsContainer.appendChild(btn);
    });
}

function saveEditBooking() {
    const token = sessionStorage.getItem('currentBookingToken');
    const newDate = document.getElementById('editDate').value;
    const newService = document.getElementById('editService').value;
    const newNotes = document.getElementById('editNotes').value;
    const selectedTime = document.querySelector('#editTimeSlots .time-slot.selected');

    if (!newDate || !newService || !selectedTime) {
        alert('Compila tutti i campi');
        return;
    }

    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);
    if (!booking) return;

    const [serviceName, servicePrice, serviceDuration] = newService.split('|');

    booking.date = newDate;
    booking.time = selectedTime.textContent;
    booking.service = serviceName;
    booking.price = parseFloat(servicePrice);
    booking.duration = parseInt(serviceDuration);
    booking.notes = newNotes;

    saveDatabase();
    closeEditModal();
    alert('Prenotazione modificata con successo!');
    location.reload();
}

function cancelBooking() {
    if (!confirm('Sei sicuro di voler annullare la prenotazione?')) return;

    const token = sessionStorage.getItem('currentBookingToken');
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);

    if (!booking) return;

    booking.status = 'cancelled';
    saveDatabase();
    alert('Prenotazione annullata');
    window.location.href = 'index.html';
}

function downloadPDF() {
    alert('Funzionalità di download PDF disponibile nella versione premium');
}

function shareWhatsApp() {
    const token = sessionStorage.getItem('currentBookingToken');
    const text = `Ho una prenotazione presso Parrucchiere Rossi! Link: https://site.com/prenotazione/${token}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`);
}

function leaveReview() {
    document.getElementById('reviewModal').classList.remove('hidden');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.add('hidden');
}

function submitReview() {
    const rating = document.querySelectorAll('#starRating .star.selected').length;
    const text = document.getElementById('reviewText').value.trim();

    if (!rating || !text) {
        alert('Inserisci voto e commento');
        return;
    }

    const token = sessionStorage.getItem('currentBookingToken');
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);

    if (!booking) return;

    const review = {
        name: booking.clientName + ' ' + booking.clientSurname,
        stars: rating,
        text: text,
        date: new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    DATABASE.reviews.push(review);
    saveDatabase();
    closeReviewModal();
    alert('Grazie per la tua review!');
}

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.dataset.value;
            stars.forEach((s, i) => {
                if (i < value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});

function reportIssue() {
    document.getElementById('issueModal').classList.remove('hidden');
}

function closeIssueModal() {
    document.getElementById('issueModal').classList.add('hidden');
}

function submitIssue() {
    const text = document.getElementById('issueText').value.trim();

    if (!text) {
        alert('Descrivi il problema che hai riscontrato');
        return;
    }

    const token = sessionStorage.getItem('currentBookingToken');
    loadDatabase();

    // Trova la prenotazione associata
    const booking = DATABASE.bookings.find(b => b.token === token);

    // Salva la segnalazione
    const issue = {
        id: generateUniqueId(),
        token: token,
        clientName: booking ? booking.clientName : 'Sconosciuto',
        clientPhone: booking ? booking.clientPhone : '-',
        description: text,
        status: 'new',
        createdAt: new Date().toISOString()
    };

    DATABASE.issues.push(issue);
    saveDatabase();

    alert('Grazie per la segnalazione! Il nostro team esaminerà il problema e ti contatterà al più presto.');
    document.getElementById('issueModal').classList.add('hidden');
    document.getElementById('issueText').value = '';
}

// ========== ADMIN FUNCTIONS ==========

function parrucchiereLogin(email, password) {
    if (email === DATABASE.parrucchiere.email && password === DATABASE.parrucchiere.password) {
        localStorage.setItem('parrucchiereSession', JSON.stringify({
            email: email,
            loginTime: new Date().toISOString()
        }));
        window.location.href = 'parrucchiere.html';
    } else {
        document.getElementById('loginError').classList.remove('hidden');
        document.getElementById('loginError').textContent = 'Email o password non valida';
    }
}

function checkAdminAuth() {
    const session = localStorage.getItem('parrucchiereSession');
    if (!session) {
        window.location.href = 'parrucchiere-login.html';
    }
}

function parrucchiereLogout() {
    localStorage.removeItem('parrucchiereSession');
    window.location.href = 'parrucchiere-login.html';
}

function showAdminTab(tabName) {
    // Nascondi tutti i tab
    document.querySelectorAll('.parrucchiere-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Nascondi tutti i link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Mostra il tab selezionato
    const tab = document.getElementById(`tab-${tabName}`);
    if (tab) {
        tab.classList.add('active');
    }

    // Evidenzia il link
    const activeLink = document.querySelector(`.sidebar-link[data-tab="${tabName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Previeni il default del link
    if (event) {
        event.preventDefault();
    }
}

function loadAdminDashboard() {
    loadDatabase();
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = DATABASE.bookings.filter(b => b.date === today && b.status !== 'cancelled');

    const completed = todayBookings.filter(b => b.status === 'completed').length;
    const pending = todayBookings.filter(b => b.status === 'confirmed').length;
    const revenue = todayBookings.reduce((sum, b) => sum + b.price, 0);

    // Formatta il numero con "k" se >= 1000
    const formattedRevenue = revenue >= 1000 ? (revenue / 1000).toFixed(1) + 'k' : revenue;

    document.getElementById('statBookings').textContent = todayBookings.length;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statRevenue').textContent = formattedRevenue + '€';
    document.getElementById('statPending').textContent = pending;

    // Carica prenotazioni di oggi
    const todayList = document.getElementById('todayBookings');
    if (todayBookings.length === 0) {
        todayList.innerHTML = '<p style="color: #999;">Nessuna prenotazione per oggi</p>';
    } else {
        todayList.innerHTML = todayBookings.map(booking => `
            <div class="booking-item">
                <div class="booking-time">
                    <span>${booking.status === 'completed' ? '✔️' : booking.status === 'confirmed' ? '✅' : '❌'}</span>
                    ${booking.time} - ${booking.clientName} ${booking.clientSurname}
                </div>
                <div class="booking-name">
                    ${booking.service} (${booking.price}€) | ☎️ ${booking.clientPhone}
                </div>
                <div style="margin-top: 8px;">
                    <button class="btn btn-small btn-secondary" onclick="markComplete('${booking.token}')">Completa</button>
                    <button class="btn btn-small btn-danger" onclick="markCancelled('${booking.token}')">Annulla</button>
                </div>
            </div>
        `).join('');
    }

    // Carica impegni di oggi
    loadAdminBusySlots();

    // Carica recensioni recenti
    loadAdminReviews();
}

function loadAdminBusySlots() {
    loadDatabase();
    const today = new Date().toISOString().split('T')[0];
    const todayBusySlots = DATABASE.busySlots.filter(b => b.date === today);

    const busyList = document.getElementById('todayBusySlots');
    if (todayBusySlots.length === 0) {
        busyList.innerHTML = '<p style="color: #999;">Nessun impegno per oggi</p>';
    } else {
        busyList.innerHTML = todayBusySlots.map(busy => `
            <div class="booking-item">
                <div class="booking-time">
                    <span>⏸️</span>
                    ${busy.time} - Impegno Parrucchiere
                </div>
                <div style="margin-top: 8px;">
                    <button class="btn btn-small btn-danger" onclick="deleteBusySlot('${busy.id}')">Elimina</button>
                </div>
            </div>
        `).join('');
    }
}

function openAddBusySlotModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('busySlotDate').value = today;
    document.getElementById('busySlotTime').value = '12:00';
    document.getElementById('addBusySlotModal').classList.remove('hidden');
}

function closeAddBusySlotModal() {
    document.getElementById('addBusySlotModal').classList.add('hidden');
}

function saveBusySlot() {
    const date = document.getElementById('busySlotDate').value;
    const time = document.getElementById('busySlotTime').value;

    if (!date || !time) {
        alert('Seleziona data e orario');
        return;
    }

    loadDatabase();

    const busySlot = {
        id: generateUniqueId(),
        date: date,
        time: time,
        createdAt: new Date().toISOString()
    };

    DATABASE.busySlots.push(busySlot);
    saveDatabase();
    closeAddBusySlotModal();
    loadAdminDashboard();
    loadAdminBusySlots();
}

function deleteBusySlot(id) {
    if (!confirm('Sei sicuro di voler eliminare questo impegno?')) return;
    loadDatabase();
    DATABASE.busySlots = DATABASE.busySlots.filter(b => b.id !== id);
    saveDatabase();
    loadAdminDashboard();
    loadAdminBusySlots();
}

function loadAdminBookings() {
    loadDatabase();
    const tbody = document.getElementById('bookingsTableBody');

    if (DATABASE.bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #999;">Nessuna prenotazione</td></tr>';
        return;
    }

    tbody.innerHTML = DATABASE.bookings.map(booking => {
        const statusEmoji = booking.status === 'completed' ? '✔️' : booking.status === 'confirmed' ? '✅' : '❌';
        const dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('it-IT');
        return `
            <tr>
                <td>${dateFormatted}</td>
                <td>${booking.time}</td>
                <td>${booking.clientName} ${booking.clientSurname}</td>
                <td>${booking.service}</td>
                <td><a href="tel:${booking.clientPhone}">${booking.clientPhone}</a></td>
                <td>${booking.price}€</td>
                <td>${statusEmoji} ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</td>
                <td>
                    <button class="btn btn-small" onclick="viewBookingDetails('${booking.token}')">Dettagli</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminCalendar() {
    loadDatabase();
    const container = document.getElementById('calendarContainer');

    // Genera calendario per il mese corrente
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Conta appuntamenti per ogni giorno
    const appointmentsByDay = {};
    DATABASE.bookings.forEach(booking => {
        const bookingDate = new Date(booking.date + 'T00:00:00');
        if (bookingDate.getFullYear() === year && bookingDate.getMonth() === month) {
            const day = bookingDate.getDate();
            appointmentsByDay[day] = (appointmentsByDay[day] || 0) + 1;
        }
    });

    // Nomi dei mesi e giorni della settimana
    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

    let html = `
        <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: 30px;">${monthNames[month]} ${year}</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
    `;

    // Header con giorni della settimana
    dayNames.forEach(day => {
        html += `<th style="padding: 10px; text-align: center; font-weight: bold; border-bottom: 2px solid #E63946;">${day}</th>`;
    });

    html += `
                    </tr>
                </thead>
                <tbody>
                    <tr>
    `;

    // Celle vuote per i giorni prima del primo del mese
    for (let i = 0; i < startingDayOfWeek; i++) {
        html += `<td style="padding: 10px; height: 100px; border: 1px solid #e8e8e8; background: #f9f9f9;"></td>`;
    }

    // Celle per i giorni del mese
    let cellCount = startingDayOfWeek;
    for (let day = 1; day <= daysInMonth; day++) {
        const count = appointmentsByDay[day] || 0;
        const isToday = day === today.getDate();
        const bgColor = isToday ? '#0052CC' : count > 0 ? '#f0f0f0' : '#ffffff';
        const textColor = isToday ? '#ffffff' : '#333';
        const dayStyle = isToday ? 'font-weight: bold; color: white;' : '';

        html += `
            <td style="
                padding: 10px;
                height: 100px;
                border: 1px solid #e8e8e8;
                background: ${bgColor};
                vertical-align: top;
                text-align: center;
            ">
                <div style="font-weight: bold; color: ${textColor}; margin-bottom: 5px;">${day}</div>
                ${count > 0 ? `<div style="color: #E63946; font-weight: bold; font-size: 18px;">${count}</div>` : ''}
                ${count > 0 ? `<div style="color: #666; font-size: 12px;">appuntament${count > 1 ? 'i' : 'o'}</div>` : ''}
            </td>
        `;

        cellCount++;
        if (cellCount % 7 === 0 && day < daysInMonth) {
            html += `</tr><tr>`;
        }
    }

    // Celle vuote per i giorni dopo l'ultimo del mese
    while (cellCount % 7 !== 0) {
        html += `<td style="padding: 10px; height: 100px; border: 1px solid #e8e8e8; background: #f9f9f9;"></td>`;
        cellCount++;
    }

    html += `
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}

function loadAdminClients() {
    loadDatabase();
    const clientsList = document.getElementById('clientsList');

    if (DATABASE.clients.length === 0) {
        clientsList.innerHTML = '<p style="color: #999;">Nessun cliente</p>';
        return;
    }

    clientsList.innerHTML = DATABASE.clients.map(client => `
        <div class="client-item">
            <div class="client-info">
                <div class="client-name">${client.name} ${client.surname}</div>
                <div class="client-contact">
                    ☎️ ${client.phone} | 📧 ${client.email}
                </div>
                <div class="client-contact">
                    Prenotazioni: ${client.bookingCount} | Ultima: ${new Date(client.lastBooking).toLocaleDateString('it-IT')}
                </div>
            </div>
            <div>
                <button class="btn btn-small" onclick="contactClient('${client.email}')">Contatta</button>
            </div>
        </div>
    `).join('');
}

function loadAdminServices() {
    loadDatabase();
    const servicesList = document.getElementById('servicesList');

    servicesList.innerHTML = DATABASE.services.map(service => `
        <div class="service-item">
            <div>
                <div class="service-name">${service.icon} ${service.name}</div>
                <div class="service-details">${service.description}</div>
            </div>
            <div class="service-details" style="text-align: right;">
                <strong>${service.price}€</strong> - ${service.duration} min
            </div>
            <div>
                <button class="btn btn-small btn-secondary" onclick="editService(${service.id})">Modifica</button>
                <button class="btn btn-small btn-danger" onclick="deleteService(${service.id})">Elimina</button>
            </div>
        </div>
    `).join('');
}

function loadAdminIssues() {
    loadDatabase();
    const issuesList = document.getElementById('issuesList');

    if (DATABASE.issues.length === 0) {
        issuesList.innerHTML = '<p style="color: #999;">Nessuna segnalazione</p>';
        return;
    }

    issuesList.innerHTML = DATABASE.issues.map(issue => `
        <div class="client-item">
            <div class="client-info">
                <div class="client-name">⚠️ ${issue.clientName}</div>
                <div class="client-contact">
                    ☎️ ${issue.clientPhone} | Status: ${issue.status === 'new' ? '🆕 Nuovo' : '✅ Risolto'}
                </div>
                <div class="client-contact" style="margin-top: 8px;">
                    ${issue.description}
                </div>
                <div class="client-contact" style="color: #999; font-size: 12px; margin-top: 8px;">
                    ${new Date(issue.createdAt).toLocaleDateString('it-IT')} ${new Date(issue.createdAt).toLocaleTimeString('it-IT')}
                </div>
            </div>
            <div>
                <button class="btn btn-small btn-secondary" onclick="markIssueResolved('${issue.id}')">
                    ${issue.status === 'new' ? 'Contattato' : 'Riapri'}
                </button>
            </div>
        </div>
    `).join('');
}

function markIssueResolved(issueId) {
    loadDatabase();
    const issue = DATABASE.issues.find(i => i.id === issueId);
    if (issue) {
        issue.status = issue.status === 'new' ? 'resolved' : 'new';
        saveDatabase();
        loadAdminIssues();
    }
}

function markComplete(token) {
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);
    if (booking) {
        booking.status = 'completed';
        saveDatabase();
        loadAdminDashboard();
        loadAdminBookings();
    }
}

function markCancelled(token) {
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);
    if (booking) {
        booking.status = 'cancelled';
        saveDatabase();
        loadAdminDashboard();
        loadAdminBookings();
    }
}

function filterBookings() {
    const filterDate = document.getElementById('filterDate').value;
    const filterStatus = document.getElementById('filterStatus').value;

    loadDatabase();

    let filtered = DATABASE.bookings;

    if (filterDate) {
        filtered = filtered.filter(b => b.date === filterDate);
    }

    if (filterStatus) {
        filtered = filtered.filter(b => b.status === filterStatus);
    }

    const tbody = document.getElementById('bookingsTableBody');
    tbody.innerHTML = filtered.map(booking => {
        const statusEmoji = booking.status === 'completed' ? '✔️' : booking.status === 'confirmed' ? '✅' : '❌';
        return `
            <tr>
                <td>${booking.time}</td>
                <td>${booking.clientName} ${booking.clientSurname}</td>
                <td>${booking.service}</td>
                <td><a href="tel:${booking.clientPhone}">${booking.clientPhone}</a></td>
                <td>${booking.price}€</td>
                <td>${statusEmoji} ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</td>
                <td>
                    <button class="btn btn-small" onclick="viewBookingDetails('${booking.token}')">Dettagli</button>
                </td>
            </tr>
        `;
    }).join('');
}

function searchClients() {
    const searchTerm = document.getElementById('searchClient').value.toLowerCase();
    loadDatabase();

    const filtered = DATABASE.clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.surname.toLowerCase().includes(searchTerm) ||
        c.email.toLowerCase().includes(searchTerm) ||
        c.phone.includes(searchTerm)
    );

    const clientsList = document.getElementById('clientsList');
    clientsList.innerHTML = filtered.map(client => `
        <div class="client-item">
            <div class="client-info">
                <div class="client-name">${client.name} ${client.surname}</div>
                <div class="client-contact">
                    ☎️ ${client.phone} | 📧 ${client.email}
                </div>
            </div>
        </div>
    `).join('');
}

function exportClients() {
    loadDatabase();

    let csv = 'Nome,Cognome,Email,Telefono,Prenotazioni,Ultima Prenotazione\n';
    DATABASE.clients.forEach(client => {
        csv += `"${client.name}","${client.surname}","${client.email}","${client.phone}",${client.bookingCount},"${new Date(client.lastBooking).toLocaleDateString('it-IT')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clienti_parrucchiere.csv';
    link.click();
}

function exportBookings() {
    loadDatabase();

    let csv = 'Data,Ora,Nome,Cognome,Servizio,Telefono,Prezzo,Status\n';
    DATABASE.bookings.forEach(booking => {
        const dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('it-IT');
        csv += `"${dateFormatted}","${booking.time}","${booking.clientName}","${booking.clientSurname}","${booking.service}","${booking.clientPhone}",${booking.price},"${booking.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prenotazioni_parrucchiere.csv';
    link.click();
}

function openAddServiceModal() {
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('servicePrice').value = '';
    document.getElementById('serviceDuration').value = '';
    document.getElementById('addServiceModal').classList.remove('hidden');
}

function closeAddServiceModal() {
    document.getElementById('addServiceModal').classList.add('hidden');
}

function saveService() {
    const serviceId = document.getElementById('serviceId').value;
    const name = document.getElementById('serviceName').value.trim();
    const description = document.getElementById('serviceDescription').value.trim();
    const price = parseFloat(document.getElementById('servicePrice').value);
    const duration = parseInt(document.getElementById('serviceDuration').value);

    if (!name || !description || !price || !duration) {
        alert('Compila tutti i campi');
        return;
    }

    loadDatabase();

    if (serviceId) {
        // MODIFICA
        const service = DATABASE.services.find(s => s.id == serviceId);
        if (service) {
            service.name = name;
            service.description = description;
            service.price = price;
            service.duration = duration;
        }
    } else {
        // AGGIUNTA
        const maxId = DATABASE.services.length > 0
            ? Math.max(...DATABASE.services.map(s => s.id))
            : 0;
        const newService = {
            id: maxId + 1,
            name: name,
            description: description,
            price: price,
            duration: duration,
            icon: '✨'
        };
        DATABASE.services.push(newService);
    }

    saveDatabase();
    closeAddServiceModal();
    loadAdminServices();
}

function openAddServiceModal() {
    document.getElementById('serviceId').value = '';
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('servicePrice').value = '';
    document.getElementById('serviceDuration').value = '';
    document.getElementById('serviceModalTitle').textContent = 'Aggiungi Servizio';
    document.getElementById('serviceSubmitBtn').textContent = 'Aggiungi Servizio';
    document.getElementById('addServiceModal').classList.remove('hidden');
}

function editService(id) {
    loadDatabase();
    const service = DATABASE.services.find(s => s.id == id);
    if (!service) return;

    document.getElementById('serviceId').value = id;
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceDescription').value = service.description;
    document.getElementById('servicePrice').value = service.price;
    document.getElementById('serviceDuration').value = service.duration;
    document.getElementById('serviceModalTitle').textContent = 'Modifica Servizio';
    document.getElementById('serviceSubmitBtn').textContent = 'Salva Modifiche';
    document.getElementById('addServiceModal').classList.remove('hidden');
}

function deleteService(id) {
    if (!confirm('Sei sicuro di voler eliminare questo servizio?')) return;
    loadDatabase();
    DATABASE.services = DATABASE.services.filter(s => s.id !== id);
    saveDatabase();
    loadAdminServices();
}

function loadAdminSettings() {
    loadDatabase();

    // Carica i dati dell'azienda
    document.getElementById('settingsName').value = DATABASE.settings.name || 'Parrucchiere Rossi';
    document.getElementById('settingsPhone').value = DATABASE.settings.phone || '+39 011 555 1234';
    document.getElementById('settingsEmail').value = DATABASE.settings.email || 'info@parrucchiererossi.it';
    document.getElementById('settingsAddress').value = DATABASE.settings.address || 'Via Roma 15, Torino';

    // Carica gli orari
    document.getElementById('hourStart').value = DATABASE.settings.hoursStart || '09:00';
    document.getElementById('hourEnd').value = DATABASE.settings.hoursEnd || '18:00';
    document.getElementById('satStart').value = DATABASE.settings.satStart || '09:00';
    document.getElementById('satEnd').value = DATABASE.settings.satEnd || '14:00';
}

function saveSettings() {
    loadDatabase();

    DATABASE.settings.name = document.getElementById('settingsName').value;
    DATABASE.settings.phone = document.getElementById('settingsPhone').value;
    DATABASE.settings.email = document.getElementById('settingsEmail').value;
    DATABASE.settings.address = document.getElementById('settingsAddress').value;
    DATABASE.settings.hoursStart = document.getElementById('hourStart').value;
    DATABASE.settings.hoursEnd = document.getElementById('hourEnd').value;
    DATABASE.settings.satStart = document.getElementById('satStart').value;
    DATABASE.settings.satEnd = document.getElementById('satEnd').value;

    saveDatabase();
    updateCompanyInfo();
    alert('Impostazioni salvate con successo!');
}

function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (current !== DATABASE.parrucchiere.password) {
        alert('Password attuale non corretta');
        return;
    }

    if (newPass !== confirm) {
        alert('Le password non coincidono');
        return;
    }

    if (newPass.length < 6) {
        alert('La password deve essere lunga almeno 6 caratteri');
        return;
    }

    DATABASE.parrucchiere.password = newPass;
    saveDatabase();
    alert('Password cambiata con successo!');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function contactClient(email) {
    window.location.href = `mailto:${email}`;
}

function viewBookingDetails(token) {
    loadDatabase();
    const booking = DATABASE.bookings.find(b => b.token === token);
    if (!booking) return;

    const dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('it-IT');
    const detailsHTML = `
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <div style="margin-bottom: 15px;">
                <strong>Data:</strong> ${dateFormatted}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Ora:</strong> ${booking.time}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Cliente:</strong> ${booking.clientName} ${booking.clientSurname}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Telefono:</strong> <a href="tel:${booking.clientPhone}">${booking.clientPhone}</a>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Servizio:</strong> ${booking.service}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Durata:</strong> ${booking.duration} minuti
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Prezzo:</strong> ${booking.price}€
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Note:</strong> ${booking.notes || '-'}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Status:</strong> ${booking.status}
            </div>
        </div>
    `;

    document.getElementById('bookingDetailsContent').innerHTML = detailsHTML;
    document.getElementById('bookingDetailsModal').classList.remove('hidden');
}

function closeBookingDetailsModal() {
    document.getElementById('bookingDetailsModal').classList.add('hidden');
}

// Aggiorna la data in alto
function updateDateDisplay() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Capitalizza il primo carattere per avere "Lunedì" invece di "lunedì"
    const capitalizedDateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    // Aggiorna data nella dashboard parrucchiere (data completa più grande)
    const dashboardDateElement = document.getElementById('dashboardDate');
    if (dashboardDateElement) {
        dashboardDateElement.textContent = capitalizedDateStr;
    }
}

// Carica le recensioni recenti nella dashboard parrucchiere
function loadAdminReviews() {
    loadDatabase();
    const reviewsList = document.getElementById('recentReviews');

    if (!reviewsList) return;

    if (DATABASE.reviews && DATABASE.reviews.length > 0) {
        let reviewsHTML = '';
        // Mostra le ultime 5 recensioni
        const recentReviews = DATABASE.reviews.slice(-5).reverse();

        recentReviews.forEach(review => {
            const stars = '⭐'.repeat(review.stars);
            reviewsHTML += `
                <div style="padding: 12px; border-bottom: 1px solid #eee; margin-bottom: 10px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">${review.name} ${stars}</div>
                    <div style="color: #666; font-size: 13px; margin-bottom: 5px;">${review.text}</div>
                    <div style="color: #999; font-size: 12px;">${review.date}</div>
                </div>
            `;
        });

        reviewsList.innerHTML = reviewsHTML;
    }
}

// Inizializza il database al caricamento
loadDatabase();
updateDateDisplay();
