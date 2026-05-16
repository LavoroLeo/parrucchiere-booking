/**
 * BOOKING INTERCEPTOR
 * Intercetta il salvataggio delle prenotazioni e aggiunge parrucchiereId
 */

const BookingInterceptor = {
    init() {
        console.log('📝 Initializing Booking Interceptor...');

        // Monitora quando una nuova prenotazione viene aggiunta a localStorage
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            if (key === 'bookingDB') {
                try {
                    const data = JSON.parse(value);

                    // Se ci sono prenotazioni, assicura che abbiano parrucchiereId
                    if (data.bookings && data.bookings.length > 0) {
                        data.bookings.forEach((booking, index) => {
                            // Se la prenotazione non ha parrucchiereId, aggiungilo
                            if (!booking.parrucchiereId) {
                                const parrucchiereId = window.currentParrucchiereId ||
                                    document.getElementById('parrucchiereId')?.value ||
                                    'p1'; // Default al primo parrucchiere

                                booking.parrucchiereId = parrucchiereId;
                                console.log('✅ ParrucchiereId aggiunto alla prenotazione:', parrucchiereId);
                            }
                        });

                        // Risalva con parrucchiereId
                        value = JSON.stringify(data);
                    }
                } catch (e) {
                    console.log('⚠️ Errore parsing booking:', e.message);
                }
            }

            // Chiama il metodo originale
            return originalSetItem.call(this, key, value);
        };

        console.log('✅ Booking Interceptor attivo');
    }
};

// Inizializza
BookingInterceptor.init();
