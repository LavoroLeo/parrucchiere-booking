// Test Booking Flow - Simula il flusso di prenotazione
console.log('=== TEST 1: FLUSSO PRENOTAZIONE COMPLETO ===\n');

// Passo 1: Verifica servizi caricati
console.log('STEP 1: Verifica servizi nel dropdown');
const serviceSelect = document.getElementById('bookingService');
if (serviceSelect) {
    const options = Array.from(serviceSelect.options).slice(1); // Esclude placeholder
    console.log('✅ Dropdown trovato con', options.length, 'servizi');
    options.forEach((opt, i) => console.log('   ' + (i+1) + '. ' + opt.text));
    
    // Simula selezione primo servizio
    if (options.length > 0) {
        serviceSelect.value = options[0].value;
        serviceSelect.dispatchEvent(new Event('change'));
        console.log('✅ Servizio selezionato:', options[0].text);
    }
} else {
    console.log('❌ Dropdown servizi non trovato');
}

// Passo 2: Verifica campo data
console.log('\nSTEP 2: Verifica campo data');
const dateInput = document.getElementById('bookingDate');
if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    dateInput.value = dateStr;
    dateInput.dispatchEvent(new Event('change'));
    console.log('✅ Data selezionata:', dateStr);
} else {
    console.log('❌ Campo data non trovato');
}

// Passo 3: Verifica orari disponibili
console.log('\nSTEP 3: Verifica orari disponibili');
const orariGrid = document.getElementById('orariGrid');
if (orariGrid) {
    const timeButtons = orariGrid.querySelectorAll('button');
    console.log('✅ Grid orari trovato con', timeButtons.length, 'orari');
    if (timeButtons.length > 0) {
        console.log('   Orari disponibili:', Array.from(timeButtons).map(b => b.textContent).join(', '));
    }
} else {
    console.log('❌ Grid orari non trovato');
}

// Passo 4: Verifica form dati cliente
console.log('\nSTEP 4: Verifica form dati cliente');
const nameInput = document.getElementById('bookingName');
const surnameInput = document.getElementById('bookingSurname');
const phoneInput = document.getElementById('bookingPhone');

if (nameInput && surnameInput && phoneInput) {
    console.log('✅ Tutti i campi form trovati');
    // Simula compilazione
    nameInput.value = 'Test Mario';
    surnameInput.value = 'Rossi';
    phoneInput.value = '3201234567';
    console.log('✅ Form compilato con dati test');
} else {
    console.log('❌ Campi form non trovati');
    console.log('   Nome:', nameInput ? '✅' : '❌');
    console.log('   Cognome:', surnameInput ? '✅' : '❌');
    console.log('   Telefono:', phoneInput ? '✅' : '❌');
}

// Passo 5: Verifica pulsante conferma
console.log('\nSTEP 5: Verifica pulsante conferma');
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    console.log('✅ Pulsante conferma trovato');
    console.log('   Testo:', submitBtn.textContent);
    console.log('   Stato:', submitBtn.disabled ? 'DISABILITATO' : 'ABILITATO');
} else {
    console.log('❌ Pulsante conferma non trovato');
}

console.log('\n=== FINE TEST 1 ===');
