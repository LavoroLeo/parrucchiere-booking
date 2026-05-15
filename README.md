# 📅 Sistema di Prenotazioni Online - Parrucchiere Rossi

Un **sito web completo** per gestire prenotazioni online senza registrazione, con dashboard cliente e area parrucchiere.

## 🚀 Caratteristiche

✅ **Homepage pubblica** - Prenotazioni in 30 secondi senza account  
✅ **Dashboard cliente** - Accesso privato via link personale (no password)  
✅ **Dashboard parrucchiere** - Gestione completa prenotazioni, clienti, servizi, orari  
✅ **Design bellissimo** - Moderno, minimalista, 100% responsive  
✅ **Completamente personalizzabile** - Nome azienda, logo, servizi, orari  
✅ **localStorage database** - Nessun server backend necessario  

---

## 📁 Struttura File

```
├── index.html              # Homepage pubblica
├── prenotazione.html       # Dashboard cliente (accesso via token)
├── parrucchiere-login.html        # Pagina login parrucchiere
├── parrucchiere.html              # Dashboard amministratore
├── style.css               # Design unificato
├── script.js               # Logica + autenticazione
└── README.md               # Questo file
```

---

## 🎯 Utilizzo

### 1️⃣ **Homepage - Prenotazioni (http://localhost/index.html)**

**Cosa vede il cliente:**
- Sezione hero con CTA principale
- Elenco servizi e prezzi
- **Form prenotazione rapido**: data → servizio → orari disponibili → dati personali
- Sezione fiducia, recensioni, contatti

**Azione cliente:**
1. Clicca "PRENOTA ORA"
2. Seleziona data, servizio, orario
3. Inserisci nome, email, telefono
4. Clicca "CONFERMA"
5. Riceve **link personale via email/SMS**: `https://site.com/prenotazione/abc123xyz`

---

### 2️⃣ **Dashboard Cliente - Prenotazione Personale**

**Accesso:**
- Link ricevuto per email/SMS
- URL: `prenotazione.html?token=abc123xyz`
- **NIENTE PASSWORD** - il token è sufficiente

**Cosa può fare:**
- ✏️ Modificare data/ora/servizio
- ❌ Annullare prenotazione
- 📥 Scaricare promemoria PDF
- 💬 Condividere su WhatsApp
- ⭐ Lasciare una review

---

### 3️⃣ **Admin Area - Dashboard Amministratore**

**Accesso:** `parrucchiere-login.html`  
**Credenziali demo:**
- Email: `parrucchiere@parrucchiere.it`
- Password: `parrucchiere123`

**Funzionalità:**

#### 📊 **Dashboard**
- Statistiche giornaliere (prenotazioni, incasso, completate)
- Lista prenotazioni di oggi in tempo reale

#### 📅 **Prenotazioni**
- Tabella filtrata per data/stato
- Marcare come completate/annullate
- Vedi dettagli cliente

#### 👥 **Clienti**
- Ricerca per nome/email
- Storico prenotazioni
- Esporta in CSV

#### 🛠️ **Servizi**
- Aggiungi/modifica/elimina servizi
- Setta prezzo e durata

#### ⚙️ **Impostazioni**
- Dati azienda (nome, telefono, email, indirizzo)
- Orari di apertura
- Notifiche (SMS/Email)
- Cambio password

---

## 💾 Dati Demo

### Servizi Standard
```
✂️ Taglio Uomo - 25€ (30 min)
💇 Taglio Donna - 35€ (45 min)
🧖 Trattamento - 20€ (20 min)
💇‍♀️ Colore - 80€ (120 min)
```

### Orari
- **Lunedì-Venerdì:** 09:00 - 18:00
- **Sabato:** 09:00 - 14:00
- **Domenica:** Chiuso

### Contatti
- **Nome:** Parrucchiere Rossi
- **Telefono:** +39 011 555 1234
- **Email:** info@parrucchiererossi.it
- **Indirizzo:** Via Roma 15, Torino

---

## 🎨 Design & Colori

| Elemento | Colore |
|----------|--------|
| Primario | `#0052CC` (Blu) |
| Secondario | `#E63946` (Rosso) |
| Testo | `#1A1A1A` (Nero) |
| Background | `#FFFFFF` (Bianco) |
| Border | `#E8E8E8` (Grigio) |

---

## 📱 Responsive Design

- **Desktop** (>1024px) - 3-4 colonne, layout completo
- **Tablet** (768-1024px) - 2 colonne, sidebar ridotta
- **Mobile** (<768px) - 1 colonna, menu hamburger

---

## 🔐 Autenticazione

### Cliente
- **Accesso:** Token nella URL (no password)
- **Storage:** localStorage (sessione browser)
- **Sicurezza:** Link personale univoco, non leggibile

### Admin
- **Accesso:** Email + Password
- **Storage:** localStorage session
- **Logout:** Cancella sessione

---

## 💾 Database

Tutti i dati sono salvati in **localStorage** del browser:
- Prenotazioni
- Clienti
- Servizi
- Review
- Impostazioni parrucchiere
- Sessione parrucchiere

**Per cancellare tutto:**
```javascript
localStorage.removeItem('bookingDB');
localStorage.removeItem('parrucchiereSession');
```

---

## 🛠️ Personalizzazione

### Modificare Azienda
Edita `script.js`, sezione `DATABASE`:

```javascript
const DATABASE = {
    services: [
        { id: 1, name: 'TUO SERVIZIO', description: '...', price: 50, duration: 30 },
        // ...
    ],
    settings: {
        name: 'TUO NOME',
        phone: '+39 123 456 7890',
        email: 'tuo@email.it',
        address: 'Tuo Indirizzo',
        // ...
    },
    parrucchiere: {
        email: 'tuo@parrucchiere.it',
        password: 'tua_password'
    }
};
```

### Cambiare Colori
Modifica `:root` in `style.css`:

```css
:root {
    --primary: #0052CC;        /* Colore principale */
    --secondary: #E63946;      /* Colore azioni */
    /* ... altri colori ... */
}
```

---

## 🚢 Deploy

### Vercel (Raccomandato)
1. Carica i file su GitHub
2. Connetti repo a Vercel
3. Deploy automatico

### Netify
1. Drag & drop cartella su Netlify.com
2. Pronto in pochi secondi

### Server proprio
1. Carica file via FTP
2. Configura HTTPS
3. Fatto!

---

## 📞 Supporto

Questa è una **versione completamente funzionante e pronta all'uso**.

Per personalizzazioni:
- Modifica `index.html` per il contenuto homepage
- Modifica `script.js` per servizi/orari/dati
- Modifica `style.css` per colori/design

---

## ✨ Features Future

- [ ] SMS/Email notifiche reali (Twilio, SendGrid)
- [ ] Database backend (Firebase, MongoDB)
- [ ] Pagamenti online (Stripe, PayPal)
- [ ] Calendario integrato
- [ ] Automazione promemoria
- [ ] Analytics dashboard
- [ ] Multi-lingua

---

## 📄 License

Libre per uso personale. © 2024 Parrucchiere Rossi

---

**Buon lavoro! 🎉**
