/**
 * SISTEMA DI NOTIFICHE INTELLIGENTE
 * - Notifiche Push (se permesso concesso)
 * - Notifiche In-App (fallback/sempre disponibile)
 * - Form di Review automatico
 */

const NotificationSystem = {
    myBookingToken: null,
    pushPermissionAsked: false,

    // Inizializza il sistema di notifiche
    async init() {
        console.log('🔔 Initializing Notification System...');

        // Carica il token della prenotazione del cliente da localStorage
        this.myBookingToken = localStorage.getItem('myBookingToken');

        // Registra Service Worker
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/service-worker.js');
                console.log('✅ Service Worker registrato');
            } catch (error) {
                console.log('⚠️ Service Worker fallito:', error.message);
            }
        }

        // Chiedi permesso per notifiche push
        if ('Notification' in window && Notification.permission === 'default') {
            this.askPushPermission();
        }

        // Ascolta i messaggi dal service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'OPEN_REVIEW_FORM') {
                    this.openReviewForm(event.data.token, event.data.bookingId);
                }
            });
        }
    },

    // Chiedi permesso per notifiche push
    async askPushPermission() {
        if (this.pushPermissionAsked) return;
        this.pushPermissionAsked = true;

        const result = await Notification.requestPermission();
        console.log('🔔 Permesso notifiche:', result);
    },

    // Mostra notifica (push o in-app)
    async showNotification(title, body, token, bookingId) {
        console.log('🔔 Showing notification:', title);

        // Prova notifica Push
        if ('Notification' in window && Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.controller?.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    title: title,
                    body: body,
                    token: token,
                    bookingId: bookingId
                });
                console.log('📱 Notifica PUSH inviata');
                return;
            }
        }

        // Fallback: notifica In-App
        this.showInAppNotification(title, body, token, bookingId);
    },

    // Notifica In-App (rimane finché non clicca "Chiudi")
    showInAppNotification(title, body, token, bookingId) {
        console.log('💬 Mostrando notifica In-App');

        // Crea il container se non esiste
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                font-family: Arial, sans-serif;
            `;
            document.body.appendChild(container);
        }

        // Crea la notifica
        const notification = document.createElement('div');
        notification.className = 'in-app-notification';
        notification.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin-bottom: 10px;
            animation: slideIn 0.3s ease;
        `;

        notification.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">✂️ ${title}</div>
            <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.95;">${body}</div>
            <div style="display: flex; gap: 10px;">
                <button onclick="NotificationSystem.closeNotification(this)" style="
                    flex: 1;
                    padding: 8px 12px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Chiudi</button>
                <button onclick="NotificationSystem.openReviewForm('${token}', '${bookingId}')" style="
                    flex: 1;
                    padding: 8px 12px;
                    background: white;
                    border: none;
                    color: #667eea;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Valuta ⭐</button>
            </div>
        `;

        container.appendChild(notification);

        // Aggiungi animazione CSS se non esiste
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(500px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    closeNotification(button) {
        button.closest('.in-app-notification')?.remove();
    },

    // Apri il form di review
    openReviewForm(token, bookingId) {
        console.log('⭐ Apertura form review per:', bookingId);

        // Crea modale review
        let modal = document.getElementById('review-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'review-modal';
            document.body.appendChild(modal);
        }

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

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                animation: slideUp 0.3s ease;
            ">
                <h2 style="margin: 0 0 10px 0; color: #333;">Come è andata? ⭐</h2>
                <p style="color: #666; margin: 0 0 20px 0;">Lascia una recensione per aiutare altri clienti</p>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Voto:</label>
                    <div id="star-rating" style="font-size: 32px; cursor: pointer;">
                        <span class="star" data-rating="1">⭐</span>
                        <span class="star" data-rating="2">⭐</span>
                        <span class="star" data-rating="3">⭐</span>
                        <span class="star" data-rating="4">⭐</span>
                        <span class="star" data-rating="5">⭐</span>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Commento:</label>
                    <textarea id="review-text" placeholder="Racconta la tua esperienza..." style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        font-size: 14px;
                        min-height: 100px;
                        box-sizing: border-box;
                    "></textarea>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button onclick="document.getElementById('review-modal').remove()" style="
                        flex: 1;
                        padding: 12px;
                        background: #eee;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Annulla</button>
                    <button onclick="NotificationSystem.submitReview('${token}', '${bookingId}')" style="
                        flex: 1;
                        padding: 12px;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Invia Recensione</button>
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
                    .star {
                        opacity: 0.3;
                        transition: opacity 0.2s;
                        margin-right: 5px;
                    }
                    .star.active {
                        opacity: 1;
                    }
                </style>
            </div>
        `;

        // Sistema di rating con le stelle
        let selectedRating = 0;
        modal.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.dataset.rating);
                modal.querySelectorAll('.star').forEach((s, index) => {
                    s.classList.toggle('active', index < selectedRating);
                });
            });
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.dataset.rating);
                modal.querySelectorAll('.star').forEach((s, index) => {
                    s.style.opacity = index < rating ? '1' : '0.3';
                });
            });
        });

        modal.addEventListener('mouseleave', function() {
            modal.querySelectorAll('.star').forEach((s, index) => {
                s.style.opacity = index < selectedRating ? '1' : '0.3';
            });
        });

        // Salva il rating selezionato
        window.selectedReviewRating = selectedRating;
    },

    // Invia la recensione a Firebase
    async submitReview(token, bookingId) {
        const rating = window.selectedReviewRating || 0;
        const text = document.getElementById('review-text')?.value || '';

        if (rating === 0) {
            alert('Per favore seleziona almeno una stella!');
            return;
        }

        console.log('⭐ Invio recensione:', { token, bookingId, rating, text });

        // Salva in localStorage
        const reviews = JSON.parse(localStorage.getItem('bookingDB'))?.reviews || [];
        const newReview = {
            id: 'review_' + Date.now(),
            bookingId: bookingId,
            token: token,
            name: 'Cliente Anonimo',
            stars: rating,
            text: text,
            date: new Date().toLocaleDateString('it-IT'),
            createdAt: new Date().toISOString()
        };

        reviews.push(newReview);

        // Salva in localStorage
        const data = JSON.parse(localStorage.getItem('bookingDB')) || {};
        data.reviews = reviews;
        localStorage.setItem('bookingDB', JSON.stringify(data));

        // Sincronizza con Firebase
        try {
            const FIREBASE_DB_URL = 'https://parrucchieri-online-default-rtdb.europe-west1.firebasedatabase.app';
            const BUSINESS_ID = 'demo-parrucchiere-rossi';

            await fetch(`${FIREBASE_DB_URL}/businesses/${BUSINESS_ID}/reviews.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviews)
            });

            console.log('✅ Recensione salvata in Firebase');
        } catch (error) {
            console.log('⚠️ Errore sincronizzazione Firebase:', error.message);
        }

        // Chiudi modale e mostra messaggio
        document.getElementById('review-modal').remove();
        alert('✅ Grazie per la tua recensione!');
    }
};

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NotificationSystem.init());
} else {
    NotificationSystem.init();
}
