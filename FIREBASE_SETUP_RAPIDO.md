# Firebase Setup Rapido - 5 Minuti

## Passo 1: Crea Progetto Firebase

1. Vai su https://console.firebase.google.com
2. Clicca **"Aggiungi progetto"** (oppure "Create project")
3. Nome progetto: `parrucchiere-booking` (o quello che preferisci)
4. Clicca **"Continue"**
5. **Google Analytics**: Clicca **"Continue"** (opzionale)
6. Seleziona **"Default Account for Firebase"**
7. Clicca **"Create project"**
8. Aspetta 2-3 minuti (verde quando finito)

✅ Progetto creato!

---

## Passo 2: Aggiungi App Web

1. Nel progetto Firebase, clicca icona **"</>" (Web)**
2. Nome app: `parrucchiere-booking-web`
3. Clicca **"Register app"**

**Copia questo blocco:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "parrucchiere-booking.firebaseapp.com",
  databaseURL: "https://parrucchiere-booking.firebaseio.com",
  projectId: "parrucchiere-booking",
  storageBucket: "parrucchiere-booking.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

4. Clicca **"Continue to console"**

---

## Passo 3: Abilita Realtime Database

1. Nel menu sinistro, clicca **"Realtime Database"** (oppure "Database")
2. Clicca **"Create Database"**
3. Seleziona regione: **"europe-west1"** (Europa Occidentale - vicino Italia)
4. **Modalità sicurezza**: Seleziona **"Start in test mode"**
5. Clicca **"Enable"**

⏳ Aspetta 30 secondi mentre crea il database...

✅ Database creato!

---

## Passo 4: Aggiorna Credenziali nel Tuo Codice

1. Apri file: `firebase-config.js`
2. Sostituisci i valori `YOUR_API_KEY`, etc. con i tuoi dati copiati dal Passo 2
3. Salva il file

**Esempio finale:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxx",  // ← Sostituisci
    authDomain: "parrucchiere-booking.firebaseapp.com",
    databaseURL: "https://parrucchiere-booking.firebaseio.com",
    projectId: "parrucchiere-booking",
    storageBucket: "parrucchiere-booking.appspot.com",
    messagingSenderId: "987654321",
    appId: "1:987654321:web:xyz789abc"
};
```

---

## Passo 5: Test Sistema

1. Vai su http://localhost:5000/index.html
2. Fai una prenotazione di test:
   - Data: domani
   - Servizio: Taglio Uomo
   - Nome: Test Mario
   - Cognome: Rossi
   - Telefono: 320 555 1234
3. Clicca **"CONFERMA PRENOTAZIONE"**

### Verifica che Firebase funziona:

1. Apri console Firebase (https://console.firebase.google.com)
2. Nel tuo progetto → **"Realtime Database"**
3. Dovresti vedere questa struttura:
```
businesses/
└── demo-parrucchiere-rossi/
    ├── bookings/
    │   └── booking_1234567890_abc123/
    │       ├── clientName: "Mario"
    │       ├── clientPhone: "320 555 1234"
    │       ├── date: "2026-05-06"
    │       ├── price: 25
    │       ├── service: "Taglio Uomo"
    │       ├── status: "confirmed"
    │       └── ...
    ├── clients/
    ├── services/
    └── settings/
```

✅ Se vedi i dati = Firebase funziona!

---

## Passo 6: Test Persistenza Dati

**Test 1: Cancella localStorage e ricarica**
1. Apri browser console (F12)
2. Scrivi: `localStorage.clear()`
3. Premi Enter
4. Aggiorna pagina (F5)
5. Apri parrucchiere: http://localhost:5000/parrucchiere-login.html
6. Login: `parrucchiere@parrucchiere.it` / `parrucchiere123`
7. Vai su **"Prenotazioni"**

✅ La prenotazione DEVE ancora esserci (caricata da Firebase)

**Test 2: Chiudi e riapri browser**
1. Chiudi browser completamente
2. Riaprendi browser
3. Vai su http://localhost:5000/parrucchiere.html
4. Dati ancora lì? ✅ Firebase funziona!

---

## Troubleshooting

### "Firebase not configured"
- Controlla che `firebase-config.js` abbia veri valori (non "YOUR_API_KEY")
- Apri console browser (F12) e cerca errori rossi

### "Permission denied" in Firebase
- Vai su Realtime Database → **Rules**
- Sostituisci con questo (test mode):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
- Clicca "Publish"

### Dati non apparivano nella console Firebase
- Aspetta 5 secondi e aggiorna la pagina Firebase
- Oppure clicca il bottone "Refresh" (freccia circolare)

---

## Sicurezza - IMPORTANTE PER PRODUCTION

**Adesso (Test Mode)**: Chiunque può leggere/scrivere ✅ (va bene per testing)

**Prima di launch in production**: Aggiorna regole di sicurezza in Firebase:

```json
{
  "rules": {
    "businesses": {
      "$businessId": {
        ".read": true,
        ".write": "root.child('businesses').child($businessId).child('parrucchierePassword').exists()"
      }
    }
  }
}
```

---

## ✅ Finito!

Adesso il sistema:
- ✅ Salva dati in localStorage (immediato)
- ✅ Salva dati in Firebase (cloud, persistente)
- ✅ Fallback automatico a localStorage se offline
- ✅ Pronto per production

**Prossimi passi:**
1. Contatta parrucchieri con Firebase configurato ✅
2. Deploy su Vercel quando pronto
3. Crea primo cliente con dominio personalizzato
