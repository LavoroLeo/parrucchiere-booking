# Parrucchiere Booking System - Setup & Deployment Guide

## Overview

This is a professional booking system for hair salons and barbers in Northern Italy. It supports:
- ✅ Client self-service booking with no registration required
- ✅ Admin dashboard for managing appointments
- ✅ Real reviews and issue reporting system
- ✅ Multi-client deployment (each salon gets their own subdomain)
- ✅ Persistent cloud storage with Firebase
- ✅ Fallback to localStorage for demo/testing

---

## Phase 1: Demo & Testing (localhost)

The system works out of the box with **localStorage** (browser storage):

1. **Home page**: `http://localhost:5000/index.html`
   - Clients book appointments without creating an account
   - Token-based access to booking details

2. **Admin panel**: `http://localhost:5000/parrucchiere.html`
   - Login: `parrucchiere@parrucchiere.it` / `parrucchiere123`
   - View bookings, clients, reviews, issues
   - Manage services and business hours

### Credentials (Demo)
- **Admin Email**: parrucchiere@parrucchiere.it
- **Admin Password**: parrucchiere123

### Test the System
1. Go to home page → Book an appointment
2. Select date, service, and time slot
3. Enter client details
4. Receive a confirmation page with token
5. Admin can access `http://localhost:5000/parrucchiere-login.html` to manage

---

## Phase 2: Firebase Setup (Required for Production)

Since localStorage data disappears when users clear their browser cache, **Firebase is mandatory** for commercial deployment.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name: `parrucchiere-booking` (or your choice)
4. Continue with defaults, create project
5. Wait for project to initialize (2-3 minutes)

### Step 2: Get Your Credentials

1. In Firebase Console, click **⚙️ Settings** (top-left)
2. Go to **Project Settings**
3. Scroll to **"Your apps"** section
4. Click **"Web"** icon (</> symbol)
5. Register app: name it `parrucchiere-booking-web`
6. Copy the firebaseConfig object

### Step 3: Enable Realtime Database

1. In left menu, click **"Realtime Database"**
2. Click **"Create Database"**
3. Choose your region (closest to Italy: `europe-west1`)
4. Start in **"Test mode"** (for now)
5. Wait for database to initialize

⚠️ **Security Rules** - In test mode, anyone can read/write. Before production, update rules:
```json
{
  "rules": {
    "businesses": {
      "$businessId": {
        ".read": "root.child('businesses').child($businessId).child('parrucchiere').exists()",
        ".write": "root.child('businesses').child($businessId).child('parrucchiere').exists()"
      }
    }
  }
}
```

### Step 4: Update firebase-config.js

1. Open `firebase-config.js` in your text editor
2. Replace `YOUR_API_KEY`, `YOUR_PROJECT`, etc. with your actual Firebase credentials
3. Save the file

Example:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDxxx...",
    authDomain: "parrucchiere-booking.firebaseapp.com",
    databaseURL: "https://parrucchiere-booking.firebaseio.com",
    projectId: "parrucchiere-booking",
    storageBucket: "parrucchiere-booking.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

### Testing Firebase Integration

1. Run the dev server
2. Go to home page and create a booking
3. Check Firebase Console → Realtime Database
4. You should see data structure: `businesses/demo-parrucchiere-rossi/bookings/...`

---

## Phase 3: Client Customization (Per Salon)

Each salon gets a unique **businessId** and customized settings.

### For Demo Testing
- Uses `demo-parrucchiere-rossi` as businessId (stored in localStorage)

### For Production (Each Salon)

1. **Create unique setup for each salon**:
   ```javascript
   localStorage.setItem('businessId', 'aldo-coppola-milano');
   ```

2. **Admin customizes in settings**:
   - Business name (e.g., "Aldo Coppola")
   - Phone number
   - Email
   - Address
   - Opening hours
   - Services and prices
   - Admin password

3. **Data isolation**: Each businessId has separate storage:
   - `businesses/aldo-coppola-milano/bookings`
   - `businesses/aldo-coppola-milano/settings`
   - `businesses/aldo-coppola-milano/clients`
   - etc.

---

## Phase 4: Deployment on Vercel

### Option A: Single Domain (Simple)
Deploy to Vercel with a single domain, all salons use URL parameters:
- Main site: `www.parrucchieribook.it`
- Aldo Coppola: `www.parrucchieribook.it?salon=aldo-coppola`

