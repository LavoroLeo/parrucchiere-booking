# Deployment su Vercel - Checklist Completa

## Pre-Deployment

### Checklist Tecnica
- [ ] Firebase configurato e testato
- [ ] Tutti i file HTML, CSS, JS sono nella cartella
- [ ] `firebase-config.js` ha credenziali REALI (non template)
- [ ] Prova locale funziona: booking + parrucchiere + Firebase save
- [ ] Nessun errore in console (F12 → Console)

### Checklist Codice
- [ ] Password parrucchiere è stata cambiata da default
- [ ] Nome salone personalizzato
- [ ] Telefono e email corretti
- [ ] Orari corretti
- [ ] Servizi e prezzi corretti
- [ ] Logo personalizzato (se disponibile)

### Checklist Sicurezza
- [ ] Firebase Rules aggiornate (test mode → production)
- [ ] `firebase-config.js` NON gitignored (serve in Vercel)
- [ ] Admin password NON in localStorage (in Firebase)
- [ ] HTTPS abilitato (Vercel lo fa automaticamente)

---

## Step 1: Prepara Repository GitHub

### Crea Repository
```bash
# Se non hai già git inizializzato:
cd /Desktop/Artigiani
git init
git add .
git commit -m "Initial commit: parrucchiere booking system"
```

### Crea su GitHub
1. Vai su https://github.com/new
2. Nome: `parrucchiere-booking`
3. Descrizione: "Online booking system for salons"
4. **Visibility**: Public (così Vercel può accedere)
5. Clicca **"Create repository"**

