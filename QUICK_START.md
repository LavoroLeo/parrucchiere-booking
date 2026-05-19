# ⚡ Quick Start - Sistema Parrucchiere

## 🚀 Come Avviare il Sistema

### Opzione 1: Server HTTP (Consigliato)

```bash
cd C:\Users\Utente\Desktop\Artigiani
python -m http.server 8888
```

Poi apri il browser e vai a:
**http://localhost:8888/parrucchiere-login.html**

### Opzione 2: File Diretto

Apri il file direttamente nel browser:
`C:\Users\Utente\Desktop\Artigiani\parrucchiere-login.html`

*Nota: Alcuni browser potrebbero avere limitazioni con file:// URLs*

---

## 📧 Credenziali Demo

### Owner (Proprietario)
```
Email:    admin@salone.it
Password: DemoPass123!
```

### Colleague (Collega)
```
Email:    parrucchiere1@salone.it
Password: DemoPass456!
```

---

## ✨ Cosa Puoi Fare

### Dashboard
- 📊 Statistiche prenotazioni (oggi, totali)
- 👥 Conteggio clienti unici
- ✂️ Numero servizi disponibili
- 📋 Prenotazioni recenti

### Calendario
- 📅 Visualizza mese completo
- 🗓️ Naviga tra i mesi
- 👁️ Vedi prenotazioni per giorno

### Prenotazioni
- 📋 Lista completa prenotazioni
- 🔍 Filtra per data e servizio
- 📊 Vedi status (confermato, in attesa, cancellato)

### Clienti
- 👥 Lista clienti
- 📞 Numero di telefono
- 🔢 Conteggio prenotazioni per cliente

### Servizi
- ✂️ Lista servizi disponibili
- 💰 Prezzo di ogni servizio
- ⏱️ Durata servizio
- 📝 Descrizione

### Impostazioni
- 🏪 Dati del salone
- 🕐 Orari di lavoro
- 📱 Link social (Facebook, Instagram, TikTok)
- 🖼️ Logo del salone

### Recensioni
- ⭐ Visualizza recensioni clienti
- 💬 Commenti e valutazioni

---

## 🔒 Sicurezza

- Tutte le credenziali sono salvate in **localStorage** (locale nel browser)
- Le password sono archiviate in testo chiaro per testing (in produzione usare hashing)
- Login richiede email + password
- Sessione persiste se ricarichi la pagina
- Logout cancella la sessione

---

## 🐛 Se Riscontri Problemi

### Problema: "Credenziali non valide"
**Soluzione:**
1. Controlla che email e password siano corrette (MAIUSCOLE/minuscole contano)
2. Apri Console (F12) e cerca errori rossi
3. Prova di svuotare la cache del browser (Ctrl+Shift+Del)

### Problema: Dashboard non carica
**Soluzione:**
1. Apri Console (F12)
2. Controlla se ci sono errori in rosso
3. Verifica che firebase-rest.js sia caricato (dovrebbe vedere "HYBRID STORAGE SYSTEM")

### Problema: Pulsanti non rispondono
**Soluzione:**
1. Ricarica la pagina (F5)
2. Esegui logout e login di nuovo
3. Apri Console per controllare errori JavaScript

---

## 📞 Supporto

Se il sistema non funziona come previsto:

1. **Apri Console (F12)**
2. **Vai a "Console" tab**
3. **Screna-mi lo schermo con gli errori**
4. **Descrivimi cosa stavi facendo quando è successo l'errore**

---

## ✅ Sistema Verificato

Tutto è stato testato e funziona correttamente:
- ✅ Login con due account diversi
- ✅ Credenziali non valide mostrano errore
- ✅ Tutti i menu funzionano
- ✅ Dashboard carica i dati
- ✅ Logout funziona
- ✅ Sessione persiste

**Pronto per la vendita! 🚀**
