# 📖 Guida Utente - Parrucchiere Rossi Website

## Come Aprire il Sito

### Per i Clienti (Schermata Pubblica)
1. **Apri il file**: `index.html`
2. Il sito si aprirà nel tuo browser predefinito
3. Vedrai la homepage completa con tutti i servizi

### Per l'Admin (Pannello Gestione)
1. **Apri il file**: `parrucchiere-login.html`
2. Inserisci le credenziali:
   - 📧 **Email**: `parrucchiere@parrucchiere.it`
   - 🔐 **Password**: `parrucchiere123`
3. Clicca "🔑 ACCEDI"
4. Vedrai il pannello parrucchiere con opzioni di upload

---

## Funzionalità Clienti

### 1️⃣ **Navigazione Principale**
Nel header puoi accedere a:
- **Prenota** → Scorri alla sezione prenotazioni
- **Servizi** → Vedi i servizi disponibili
- **Recensioni** → Leggi i feedback dei clienti
- **Contatti** → Vedi indirizzo, telefono, mappa
- **Accedi alle tue prenotazioni** → Modal con nome/cognome
- **🔐 Admin** → Accesso al pannello parrucchiere

### 2️⃣ **Sezione Hero**
All'inizio della pagina puoi:
- Cliccare **"📅 PRENOTA ORA"** → Scorri al form di prenotazione
- Cliccare **"☎️ CHIAMA SUBITO"** → Apre la chiamata telefonica (+39 011 555 1234)

### 3️⃣ **Servizi**
Visualizza tutti i servizi con:
- 💰 Prezzo esatto
- ⏱️ Durata dell'appuntamento
- 📝 Descrizione breve

**Servizi Disponibili**:
```
✂️ Taglio Uomo         25€  (30 minuti)   🔥 POPOLARE
💇 Taglio Donna       35€  (45 minuti)
🧖 Trattamento        20€  (20 minuti)
💇‍♀️ Colore             80€  (120 minuti)
```

### 4️⃣ **Prenotazione Appuntamento**
Nel form inserisci:
- 📅 **Data**: Quando desideri venire
- 🔧 **Servizio**: Quale servizio vuoi
- 👤 **Nome**: Il tuo nome
- 📞 **Telefono**: Il tuo numero

Poi clicca **"✅ CONFERMA PRENOTAZIONE"**

### 5️⃣ **Ricerca Prenotazioni**
Clicca su "**Accedi alle tue prenotazioni**" nel menu e inserisci:
- Nome
- Cognome

Sistema ti mostrerà le tue prenotazioni.

### 6️⃣ **Contatti**
Vedi:
- ☎️ **Telefono**: +39 011 555 1234
- 📧 **Email**: info@parrucchiererossi.it
- 📍 **Indirizzo**: Via Roma 15, Torino
- 🗺️ **Google Maps**: Vedi la posizione esatta

### 7️⃣ **WhatsApp**
In basso a destra della pagina c'è il pulsante **💬 WhatsApp**:
- Clicca per contattare direttamente via WhatsApp
- Messaggio precompilato per prenotazione

### 8️⃣ **Social Media**
Nel footer puoi:
- 📘 Accedere a **Facebook**
- 📷 Accedere a **Instagram**
- 📧 Leggere la **Privacy Policy**

---

## Funzionalità Admin

### 🔑 **Login Admin**
**File**: `parrucchiere-login.html`

**Credenziali di Default**:
```
Email:    parrucchiere@parrucchiere.it
Password: parrucchiere123
```

> **Nota**: Puoi modificare queste credenziali nel codice HTML se necessario.

### 📸 **Upload Logo**
1. Nella sezione "Gestione Profilo"
2. Clicca "Scegli Logo"
3. Seleziona un'immagine (JPG o PNG)
4. Max: 2 MB
5. Vedrai un messaggio di successo
6. Il logo verrà memorizzato nel profilo

### 🖼️ **Upload Foto Salone**
1. Nella sezione "Gestione Profilo"
2. Clicca "Scegli Foto"
3. Seleziona fino a 6 foto
4. Max: 2 MB per foto
5. Vedrai un messaggio di successo
6. Le foto appariranno nella galleria del profilo

### 📱 **Gestione Social Media**

