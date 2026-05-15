# 🧪 GUIDA TESTING - SISTEMA PRENOTAZIONI

## TEST 1: VERIFICA FIREBASE COLLEGAMENTO

### Requisiti
- Browser Chrome, Firefox, Safari o Edge
- Connessione internet
- Accesso a https://parrucchiere-booking.vercel.app

### Procedura
1. Aprire https://parrucchiere-booking.vercel.app
2. Premere **F12** per aprire DevTools (Strumenti Sviluppatore)
3. Andare al tab **Console**
4. Cercare questi messaggi di successo:
   ```
   ✅ Firebase initialized successfully
   ✅ Firebase enabled: true
   ✅ Dati caricati da Firebase
   ```

### Risultati Attesi
- Nessun errore rosso in console
- Il messaggio "Firebase enabled: true" deve apparire
- Nessun messaggio "Cannot use import statement outside a module"

### Se Vedi Errori
```
❌ Errore "Cannot use import statement"
   → Pulire cache: Ctrl+Shift+Canc (selezionare "Cookie e dati del sito")
   → Ricaricare pagina: Ctrl+R

❌ Errore "Firebase is not defined"
   → Firebase SDK non ha caricato
   → Verificare connessione internet
   → Attendere 3-5 secondi e ricaricare
```

---

## TEST 2: FLUSSO COMPLETO PRENOTAZIONE

### Passo 1: Accedere alla Pagina Prenotazioni
1. Cliccare **"Accedi alle tue prenotazioni"** da home page
2. Inserire il **Codice Accesso** (fornito dal parrucchiere)
   - O Email e Password (se parrucchiere abilitato)
3. Cliccare **"Accedi"**

### Passo 2: Effettuare Prenotazione
1. Compilare il modulo:
   - **Data**: Scegliere una data futura
   - **Servizio**: Scegliere servizio (es: "Taglio Uomo")
   - **Ora**: Scegliere un orario disponibile
   - **Nome**: Inserire proprio nome
   - **Telefono**: Inserire numero telefono

2. Cliccare **"Conferma Prenotazione"**

### Passo 3: Verificare Salvataggio
1. Controllare in **Console** (DevTools):
   ```
   ✅ Booking salvato con ID: 1715817234567
   📊 Prenotazioni totali: 1
   👥 Clienti totali: 1
   ```

2. Se vedi il messaggio verde di successo:
   ```
   ✅ Prenotazione confermata! Ti contatteremo al numero...
   ```
   → **SUCCESSO**: La prenotazione è stata salvata su Firebase!

### Passo 4: Verificare in Parrucchiere Dashboard
1. Accedere a parrucchiere-login.html
2. Inserire credenziali:
   - Email: `demo@parrucchiererossi.it`
   - Password: `demo2026`
3. Cliccare **"Accedi al Dashboard"**

4. Nella dashboard, controllare:
   - Sezione **"Prenotazioni Recenti"** → Deve apparire la prenotazione appena fatta
   - Sezione **"Calendario"** → La data deve essere evidenziata
   - Numero prenotazioni deve aumentare

---

## TEST 3: SINCRONIZZAZIONE FIREBASE

### Verificare che i dati sono su Firebase (non solo localStorage)

#### Metodo 1: Console Logging
1. Aprire DevTools → Console
2. Ricaricare la pagina completamente (Ctrl+F5)
3. Se vedi questo messaggio:
   ```
   ✅ Prenotazioni caricate da Firebase: X
   ```
   → I dati sono su Firebase ✅

4. Se vedi questo messaggio:
   ```
   💾 Firebase non abilitato, caricamento da localStorage
   ```
   → Problema! Firebase non si è collegato

#### Metodo 2: Svuotare localStorage e Ricaricare
1. DevTools → Tab **Application** → **Storage** → **Local Storage**
2. Cercare la voce "bookingDB" e **cancellarla**
3. Ricaricare la pagina
4. Se le prenotazioni RIAPPAIONO → Sono su Firebase ✅
5. Se le prenotazioni SCOMPAIONO → Erano solo su localStorage ❌

---

## TEST 4: AUTO-REFRESH DASHBOARD

### Verificare che il dashboard si aggiorna automaticamente

1. Aprire due finestre browser:
   - **Finestra A**: parrucchiere-login.html (Dashboard)
   - **Finestra B**: cliente-prenotazioni.html (Prenotazioni)

2. In Finestra B: Effettuare una nuova prenotazione

3. In Finestra A: Attendere 5 secondi (auto-refresh è ogni 5 secondi)

4. **Verificare**: La nuova prenotazione appare nella dashboard senza ricaricare ✅

### Se non appare:
1. Cliccare su "Prenotazioni" o qualsiasi tab
2. Aspettare 5 secondi
3. Se ancora non appare, ricaricare la pagina manualmente (F5)

---

## TEST 5: ERROR HANDLING

### Test Errore di Connessione Firebase
1. Aprire DevTools → Network
2. Cercare le richieste a `firebasedatabase.app`
3. Cliccare tasto destro su una → **Block URL**
4. Effettuare una prenotazione
5. **Atteso**: Messaggio di errore rosso, ma dati salvati in localStorage
6. Sbloccare URL per restabilire connessione Firebase

---

## TEST 6: CREDENZIALI ACCESSO

### Test Login Parrucchiere
```
Email: demo@parrucchiererossi.it
Password: demo2026
```

Se login fallisce:
1. Verificare che nessuno spazio prima/dopo email
2. Verificare che MAIUSCOLE/minuscole siano corrette
3. Controllare in Console se vedi:
   ```
   🔥 Credenziali caricate da Firebase: X credenziali
   ```

---

## CHECKLIST TESTING COMPLETO

### Prima di Deployment
- [ ] Firebase connected: `firebase enabled: true`
- [ ] Prenotazione salvata: `✅ Booking salvato`
- [ ] Appare in dashboard entro 5 secondi
- [ ] Svuotare localStorage e dati persistono
- [ ] Login parrucchiere funziona
- [ ] Nessun errore rosso in console
- [ ] Auto-refresh funziona

### Dopo Deployment su Vercel
- [ ] Site raggiungibile via HTTPS
- [ ] Tutti i test superiori passano
- [ ] Credenziali demo funzionano
- [ ] Prenotazioni salvate permanentemente
- [ ] Dashboard aggiornato in tempo reale

---

## SCREENSHOT DEBUG

Se riscontri problemi, fare screenshot di:

1. **Console Errors**: DevTools → Console → Screenshot degli errori rossi
2. **Network Requests**: DevTools → Network → Cercare richieste a "firebasedatabase.app"
3. **Local Storage**: DevTools → Application → Local Storage → Screenshot della voce "bookingDB"

---

## CONTATTI SUPPORTO

Se il sistema non funziona:

1. **Verificare Console**: Ci sono errori rossi?
2. **Verificare Connessione**: Internet è collegato?
3. **Verificare Firebase**: Status.firebase.google.com online?
4. **Pulire Cache**: Ctrl+Shift+Canc → Pulire cookie e dati
5. **Hard Refresh**: Ctrl+F5 (non solo F5)

---

## NOTE IMPORTANTI

⚠️ **Non usare HTTP** - Deve essere HTTPS per accedere a Firebase
⚠️ **Non usare file://** - Deve essere URL valido (localhost o dominio)
⚠️ **Aspettare Firebase** - Primo caricamento può impiegare 2-3 secondi
⚠️ **Console è amico** - F12 → Console mostra tutti i dettagli del caricamento

---

**Test Created**: 15 Maggio 2026  
**Status**: Pronto per testing  
**Supporto**: Verificare sempre la Console per dettagli errori
