// Service Worker per notifiche push in background
console.log('🔔 Service Worker registrato - ascolta notifiche in background');

// Ascolta i messaggi dal main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, token, bookingId } = event.data;

        self.registration.showNotification(title, {
            body: body,
            icon: '✂️',
            badge: '✂️',
            tag: `booking-${bookingId}`, // Evita notifiche duplicate
            requireInteraction: true, // Rimane finché non clicca
            actions: [
                { action: 'close', title: 'Chiudi' },
                { action: 'review', title: 'Valuta' }
            ],
            data: { token, bookingId } // Dati da passare al click
        });

        console.log('🔔 Notifica push inviata:', title);
    }
});

// Gestisci i click sulla notifica
self.addEventListener('notificationclick', (event) => {
    const { token, bookingId } = event.notification.data;
    event.notification.close();

    if (event.action === 'review' || !event.action) {
        // Apri la finestra del client e invia messaggio
        event.waitUntil(
            self.clients.matchAll().then((clients) => {
                if (clients.length > 0) {
                    // Invia messaggio al client aperto
                    clients[0].postMessage({
                        type: 'OPEN_REVIEW_FORM',
                        token: token,
                        bookingId: bookingId
                    });
                    clients[0].focus();
                } else {
                    // Se nessun client è aperto, apri una nuova finestra
                    return self.clients.openWindow('/cliente-prenotazioni.html?review=' + bookingId);
                }
            })
        );
    }
});

// Gestisci la chiusura della notifica
self.addEventListener('notificationclose', (event) => {
    console.log('🔔 Notifica chiusa:', event.notification.tag);
});