### Push Code
```bash
git remote add origin https://github.com/[TUO_USERNAME]/parrucchiere-booking.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy su Vercel

### Crea Account Vercel
1. Vai su https://vercel.com
2. Clicca **"Sign Up"**
3. Scegli: **"Continue with GitHub"**
4. Autorizza Vercel ad accedere ai tuoi repository

### Import Progetto
1. Clicca **"Add New..."** (top right) → **"Project"**
2. Seleziona repository: `parrucchiere-booking`
3. Clicca **"Import"**

### Configurazione Deploy
- **Framework Preset**: Seleziona **"Other"** (è HTML/CSS/JS puro)
- **Root Directory**: `/` (default, va bene)
- **Build Command**: Lascio vuoto
- **Output Directory**: `./`
- **Install Command**: Lascio vuoto

Clicca **"Deploy"**

⏳ Aspetta 1-2 minuti...

✅ **Deployment completato!** Vercel ti da un URL tipo:
```
parrucchiere-booking.vercel.app
```

---

## Step 3: Test Deploy

1. Apri https://parrucchiere-booking.vercel.app
2. Verifica:
   - [ ] Home page carica correttamente
   - [ ] Logo e nome salone sono corretti
   - [ ] Telefono è corretto
   - [ ] Booking form funziona
   - [ ] Admin login funziona
   - [ ] Firebase salva dati (check console.firebase.google.com)

### Se Qualcosa Non Funziona

**Errore: "Module not found"**
- Verifica che tutti i file (HTML, CSS, JS) sono nel repository

**Errore: "Firebase not configured"**
- Verifica `firebase-config.js` ha credenziali REALI
- Fai git push di nuovo
- Redeploy su Vercel (clicca "Deployments" → ultimi 3 punti → "Redeploy")

**Dati non salvano in Firebase**
- Apri console (F12 → Console)
- Cerca messaggi di errore rossi
- Controlla Firebase rules (test mode abilitato?)

---

## Step 4: Aggiungi Dominio Personalizzato

### Opzione A: Dominio Vostro Già Esistente

**Esempio**: Avete `aldocoppola.it`

1. In Vercel → **Settings** → **Domains**
2. Clicca **"Add Custom Domain"**
3. Digita: `prenota.aldocoppola.it` (oppure `aldocoppola.it/prenota`)
4. Seleziona l'opzione che appare
5. Vercel ti da **CNAME record** da aggiungere nel vostro DNS

**Aggiungi CNAME nel vostro registrar** (Aruba, Namecheap, etc.):
- Host: `prenota` (oppure `aldocoppola`)
- Value: `cname.vercel-dns.com`
- TTL: 3600

⏳ Aspetta 5-30 minuti (propagazione DNS)

✅ `prenota.aldocoppola.it` → punta a Vercel

### Opzione B: Dominio Nuovo da Comprare

Se cliente non ha dominio:

1. Compra dominio su **Namecheap** o **Aruba**
   - Esempio: `aldocoppola-prenota.it` (€8-15/anno)

2. Stesso processo di CNAME sopra

3. O: Usa semplicemente `parrucchiere-booking.vercel.app` (gratis ma meno professionale)

---

## Step 5: Setup Sottodomini (Multi-Cliente)

Se vuoi un dominio principale e sottodomini per ogni cliente:

### Opzione: Tutti su Subdominio

**Struttura**:
```
prenota.parrucchieribook.it → Aldo Coppola
pisterzi.parrucchieribook.it → Pisterzi
tonsorclub.parrucchieribook.it → Tonsor Club
```

**Setup**:

1. Compra `parrucchieribook.it`

2. In Vercel → Aggiungi CNAME per ognuno:
   - `prenota.parrucchieribook.it` → Vercel
   - `pisterzi.parrucchieribook.it` → Vercel
   - `tonsorclub.parrucchieribook.it` → Vercel
   - Tutti puntano allo stesso Vercel

3. Il sistema riconosce il sottodominio e carica il giusto `businessId`:

```javascript
// In script.js (aggiungere questa logica):
function getBusinessIdFromDomain() {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    // Mapping:
    const map = {
        'prenota': 'aldo-coppola-milano',
        'pisterzi': 'pisterzi-hair-design',
        'tonsorclub': 'tonsor-club-milano'
    };
    
    return map[subdomain] || 'demo-parrucchiere-rossi';
}
```

---

## Step 6: Setup Automatico per Nuovi Clienti

Quando aggiungi un nuovo cliente:

### Locale
1. Clona il repository
2. Personalizza `firebase-config.js` (stesso Firebase va bene)
3. Personalizza HTML nome/telefono
4. Configura servizi in parrucchiere
5. Push a GitHub

### Vercel
1. Crea nuovo progetto Vercel (puoi clonare dal vecchio)
2. Punta a questo repository
3. Deploy automatico

### DNS
Aggiungi sottodominio nuovo nel registrar

---

## Checklist Pre-Launch Finale

### Funzionalità
- [ ] Home page carica (tutti i servizi visibili)
- [ ] Booking form completo (data, servizio, client info)
- [ ] Time slots bloccati correttamente (durata servizio funziona)
- [ ] Admin login funziona
- [ ] Dashboard mostra prenotazioni
- [ ] Firebase salva dati
- [ ] Dati persistono dopo cache clear
- [ ] Mobile responsive (test su cellulare)

### Design
- [ ] Nome salone visible in header
- [ ] Telefono corretto in header
- [ ] Logo personalizzato (se disponibile)
- [ ] Colori coerenti
- [ ] Botton CTA ben visibili
- [ ] Footer info corretti

### Business
- [ ] Password parrucchiere cambiata
- [ ] Orari apertura corretti
- [ ] Servizi e prezzi corretti
- [ ] Indirizzo esatto
- [ ] Email di contatto corretta

### Performance
- [ ] Pagina carica < 3 secondi
- [ ] Nessun errore in console
- [ ] Firebase rules appropriate (non test mode)
- [ ] SSL certificate attivo (https, non http)

---

## Commands Vercel Utili

### Redeploy un Deploy Vecchio
1. Vai a https://vercel.com/dashboard
2. Clicca il progetto
3. **Deployments**
4. Clicca il deploy
5. Tre punti (...) → **Redeploy**

### Aggiorna da GitHub
Ogni push a GitHub auto-trigger deploy su Vercel (magic!)

### Rollback a Deploy Vecchio
Se ultimi cambio breaks qualcosa:
1. **Deployments** (vedi sopra)
2. Tre punti su deploy precedente → **Promote to Production**

### Vedi Logs
Se deploy fallito:
1. **Deployments** → deploy che ha fallito
2. Clicca → vedi log completo con errori

---

## Troubleshooting Comune

### "404 Not Found" su dominio custom
- Aspetta 30 minuti (DNS propagation)
- Oppure: CNAME record digitato male nel registrar
- Soluzione: verifica CNAME in registrar

### "This site can't be reached"
- DNS non propagato ancora (aspetta)
- O: Vercel non ha dominio aggiunto (ricontrolla)

### Pagina bianca su Vercel
- File index.html non caricato
- Soluzione: rinomina `index.html` in `public/index.html` oppure crea `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Firebase non funziona su Vercel ma funziona localmente
- `firebase-config.js` non caricato → verifica sia nel repository
- CORS issue → Firebase non ha permessi da questo dominio
- Soluzione: Vai Firebase Console → Settings → Authorized Domains → Aggiungi `tuodominio.vercel.app`

---

## Dopo Launch

### Monitoraggio
- Controlla Firebase console giornalmente (booking in arrivo?)
- Test booking settimanale (sistema ancora funziona?)
- Leggi reviews dei clienti (segnalare problemi?)

### Backup
Firebase auto-backup, ma tu:
- Scarica export prenotazioni settimanale (CSV from parrucchiere)
- Salva in Google Drive/Dropbox

### Support
Rimani disponibile:
- WhatsApp per cliente (risponde in 24h)
- Email per problemi tecnici
- Zoom call se setup nuovo cliente

---

## ✅ FINITO!

Sistema è LIVE con:
- ✅ Dominio personalizzato (professionali!)
- ✅ SSL/HTTPS (sicuro)
- ✅ Firebase cloud backup (dati persistenti)
- ✅ Auto-deploy da GitHub (puoi fare changes, auto-aggiorna)
- ✅ CDN globale (Vercel distribuisce su 300+ edge servers)
- ✅ Uptime 99.95%

**Prossimo**: Contatta i 5 parrucchieri e fai video demo! 🎬
