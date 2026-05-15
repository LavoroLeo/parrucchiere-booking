# 🏗️ PROJECT ARCHITECTURE - Parrucchiere Rossi

**Reference Document**  
**Data**: 9 Maggio 2026  
**Purpose**: Map the complete structure of HTML/CSS/JS for modifications and updates

---

## 📑 Table of Contents

1. [File Structure Overview](#file-structure-overview)
2. [index.html (Homepage)](#indexhtml-homepage)
3. [parrucchiere-login.html (Admin Panel)](#parrucchiere-loginhtml-parrucchiere-panel)
4. [cliente-prenotazioni.html (Customer Bookings)](#cliente-prenotazionihtml-customer-bookings)
5. [privacy.html (Privacy Policy)](#privacyhtml-privacy-policy)
6. [Data Flow & localStorage](#data-flow--localstorage)
7. [Color Scheme & Styling](#color-scheme--styling)
8. [JavaScript Functions Map](#javascript-functions-map)

---

## 📂 File Structure Overview

```
Artigiani/
├── index.html                      (36 KB, 414 lines)
│   ├── Header (sticky navigation)
│   ├── Hero section (premium intro)
│   ├── Trust section (4 cards)
│   ├── Experts section (parrucchieri profiles)
│   ├── Services section (4 clickable cards)
│   ├── Booking form section
│   ├── Reviews section
│   ├── Contact + Google Maps
│   ├── Modal (booking access)
│   ├── Footer
│   └── WhatsApp widget
│
├── parrucchiere-login.html         (32 KB, 899 lines)
│   ├── Sidebar (fixed navigation)
│   ├── Main content area
│   │   ├── Dashboard (stats cards)
│   │   ├── Calendar section
│   │   ├── Bookings section
│   │   ├── Customers section
│   │   ├── Issues/Reports section
│   │   ├── Services section
│   │   └── Settings section (6 sub-sections)
│   └── Logout
│
├── cliente-prenotazioni.html       (26 KB, 660 lines)
│   ├── Login form
│   ├── Bookings display (after login)
│   ├── Booking details (date/time/price/status)
│   ├── Available hours grid
│   ├── Interactions (notes/reviews/reports)
│   └── Logout
│
├── privacy.html                    (5.8 KB, 173 lines)
│   ├── Header
│   ├── Privacy content (GDPR compliant)
│   └── Close button
│
├── vercel.json                     (deployment config)
├── .gitignore                      (git ignore rules)
└── [Documentation & guides]
```

---

## 📄 index.html (Homepage)

### Structure Map

```
<!DOCTYPE html>
<html lang="it">
<head>
    <title>Parrucchiere Rossi</title>
    <style>
        [INLINE CSS - All styling in one <style> block]
    </style>
</head>
<body>
    ├─── HEADER STICKY (line 9)
    │    ├── Logo placeholder "PR"
    │    ├── Logo text "Parrucchiere Rossi"
    │    ├── Phone link (tel:+39011555124)
    │    ├── Navigation menu (5 links + Admin + Accesso)
    │    └── Mobile hamburger toggle
    │
    ├─── HERO SECTION (line 35)
    │    ├── Gradient background
    │    ├── SVG pattern overlay
    │    ├── Hero title "Parrucchiere Rossi"
    │    ├── Tagline "✨ ECCELLENZA NEL TAGLIO ✨"
    │    ├── Subtitle with social proof (847+ clienti)
    │    ├── CTA Button "📅 PRENOTA ORA"
    │    ├── Secondary button "☎️ CHIAMA SUBITO"
    │    └── Trust indicators (⭐ 4.8/5 stelle)
    │
    ├─── TRUST SECTION (line 59)
    │    ├── Title "Perché Scegliere Parrucchiere Rossi"
    │    └── 4 Trust cards:
    │        ├── ⚡ Rapido
    │        ├── 📅 Flessibile
    │        ├── ✅ Affidabile
    │        └── ⭐ Valutato
    │
    ├─── EXPERTS SECTION (line 88)
    │    ├── Title "I Nostri Esperti"
    │    └── Expert cards (Marco profile, etc.)
    │        ├── Profile image (emoji icon)
    │        ├── Name & title
    │        ├── Rating & client count
    │        └── Services list
    │
    ├─── SERVICES SECTION (line 118) ⭐ CLICKABLE
    │    ├── Title "I Nostri Servizi"
    │    └── 4 Service cards (onclick="selectService()")
    │        ├── Taglio Uomo - 25€ (30 min)
    │        ├── Taglio Donna - 35€ (45 min)
    │        ├── Trattamento - 15€ (20 min)
    │        └── Colore - 60€ (120 min)
    │
    ├─── BOOKING SECTION (line 164)
    │    ├── Title "Prenota Appuntamento"
    │    └── Form:
    │        ├── Date input (📅)
    │        ├── Service dropdown (scissor emoji)
    │        ├── Name input
    │        ├── Phone input
    │        └── "CONFERMA PRENOTAZIONE" button
    │
    ├─── REVIEWS SECTION (line 206)
    │    ├── Title "Cosa Dicono i Nostri Clienti"
    │    └── 3 Review cards (static)
    │        ├── ⭐⭐⭐⭐⭐ Rating
    │        ├── Client quote
    │        └── Client name
    │
    ├─── CONTACT SECTION (line 243)
    │    ├── Title "Contattaci"
    │    ├── Contact info (address, phone, email)
    │    ├── 3 Action buttons (Phone, Email, WhatsApp)
    │    └── Google Maps embed (iframe)
    │        └── Via Roma 15, 10122 Torino
    │
    ├─── MODAL (line 284)
    │    ├── Hidden by default
    │    ├── "Accedi alle tue prenotazioni"
    │    ├── Name input
    │    ├── Surname input
    │    └── "Accedi" button → redirects to cliente-prenotazioni.html
    │
    ├─── FOOTER (line 296)
    │    ├── Logo
    │    ├── Company info
    │    ├── Links section
    │    ├── Social links (Facebook, Instagram)
    │    │   └── Loaded from localStorage
    │    └── Copyright
    │
    └─── WHATSAPP WIDGET (line 339)
         └── Floating WhatsApp icon → wa.me link
```

### Key JavaScript Functions in index.html

```javascript
1. selectService(service)
   - Trigger: User clicks service card
   - Action: Pre-selects service in booking form
   - Scrolls to booking form
   - Updates form field value

2. showBookingAccess()
   - Trigger: "Accedi alle tue prenotazioni" clicked
   - Action: Shows modal overlay
   - User enters name/surname
   - On submit → redirects to cliente-prenotazioni.html

3. loadSocialLinks()
   - Trigger: Page load
   - Action: Reads from localStorage
   - Keys: parrucchiere_facebook, parrucchiere_instagram
   - Updates footer links dynamically

4. setupScrollBehavior()
   - Trigger: Page load
   - Action: Smooth scrolling for anchor links
   - Navigation items scroll to sections

5. mobileMenuToggle()
   - Trigger: Hamburger icon click
   - Action: Opens/closes mobile menu

6. navItemClick()
   - Trigger: Navigation item click
   - Action: Closes mobile menu after selection
```

### localStorage Keys Used in index.html

```javascript
parrucchiere_facebook    // URL from parrucchiere
parrucchiere_instagram   // URL from parrucchiere
[Read-only - values set by parrucchiere panel]
```

---

## 📄 parrucchiere-login.html (Admin Panel)

### Structure Map

```
<!DOCTYPE html>
<html lang="it">
<head>
    <title>Parrucchiere Rossi - Admin</title>
    <style>
        [INLINE CSS - Dark theme with #2c3e50 sidebar]
    </style>
</head>
<body>
    <div class="container-dashboard">
        │
        ├─── SIDEBAR (fixed, 250px width)
        │    ├── Logo "PR" (gradient background)
        │    ├── Title "Parrucchiere Rossi"
        │    └── Navigation menu (7 items)
        │        ├── 📊 Dashboard
        │        ├── 📅 Calendario
        │        ├── 📋 Prenotazioni
        │        ├── 👥 Clienti
        │        ├── ⚠️ Segnalazioni
        │        ├── 🎨 Servizi
        │        ├── ⚙️ Impostazioni
        │        └── 🚪 Logout
        │
        └─── MAIN CONTENT AREA
             ├── Header bar (date + logout)
             │
             └── Dashboard (default view) - Section 1
                  ├── Title "Dashboard Parrucchiere Rossi"
                  ├── Stats cards (4 cards):
                  │  ├── 📊 Prenotazioni Oggi
                  │  ├── ✅ Completate Oggi
                  │  ├── 💰 Incasso Oggi
                  │  └── ⏳ In Sospeso
                  ├── "Orari e Impegni di Oggi" section
                  │  └── 30-minute slots grid (9:00-18:00)
                  │     ├── Green slot = disponibile
                  │     └── Red slot = occupato (with customer name)
                  ├── "Prenotazioni di Oggi" section
                  └── "Immagini Parrucchiere" section
             │
             ├── Calendario (Sezione 2)
             │  └── Calendar view + booking management
             │
             ├── Prenotazioni (Sezione 3)
             │  └── List of all bookings with filtering
             │
             ├── Clienti (Sezione 4)
             │  └── Customer list + contact info
             │
             ├── Segnalazioni (Sezione 5)
             │  └── Issues/complaints from customers
             │
             ├── Servizi (Sezione 6)
             │  └── Manage services (name, price, duration)
             │
             └── Impostazioni (Sezione 7) ⭐ IMPORTANT
                  ├── Dati Salone (Company info)
                  │  ├── Nome salone (text input)
                  │  ├── Telefono (text input)
                  │  ├── Email (text input)
                  │  ├── Indirizzo (text input)
                  │  ├── Città (text input)
                  │  └── CAP (text input)
                  │  └── Save button → localStorage
                  │
                  ├── Orari Apertura
                  │  ├── Lunedì-Venerdì (time inputs)
                  │  ├── Sabato (time inputs)
                  │  ├── Domenica (time inputs)
                  │  └── Save button → localStorage
                  │
                  ├── Upload Logo
                  │  ├── File input (max 2MB)
                  │  ├── Preview image
                  │  └── Success message
                  │
                  ├── Upload Foto (max 6, 2MB each)
                  │  ├── File input (multiple)
                  │  ├── Preview images
                  │  └── Success message
                  │
                  ├── Social Links
                  │  ├── Facebook URL input
                  │  ├── Instagram URL input
                  │  └── Save button → localStorage
                  │
                  └── Visualizza Dati Salvati
                     └── Display all localStorage items
```

### Key JavaScript Functions in parrucchiere-login.html

```javascript
1. showSection(sectionId)
   - Trigger: Sidebar menu click
   - Action: Hides all sections, shows clicked section
   - Updates active menu item styling

2. salvaSettingsSalone()
   - Trigger: "Salva" button in Dati Salone
   - Action: Saves to localStorage
   - Keys stored:
     * salone_name
     * salone_phone
     * salone_email
     * salone_address
     * salone_city
     * salone_cap
     * salone_orari_luve (Lunedì-Venerdì)
     * salone_orari_sab (Sabato)
     * salone_orari_dom (Domenica)
   - Shows success message

3. uploadLogo()
   - Trigger: Logo file selected
   - Action: Validates (max 2MB)
   - Shows preview
   - Stores as File object (or base64)

4. uploadFoto()
   - Trigger: Photo file selected
   - Action: Validates (max 6 files, 2MB each)
   - Shows preview for each
   - Stores as File objects

5. savaSocialLinks()
   - Trigger: "Salva" button in Social Links
   - Action: Saves to localStorage
   - Keys:
     * parrucchiere_facebook
     * parrucchiere_instagram
   - Shows success message

6. generaOrariOggi()
   - Trigger: Dashboard load
   - Action: Creates 30-min time slots (9:00-18:00)
   - Shows occupied vs available
   - Pulls data from mock prenotazioni array

7. logout()
   - Trigger: "🚪 Logout" button
   - Action: Clears session
   - Redirects to index.html
```

### localStorage Keys Set by Admin Panel

```javascript
// Salon data
salone_name              // String: "Parrucchiere Rossi"
salone_phone             // String: "+39 011 555 1234"
salone_email             // String: "info@parrucchiererossi.it"
salone_address           // String: "Via Roma 15"
salone_city              // String: "Torino"
salone_cap               // String: "10122"

// Opening hours
salone_orari_luve        // String: "9:00 - 18:00"
salone_orari_sab         // String: "10:00 - 16:00"
salone_orari_dom         // String: "Chiuso"

// Social media
parrucchiere_facebook    // String: "https://facebook.com/..."
parrucchiere_instagram   // String: "https://instagram.com/..."

// Uploads (optional)
logo_image               // File or base64
foto_1, foto_2, etc.     // Files or base64
```

---

## 📄 cliente-prenotazioni.html (Customer Bookings)

### Structure Map

```
<!DOCTYPE html>
<html lang="it">
<head>
    <title>Parrucchiere Rossi - Prenotazioni</title>
    <style>
        [INLINE CSS - Dark theme matching homepage]
    </style>
</head>
<body>
    ├─── LOGIN SECTION
    │    ├── Title "Accedi alle Tue Prenotazioni"
    │    ├── Form:
    │    │  ├── Nome input
    │    │  ├── Cognome input
    │    │  └── "Accedi" button
    │    └── On submit → Shows bookings section
    │
    ├─── BOOKINGS DISPLAY (shown after login)
    │    ├── Header "Benvenuto, [Nome] [Cognome]!"
    │    │
    │    ├── BOOKING CARDS (repeating for each booking)
    │    │  ├── Booking ID reference
    │    │  ├── 📅 Data: [date]
    │    │  ├── 🕐 Ora: [time]
    │    │  ├── 💇 Parrucchiere: [name]
    │    │  ├── 🎨 Servizio: [service]
    │    │  ├── ⏱️ Durata: [duration] min
    │    │  ├── 💰 Prezzo: [price]€
    │    │  ├── 📊 Status: [Confermato/In Attesa/Completato]
    │    │  │
    │    │  ├─── INTERACTION SECTION 1: Nota al Servizio
    │    │  │    ├── Textarea for notes
    │    │  │    ├── "Salva Nota" button
    │    │  │    ├── Success message (+ reset)
    │    │  │    └── Saved to localStorage
    │    │  │
    │    │  ├─── INTERACTION SECTION 2: Lascia Recensione
    │    │  │    ├── ⭐ Rating selector (1-5 stars)
    │    │  │    ├── Textarea for review text
    │    │  │    ├── "Pubblica Recensione" button
    │    │  │    ├── Success message (+ reset)
    │    │  │    └── Saved to localStorage
    │    │  │
    │    │  └─── INTERACTION SECTION 3: Segnala Problema
    │    │       ├── Nome input
    │    │       ├── Cognome input
    │    │       ├── Email input
    │    │       ├── Telefono input
    │    │       ├── Tipo problema (dropdown)
    │    │       ├── Descrizione (textarea)
    │    │       ├── "Segnala Problema" button
    │    │       ├── Success message (+ reset)
    │    │       └── Saved to localStorage
    │    │
    │    └── AVAILABLE HOURS GRID
    │         ├── Title "Orari Disponibili"
    │         └── Scrollable grid:
    │            ├── 30-min slots
    │            ├── ✅ Disponibile (green)
    │            └── ❌ Occupato (red)
    │
    └─── FOOTER
         ├── Logout button "🚪 Esci"
         └── On click → Returns to login section
```

### Key JavaScript Functions in cliente-prenotazioni.html

```javascript
1. loginCliente()
   - Trigger: "Accedi" button
   - Action: Validates nome + cognome (not empty)
   - Loads mock prenotazioni for this customer
   - Shows booking cards + interactions
   - Saves customer name to session

2. salvaInterazione(id, tipo)
   - Trigger: Save button in any interaction
   - Action: Creates object with type-specific data
   - Types: 'nota', 'recensione', 'segnalazione'
   - Stores in localStorage with key:
     * interazione_{id}_{tipo}_{timestamp}
   - Shows success message
   - Resets form

3. caricaInterazioniSalvate(id)
   - Trigger: Booking card load
   - Action: Loads saved interactions from localStorage
   - Filters by booking ID
   - Displays previously saved data

4. generaOrariDisponibili()
   - Trigger: Bookings load
   - Action: Creates 30-min slots grid
   - Shows occupied vs available slots
   - Displays customer name on occupied slots

5. logout()
   - Trigger: "🚪 Esci" button
   - Action: Clears session data
   - Shows login form again

6. validazioneSegnalazione()
   - Trigger: Before "Segnala Problema" submit
   - Action: Checks all fields are filled
   - Returns true/false
```

### localStorage Keys Used in cliente-prenotazioni.html

```javascript
// Keys WRITTEN TO localStorage:
interazione_{booking_id}_nota_{timestamp}
interazione_{booking_id}_recensione_{timestamp}
interazione_{booking_id}_segnalazione_{timestamp}

// Each key stores JSON object:
// Nota:
{
  tipo: 'nota',
  prenotazioneId: id,
  contenuto: "text from textarea",
  data: "ISO timestamp"
}

// Recensione:
{
  tipo: 'recensione',
  prenotazioneId: id,
  rating: 1-5,
  testo: "review text",
  data: "ISO timestamp"
}

// Segnalazione:
{
  tipo: 'segnalazione',
  prenotazioneId: id,
  nome: "customer name",
  cognome: "customer surname",
  email: "email@example.com",
  telefono: "+39...",
  titolo: "tipo problema",
  descrizione: "problem description",
  data: "ISO timestamp"
}

// Keys READ FROM localStorage:
salone_name              // From parrucchiere
salone_phone
salone_email
salone_address
salone_city
salone_cap
```

---

## 📄 privacy.html (Privacy Policy)

### Structure Map

```
<!DOCTYPE html>
<html lang="it">
<head>
    <title>Parrucchiere Rossi - Privacy</title>
    <style>
        [INLINE CSS - Light theme in popup]
    </style>
</head>
<body>
    <div class="privacy-container">
        ├── .privacy-header
        │   ├── <h1>Privacy Policy</h1>
        │   └── <p>Parrucchiere Rossi - Tutela dei dati personali</p>
        │
        └── .privacy-content
            ├── 1. Titolare del Trattamento
            ├── 2. Dati Raccolti
            ├── 3. Base Giuridica del Trattamento
            ├── 4. Finalità del Trattamento
            ├── 5. Condivisione dei Dati
            ├── 6. Conservazione dei Dati
            ├── 7. Diritti degli Interessati
            ├── 8. Come Contattarci
            ├── 9. Modifiche alla Privacy Policy
            │
            └── <button>Chiudi</button> onclick="window.close()"
```

### How Privacy Page is Opened

From index.html footer:
```javascript
<a href="#" onclick="window.open('privacy.html', 'Privacy', 'width=900,height=700')">
  📧 Privacy
</a>
```

Opens in popup: 900x700 pixels

---

## 🔄 Data Flow & localStorage

### Data Flow Diagram

```
CUSTOMER JOURNEY:
─────────────────

index.html (Homepage)
    ↓
    ├─ Views services (static)
    ├─ Clicks service card → selectService()
    ├─ Fills booking form
    └─ Clicks "CONFERMA" → Shows modal or submits

Modal → "Accedi alle tue prenotazioni"
    ↓
cliente-prenotazioni.html (Bookings)
    ↓
    ├─ Login (nome/cognome)
    ├─ Views bookings (mock data)
    ├─ Saves notes/reviews/problems → localStorage
    └─ Clicks logout → Back to login

ADMIN JOURNEY:
──────────────

parrucchiere-login.html (Admin)
    ↓
    ├─ Enters parrucchiere panel
    ├─ Views dashboard
    ├─ Fills settings form
    ├─ Uploads logo/photos
    ├─ Saves to localStorage
    │   ├─ salone_name
    │   ├─ salone_phone
    │   ├─ salone_orari_*
    │   ├─ parrucchiere_facebook
    │   └─ parrucchiere_instagram
    ├─ Views bookings/calendar
    └─ Clicks logout → Back to index.html
```

### localStorage Key Map

**Written by Admin Panel:**
```
salone_name                  ← Salon name input
salone_phone                 ← Phone input
salone_email                 ← Email input
salone_address               ← Address input
salone_city                  ← City input
salone_cap                   ← Postal code input
salone_orari_luve            ← Monday-Friday hours
salone_orari_sab             ← Saturday hours
salone_orari_dom             ← Sunday hours
parrucchiere_facebook        ← Facebook URL
parrucchiere_instagram       ← Instagram URL
logo_image                   ← Logo file/base64
foto_1, foto_2, ...          ← Photo files/base64
```

**Read by Customer Pages:**
```
parrucchiere_facebook        ← Displayed in footer (index.html)
parrucchiere_instagram       ← Displayed in footer (index.html)
salone_*                     ← Displayed in contact section
```

**Written by Customer Page:**
```
interazione_{id}_nota_{ts}           ← Notes
interazione_{id}_recensione_{ts}     ← Reviews
interazione_{id}_segnalazione_{ts}   ← Problems
```

---

## 🎨 Color Scheme & Styling

### Primary Colors

```
Background (Dark):       #0f0f0f   (nero)
Secondary Background:    #1a1a1a
Tertiary Background:     #252525

Accent Primary:          #d4af37   (giallo - gold)
Accent Secondary:        #c0a080   (marrone - bronze)

Text Primary:            #f5f5f5   (bianco)
Text Secondary:          #cccccc   (light gray)
Text Tertiary:           #999999   (medium gray)

Admin Sidebar:           #2c3e50   (dark blue)
Admin Section:           #f5f5f5   (light background)

Success:                 #14c579   (green)
Error/Alert:             #e74c3c   (red)
```

### Used in Each File

**index.html (Dark Theme)**
- Background: #0f0f0f
- Accent buttons: #d4af37 (gold)
- Text: #f5f5f5 (white)
- Cards: #252525 (dark cards)

**parrucchiere-login.html (Dark + Light Mix)**
- Sidebar: #2c3e50 (dark blue)
- Main area: #f5f5f5 (light)
- Accent: #d4af37 (gold)

**cliente-prenotazioni.html (Dark Theme)**
- Background: #0f0f0f
- Cards: #1a1a1a
- Text: #f5f5f5
- Buttons: #d4af37

**privacy.html (Light Theme)**
- Background: #fff8f5 (light beige)
- Container: white
- Text: #201b18 (dark)
- Accent: #8B5A3C (brown)

---

## 🔧 JavaScript Functions Map

### Global Functions (all pages)

```javascript
loadSocialLinks()              // index.html - Load FB/IG from localStorage
showBookingAccess()            // index.html - Show login modal
selectService(service)         // index.html - Select service & scroll to form
showSection(id)                // parrucchiere-login.html - Switch parrucchiere sections
salvaSettingsSalone()          // parrucchiere-login.html - Save salon data
savaSocialLinks()              // parrucchiere-login.html - Save social URLs
uploadLogo()                   // parrucchiere-login.html - Upload logo
uploadFoto()                   // parrucchiere-login.html - Upload photos
generaOrariOggi()              // parrucchiere-login.html - Generate time slots
logout()                       // Both files - Clear session & logout
loginCliente()                 // cliente-prenotazioni.html - Customer login
salvaInterazione()             // cliente-prenotazioni.html - Save note/review/problem
caricaInterazioniSalvate()    // cliente-prenotazioni.html - Load saved interactions
generaOrariDisponibili()       // cliente-prenotazioni.html - Show availability grid
```

### Function Call Chart

```
Page Load:
  ├─ loadSocialLinks() 
  ├─ generaOrariOggi()
  └─ setupScrollBehavior()

User Click → Booking Form:
  ├─ selectService(service)
  └─ Form field updates

User Click → Modal:
  ├─ showBookingAccess()
  └─ Modal shows

User Click → Admin Menu:
  ├─ showSection(id)
  └─ Content switches

User Click → Save Button:
  ├─ salvaSettingsSalone()
  ├─ savaSocialLinks()
  ├─ uploadLogo()
  ├─ uploadFoto()
  └─ salvaInterazione()

User Click → Logout:
  ├─ logout()
  └─ Redirects to index.html
```

---

## 📝 Component Reusability

### Repeating Components

**Service Cards** (can be duplicated)
```html
<div style="...">
  <h3 style="color: #d4af37; font-size: 28px;">📌 Servizio</h3>
  <p>Descrizione</p>
  <p>Prezzo</p>
  <button onclick="selectService('service-name')">SELEZIONA</button>
</div>
```

**Trust Cards** (can be duplicated)
```html
<div class="trust-card">
  <div class="trust-icon">🎯</div>
  <h3>Titolo</h3>
  <p>Descrizione</p>
</div>
```

**Expert Cards** (can be duplicated)
```html
<div class="expert-card">
  <div class="expert-image">✂️</div>
  <h3>Nome</h3>
  <p>Titolo</p>
  <p>Rating & clients</p>
</div>
```

**Booking Card** (repeats per booking)
```html
<div class="booking-card">
  <div>📅 Data: [value]</div>
  <div>🕐 Ora: [value]</div>
  <div>[Interactions]</div>
</div>
```

---

## 🎯 Summary

This document maps:
- ✅ File structure (4 main HTML files)
- ✅ Section organization (header, hero, services, etc.)
- ✅ Component layout (cards, forms, buttons)
- ✅ JavaScript functions (27 total)
- ✅ localStorage keys (25 operations)
- ✅ Data flow (customer ↔ parrucchiere interactions)
- ✅ Color scheme (dark theme + accents)
- ✅ Reusable patterns (cards, forms, sections)

**Use this document as reference when:**
- Modifying existing sections
- Adding new features
- Styling updates
- Function refactoring
- Debugging data flow

---

**Created**: 9 Maggio 2026  
**Purpose**: Architecture Reference  
**Audience**: Developers modifying the system  
**Status**: ✅ Complete & Accurate