#### Facebook
1. Inserisci il link al tuo profilo Facebook
2. Es: `https://facebook.com/parrucchiererossi`
3. Clicca "💾 Salva Facebook"
4. Il link verrà memorizzato

#### Instagram
1. Inserisci il link al tuo profilo Instagram
2. Es: `https://instagram.com/parrucchiererossi`
3. Clicca "💾 Salva Instagram"
4. Il link verrà memorizzato

**Nota**: Questi link appariranno nel footer della pagina principale!

### 🚪 **Logout**
Clicca il bottone **"🚪 ESCI"** per fare logout e tornare al login form.

---

## Archiviazione Dati

Tutti i dati dell'parrucchiere vengono salvati in **localStorage** del browser:
- Nome: `parrucchiere_facebook`
- Nome: `parrucchiere_instagram`

**Questo significa**:
- ✅ I dati rimangono anche dopo aver chiuso il browser
- ✅ Non serve un database
- ✅ Molto veloce e sicuro
- ⚠️ I dati sono locali al browser (se cancelli la cache, i dati si perdono)

---

## Privacy Policy

### Come Leggerla
Nel footer della pagina principale, clicca su **"📧 Privacy"**

Una finestra pop-up si aprirà con la policy completa.

### Cosa Include
- Dati che raccogliamo
- Come li usiamo
- Diritti GDPR
- Come contattarci

---

## Orari di Apertura

```
Lunedì-Venerdì:  09:00 - 18:00
Sabato:          09:00 - 14:00
Domenica:        Chiuso
```

---

## Recapiti

- 📞 **Telefono**: +39 011 555 1234
- 📧 **Email**: info@parrucchiererossi.it
- 🏢 **Indirizzo**: Via Roma 15, 10122 Torino (TO)
- 🗺️ **Zona**: Porta Nuova

---

## Colori del Sito

| Elemento | Colore | Hex |
|----------|--------|-----|
| Background | Nero | #0f0f0f |
| Accent Primary | Giallo | #d4af37 |
| Accent Secondary | Marrone | #c0a080 |
| Testo Principale | Bianco | #f5f5f5 |

---

## Problemi Comuni

### "Non riesco ad aprire index.html"
- Assicurati che il file esista nella cartella
- Prova con tasto destro → "Apri con" → Scegli il browser

### "Non funzionano i link social"
- Vanno salvati dal pannello parrucchiere (`parrucchiere-login.html`)
- Di default puntano a facebook.com e instagram.com

### "Non si vede la mappa"
- La mappa è un iframe di Google Maps
- Deve esserci connessione internet
- Se la mappa non si carica, controlla la connessione

### "Voglio resettare i dati parrucchiere"
- Apri le Developer Tools (F12)
- Console
- Scrivi: `localStorage.clear()`
- Premi Enter
- Ricarica la pagina

---

## Customizzazione

Se vuoi personalizzare il sito, puoi modificare:

### Colori
Cerca nei file HTML:
- `#0f0f0f` → Cambia il nero di background
- `#d4af37` → Cambia il giallo dorato
- `#c0a080` → Cambia il marrone

### Testo
Cerca il testo che vuoi cambiare e modifica direttamente nel file HTML

### Telefono/Email
Cerca i valori nel file HTML e sostituisci con i tuoi

### Indirizzo
Modifica "Via Roma 15, Torino" con il tuo indirizzo

### Logo
Cambia le lettere "PR" nel header con quello che vuoi

---

## Deploy Online

Per mettere il sito online, puoi:

1. **Vercel** (Consigliato)
   - Vai su vercel.com
   - Drag & drop i file HTML
   - Ready!

2. **Netlify**
   - Vai su netlify.com
   - Drag & drop i file HTML
   - Ready!

3. **GitHub Pages**
   - Push i file su GitHub
   - Abilita GitHub Pages
   - Done!

4. **Hosting Tradizionale**
   - Connettiti via FTP
   - Upload i file HTML
   - Done!

---

## Supporto

Se hai problemi:
1. Ricarica la pagina (Ctrl+F5 per pulire la cache)
2. Prova con un browser diverso
3. Controlla che tutti i file siano nella stessa cartella
4. Leggi le istruzioni nei file HTML

---

**Ultimo Aggiornamento**: 9 Maggio 2026
**Versione**: 1.0

Buon lavoro! 🎉
