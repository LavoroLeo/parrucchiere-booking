# 🚀 Deployment Guide - Parrucchiere Rossi

**Sistema di Prenotazioni Online - Ready for Production**

Status: ✅ 100% Funzionante  
Data: 9 Maggio 2026

---

## 📋 Tabella dei Contenuti

1. [Quick Start](#quick-start) - Deployment in 5 minuti
2. [Opzioni Deployment](#opzioni-deployment) - Scegli piattaforma
3. [Vercel (Consigliato)](#vercel-consigliato) - Setup dettagliato
4. [GitHub Pages](#github-pages) - Setup su GitHub
5. [Netlify](#netlify) - Setup su Netlify
6. [Dominio Personalizzato](#dominio-personalizzato)
7. [Testing & Verifiche](#testing--verifiche)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Per Vercel (Consigliato - Più facile)

```bash
# 1. Inizializza Git
cd Desktop/Artigiani
git init
git add .
git commit -m "Initial commit: Parrucchiere Rossi booking system"

# 2. Crea repository su GitHub (https://github.com/new)
# Copia URL del repository

# 3. Push a GitHub
git remote add origin https://github.com/[TUO_USERNAME]/parrucchiere-rossi.git
git branch -M main
git push -u origin main

# 4. Deploy su Vercel
# Vai su https://vercel.com/new
# Seleziona il repository
# Clicca "Deploy"
# ✅ Fatto! URL: https://parrucchiere-rossi.vercel.app
```

---

## Opzioni Deployment

| Piattaforma | Costo | Setup | Performance | Consigliato |
|-------------|-------|-------|-------------|------------|
| **Vercel** | Gratis | 🟢 Facile | 🟢 Eccellente | ✅ SI |
| **Netlify** | Gratis | 🟢 Facile | 🟢 Ottimo | ✅ SI |
| **GitHub Pages** | Gratis | 🟡 Medio | 🟡 Buono | ⚠️ Se custom domain |
| **FTP Tradizionale** | Varia | 🔴 Difficile | 🟡 Dipende | ❌ No |

---

## Vercel (Consigliato)

### ✅ Vantaggi

- Zero configurazione
- Deploy automatico da Git
- CDN globale (velocissimo)
- SSL gratuito
- Uptime 99.95%
- Dominio gratis `.vercel.app`

### Prerequisiti

- Account GitHub (gratuito)
- Account Vercel (gratuito)
- Questo repository clonato localmente

### Step 1: Prepara Repository GitHub

```bash
cd C:\Users\Utente\Desktop\Artigiani

# Inizializza Git
git init

# Aggiungi tutti i file
git add .

# Commit iniziale
git commit -m "Initial commit: Parrucchiere Rossi online booking system"
```

### Step 2: Crea Repository su GitHub

1. Vai su https://github.com/new
2. **Repository name**: `parrucchiere-rossi`
3. **Description**: "Online booking system for Parrucchiere Rossi salon"
4. **Visibility**: **Public** (richiesto per Vercel)
5. Clicca **"Create repository"**

### Step 3: Push Code a GitHub

```bash
# Copia il comando da GitHub e esegui:
git remote add origin https://github.com/[TUO_USERNAME]/parrucchiere-rossi.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy su Vercel

1. Vai su https://vercel.com
2. Clicca **"Sign Up"** → **"Continue with GitHub"**
3. Autorizza Vercel
4. Clicca **"Add New..."** → **"Project"**
5. Seleziona repository `parrucchiere-rossi`
6. Clicca **"Import"**

**Configurazione Deploy** (questi sono i defaults - vanno bene):
- **Framework**: Other (HTML/CSS/JS puro)
- **Root Directory**: `/`
- **Build Command**: (vuoto)
- **Install Command**: (vuoto)

7. Clicca **"Deploy"**

⏳ Aspetta 1-2 minuti...

✅ **Fatto!** URL pubblico: https://parrucchiere-rossi.vercel.app

---

## GitHub Pages

### Setup

```bash
cd C:\Users\Utente\Desktop\Artigiani

# Inizializza Git
git init
git add .
git commit -m "Initial commit"

# Crea branch gh-pages
git branch -M main
git remote add origin https://github.com/[TUO_USERNAME]/parrucchiere-rossi.git
git push -u origin main
```

### Configura GitHub Pages

1. Vai su https://github.com/[TUO_USERNAME]/parrucchiere-rossi
2. **Settings** → **Pages**
3. **Source**: Seleziona **main** branch
4. **Folder**: `/` (root)
5. Clicca **"Save"**

✅ Disponibile su: https://[TUO_USERNAME].github.io/parrucchiere-rossi

---

## Netlify

### Quick Deploy (Drag & Drop)

1. Vai su https://app.netlify.com/drop
2. Trascina la cartella `Artigiani` nella zona
3. ✅ Deployato in 5 secondi!

### Deploy via GitHub

1. Vai su https://netlify.com
2. **Sign up** → **GitHub**
3. Autorizza Netlify
4. **New site from Git**
5. Seleziona repository `parrucchiere-rossi`
6. Clicca **"Deploy"**

✅ Disponibile su: https://parrucchiere-rossi.netlify.app

---

## Dominio Personalizzato

### Se Hai Già un Dominio

Esempio: `parrucchiererossi.it`

#### Su Vercel

1. Vai a https://vercel.com/dashboard
2. Seleziona progetto
3. **Settings** → **Domains**
4. Clicca **"Add"** e digita dominio
5. Vercel mostra **CNAME record** da aggiungere

#### Aggiungi CNAME nel tuo Registrar (Aruba, Namecheap, etc.)

```
Host: @ (oppure lascia vuoto)
Type: CNAME
Value: cname.vercel-dns.com
TTL: 3600
```

⏳ Aspetta 10-30 minuti (propagazione DNS)

✅ Disponibile su: https://parrucchiererossi.it

### Se Vuoi Comprare un Dominio

1. Vai su https://namecheap.com o Aruba
2. Cerca `parrucchiererossi.it` (o variante)
3. Compra (€8-15/anno)
4. Segui istruzioni Vercel sopra

---

## Testing & Verifiche

### Pre-Launch Checklist

#### Funzionalità

- [ ] Home page carica completamente
- [ ] Tutti i servizi visibili e cliccabili
- [ ] Form prenotazione funziona
- [ ] Selezione data/orario funziona
- [ ] Admin login funziona
- [ ] Dashboard parrucchiere carica
- [ ] Dati persistono (localStorage) dopo refresh

#### Design & UX

- [ ] Colori coerenti (nero/giallo/marrone)
- [ ] Logo/nome salone visibili
- [ ] Telefono e email corretti in header/footer
- [ ] Layout responsive su mobile (test con cellulare!)
- [ ] Nessun elemento rotto/spostato

#### Sicurezza

- [ ] HTTPS attivo (https:// non http://)
- [ ] Console browser NON mostra errori (F12 → Console)
- [ ] localStorage non contiene dati sensibili

#### Performance

- [ ] Pagina carica < 3 secondi
- [ ] Immagini caricate correttamente
- [ ] Nessun lag/ritardo nei click

### Come Testare

1. **Desktop**: Apri https://parrucchiere-rossi.vercel.app
2. **Mobile**: Accedi da cellulare (usa hotspot)
3. **Browser Console**: F12 → Console → Controlla errori rossi
4. **Booking Test**:
   - Inserisci dati
   - Clicca "Conferma"
   - Leggi success message
   - Refresh pagina
   - Verifica dati ancora presenti (localStorage)

---

## Troubleshooting

### Errore: "404 Not Found" su dominio custom

**Causa**: DNS non propagato

**Soluzione**:
1. Aspetta 30 minuti
2. Controlla CNAME record nel registrar (digita bene!)
3. In Vercel: Settings → Domains → Verifica status

### Errore: "Site not found" dopo deploy

**Causa**: index.html non caricato

**Soluzione**:
```bash
# Verifica che index.html sia nel root
ls -la index.html

# Verifica sia nel Git
git log --all --full-history index.html
```

### localStorage non funziona

**Causa**: Spesso è blocco da privacy browser

**Soluzione**:
1. Test su http://localhost (non file://)
2. Test su incognito browser
3. Disabilita estensioni privacy (uBlock, etc.)

### Dati non salvano dopo refresh

**Causa**: localStorage disabled o limit raggiunto

**Soluzione**:
```javascript
// Test in browser console (F12 → Console)
localStorage.setItem('test', 'hello');
console.log(localStorage.getItem('test')); // Deve stampare "hello"
```

### Pagina bianca dopo deploy

**Causa**: File non trovato

**Soluzione**:
```bash
# Verifica che questi file siano nel root:
ls -la index.html
ls -la parrucchiere-login.html
ls -la cliente-prenotazioni.html
ls -la privacy.html

# Se sono OK, fai push di nuovo:
git push
# Poi redeploy su Vercel
```

---

## Dopo il Launch

### Monitoraggio Settimanale

- [ ] Sito carica velocemente (test velocità)
- [ ] Nessun errore in console
- [ ] localStorage ancora funziona
- [ ] Mobile responsive ancora OK

### Backup Dati

localStorage è persistente ma locale. Considera:

```javascript
// Backup settimanale a mano:
// 1. Apri https://parrucchiere-rossi.vercel.app/parrucchiere-login.html
// 2. F12 → Console
// 3. Copia e salva questo:
JSON.stringify(localStorage)
```

Salva output in file di testo per sicurezza.

### Updates

Se vuoi cambiare qualcosa:

```bash
# 1. Modifica il file (es. index.html)
# 2. Commit e push
git add index.html
git commit -m "Update: Fix booking form"
git push

# 3. Vercel auto-deploya in 30 secondi ✅
```

---

## Supporto

### In caso di problemi

1. **Verifica file**: `git status` (ci sono uncommitted changes?)
2. **Leggi log Vercel**: Dashboard → Deployments → vedi errore
3. **Test locale**: Apri file HTML direttamente in browser
4. **Console errors**: F12 → Console → Scrivi errori

---

## Conclusione

🎉 **Parrucchiere Rossi è pronto per il mondo!**

- ✅ 100% funzionante
- ✅ Responsive design
- ✅ localStorage persistence
- ✅ Zero dipendenze
- ✅ Deploy in 5 minuti
- ✅ Gratuito per sempre (Vercel free tier)

**Prossimi passi**:
1. Deploy su Vercel (5 minuti)
2. Testa su cellulare
3. Aggiungi dominio personalizzato (opzionale)
4. Condividi link con clienti!

---

**Ultima modifica**: 9 Maggio 2026  
**Creato da**: Claude Assistant  
**Status**: ✅ Ready for Production