### Option B: Subdomains (Professional)
Each salon gets their own subdomain:
- Aldo Coppola: `aldocoppola.parrucchieribook.it`
- Pisterzi: `pisterzi.parrucchieribook.it`
- Aldo Coppola → Automatically loads `businessId: aldo-coppola-milano`

### Deploying to Vercel

1. **Create Vercel account**: https://vercel.com

2. **Import project**:
   - Connect GitHub (push code to GitHub first)
   - Or upload folder directly

3. **Environment variables**:
   - No special env vars needed (firebase-config.js is static)

4. **Deploy**:
   - Click "Deploy"
   - Vercel auto-assigns a URL: `parrucchiere-booking.vercel.app`

5. **Add custom domain**:
   - Domain settings → Add domain
   - Point your domain DNS to Vercel
   - Add SSL certificate (automatic)

6. **Subdomains** (if using Option B):
   - Add CNAME records in DNS:
     - `aldocoppola.parrucchieribook.it` → `parrucchiere-booking.vercel.app`
     - `pisterzi.parrucchieribook.it` → `parrucchiere-booking.vercel.app`

---

## Phase 5: Client Onboarding Process

### Email Template (Italian)

```
Caro [Nome Salone],

Ho sviluppato un sistema di prenotazioni online completo per parrucchieri e barbieri.

**Cosa offre:**
✅ I tuoi clienti prenotano online senza account
✅ Tu gestisci prenotazioni, orari, servizi da una dashboard
✅ Ricevi recensioni e feedback dai clienti
✅ Completamente personalizzabile (nome, logo, telefono, orari)
✅ Funziona su desktop e mobile

**Come funziona:**
1. I clienti vanno su [tuodominio.it]
2. Scelgono servizio, data, orario
3. Inseriscono nome e telefono
4. Ricevono link per gestire la prenotazione
5. Tu vedi tutto nella dashboard parrucchiere

**Per te:**
- Niente commissioni
- Niente abbonamenti nascosti
- Completa personalizzazione
- Supporto tecnico continuo

Ti piacerebbe fare una videocall per vederlo dal vivo? Domani alle 15:00 ti va bene?

[Link per calendario meeting]

Cordiali saluti,
[Il tuo nome]
```

### Setup for Each Client

1. **Initial Meeting**: 20-min video call to show system
2. **Customization**: You set up their businessId and defaults
3. **Admin Setup**: They choose parrucchiere email/password
4. **Training**: Show them the dashboard features
5. **Launch**: Deploy their subdomain

---

## Current System Structure

```
index.html              → Home page + booking form
parrucchiere.html             → Admin dashboard
parrucchiere-login.html       → Admin login page
prenotazione.html      → Client booking details page

script.js              → All application logic
style.css              → Styling and responsive design
firebase-config.js     → Firebase credentials (add yours here)
firebase-database.js   → Database abstraction layer
```

### Data Flow

1. **Demo Mode** (no Firebase):
   - All data → localStorage
   - Works offline
   - Lost when cache cleared ❌

2. **Production Mode** (with Firebase):
   - Data → localStorage (instant UI updates)
   - Data → Firebase (async backup)
   - Data persists across sessions ✅
   - Synced across devices ✅

---

## Troubleshooting

### "Firebase SDK not loaded"
- Check firebase-config.js has correct credentials
- Make sure HTML includes Firebase SDK scripts

### Bookings disappear after clearing cache
- This is demo mode behavior (localStorage)
- Configure Firebase to fix this

### Admin login not working
- Check DATABASE is loaded (open console)
- Default: `parrucchiere@parrucchiere.it` / `parrucchiere123`
- Change in parrucchiere settings

### Time slots blocking not working
- Service duration is used to block multiple slots
- Example: 45-min service at 09:00 blocks 09:00 AND 09:30
- Check service duration in parrucchiere settings

---

## Next Steps

1. ✅ Test system locally with demo data
2. ⬜ Create Firebase project and configure
3. ⬜ Personalize for first client (e.g., Aldo Coppola)
4. ⬜ Deploy to Vercel
5. ⬜ Contact 5 famous salons in Northern Italy
6. ⬜ Set up video calls to demo system
7. ⬜ Deploy individual subdomains for each client
8. ⬜ Provide parrucchiere support and updates

---

## Contact & Support

For issues or questions:
1. Check console (F12) for error messages
2. Verify Firebase credentials
3. Test in another browser (clear cache first)
4. Email support if still stuck

Good luck! 🚀
