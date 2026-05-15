// This script tests if services are loading on index.html
// Run in browser console while on http://localhost:8000/index.html

console.log('=== TEST SERVIZI HOMEPAGE ===');

// Test 1: Check defaultServices
if (typeof defaultServices !== 'undefined') {
    console.log('✅ defaultServices definito:', defaultServices.length, 'servizi');
} else {
    console.log('❌ defaultServices NON definito');
}

// Test 2: Check getServices function
if (typeof getServices === 'function') {
    const services = getServices();
    console.log('✅ getServices() torna:', services.length, 'servizi');
    services.forEach(s => console.log('   📌 ' + s.name + ' - ' + s.price + '€'));
} else {
    console.log('❌ getServices function NON trovata');
}

// Test 3: Check dropdown
const select = document.getElementById('bookingService');
if (select) {
    const options = select.querySelectorAll('option');
    console.log('✅ Dropdown trovato con', options.length, 'opzioni totali');
    if (options.length > 1) {
        console.log('   ✅ Dropdown popolo con servizi');
        for (let i = 1; i < options.length; i++) {
            console.log('   ' + i + '. ' + options[i].textContent);
        }
    } else {
        console.log('   ❌ Dropdown VUOTO - nessun servizio aggiunto');
    }
} else {
    console.log('❌ Dropdown NON trovato');
}

// Test 4: Check services grid
const grid = document.getElementById('servicesGrid');
if (grid) {
    console.log('✅ servicesGrid trovato');
    const cards = grid.querySelectorAll('div');
    console.log('   ' + cards.length + ' elementi nel grid');
} else {
    console.log('❌ servicesGrid NON trovato');
}

// Test 5: Check validatePageElements
if (typeof validatePageElements === 'function') {
    const result = validatePageElements();
    console.log('✅ validatePageElements() result:', result);
} else {
    console.log('❌ validatePageElements function NON trovata');
}

console.log('=== FINE TEST ===');
