
const select = document.getElementById('bookingService');
if (select) {
    const options = select.querySelectorAll('option');
    console.log('Dropdown trovato con ' + options.length + ' opzioni');
    for (let i = 0; i < options.length; i++) {
        console.log('Option ' + i + ': ' + options[i].textContent);
    }
} else {
    console.log('Dropdown NON trovato');
}
