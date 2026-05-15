# 💻 CODING REFERENCE - Come Modificare Preservando lo Stile Originale

**Guida Pratica**  
**Data**: 9 Maggio 2026  
**Scopo**: Mostrare come fare modifiche mantenendo struttura e stile originali

---

## 🔄 Processo di Modifica

Ogni volta che devi modificare un file HTML:

### Step 1: Leggi la Sezione Originale
```
Apri il file HTML
↓
Leggi la sezione simile a quella che vuoi modificare
↓
Copia l'intera struttura HTML della sezione
↓
Nota l'inline style pattern
↓
Prendi le classi CSS usate
```

### Step 2: Scrivi il Nuovo Codice
```
Conserva la STESSA struttura HTML
↓
Usa gli STESSI style pattern
↓
Mantieni lo STESSO schema colori
↓
Segui lo STESSO layout grid/flex
```

### Step 3: Commenta il Nuovo Codice
```
<!-- SEZIONE ORIGINALE -->
<div style="background: #0f0f0f; padding: 60px 20px;">
    <h2 style="color: #d4af37;">Titolo Originale</h2>
</div>

<!-- MODIFICA: [Descrizione cosa cambia] -->
<div style="background: #0f0f0f; padding: 60px 20px;">
    <h2 style="color: #d4af37;">Titolo Modificato</h2>
    <p style="color: #cccccc;">Nuovo contenuto mantenendo stile</p>
</div>
```

---

## 📋 Style & Structure Patterns

Quando copi il pattern, usa questi elementi:

### Pattern 1: HERO SECTION

**Originale** (da index.html):
```html
<section class="hero" style="background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%); min-height: 90vh; position: relative; overflow: hidden;">
    <div class="hero-overlay" style="background: rgba(15, 15, 15, 0.4);"></div>
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml,...'); opacity: 0.5;"></div>
    <div class="hero-content" style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; text-align: center;">
        <h1 class="hero-title" style="font-size: 72px; font-weight: 800; color: #f5f5f5; margin-bottom: 20px; letter-spacing: -2px;">Titolo</h1>
        <p style="font-size: 24px; color: #d4af37; font-weight: 600;">Sottotitolo</p>
        <button class="btn btn-primary btn-large" style="padding: 18px 48px; font-size: 18px; font-weight: 700; background: linear-gradient(135deg, #d4af37, #ffd700); color: #000;">BOTTONE</button>
    </div>
</section>
```

**Elementi Chiave**:
- `background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)`
- `min-height: 90vh`
- `position: relative`
- `color: #f5f5f5` (text principale)
- `color: #d4af37` (accents)
- `font-weight: 800` (headings)

**Come Usarlo**:
Se vuoi modificare il hero section, mantieni TUTTI questi style e solo cambia il contenuto testo.

---

### Pattern 2: CARD SECTION (Trust/Services)

**Originale**:
```html
<section class="trust-section" style="background: #1a1a1a; padding: 60px 20px;">
    <div class="container">
        <h2 style="text-align: center; color: #d4af37; font-size: 28px; margin-bottom: 40px;">Titolo Sezione</h2>
        <div class="trust-grid">
            <div class="trust-card" style="background: #252525; border: 1px solid #333; padding: 30px; border-radius: 12px; text-align: center;">
                <div class="trust-icon" style="font-size: 40px; margin-bottom: 15px;">🎯</div>
                <h3 style="color: #f5f5f5; margin-bottom: 10px;">Titolo Card</h3>
                <p style="color: #cccccc;">Descrizione card</p>
            </div>
            <!-- Ripeti card -->
        </div>
    </div>
</section>
```

**Elementi Chiave**:
- Background sezione: `#1a1a1a`
- Background card: `#252525`
- Border: `1px solid #333`
- Border radius: `12px`
- Padding card: `30px`
- Titolo: `color: #d4af37; font-size: 28px`
- Testo: `color: #cccccc`
- Icon: `font-size: 40px`

**Come Usarlo**:
Quando aggiungi nuove card, copia questo pattern esattamente.

---

### Pattern 3: BUTTON

**Originale**:
```html
<!-- PRIMARY BUTTON (Giallo/Gold) -->
<button class="btn btn-primary btn-large" style="padding: 18px 48px; font-size: 18px; font-weight: 700; background: linear-gradient(135deg, #d4af37, #ffd700); color: #000;">
    TESTO BOTTONE
</button>

<!-- SECONDARY BUTTON (Border) -->
<a href="#" class="btn btn-secondary" style="padding: 18px 48px; font-size: 18px; font-weight: 700; border: 2px solid #d4af37; background: transparent; color: #d4af37;">
    TESTO BOTTONE
</a>

<!-- SMALL BUTTON -->
<button style="padding: 12px 24px; font-size: 14px; font-weight: 600; background: #d4af37; color: #000; border: none; border-radius: 6px; cursor: pointer;">
    Piccolo Bottone
</button>
```

**Elementi Chiave**:
- Primary: `background: linear-gradient(135deg, #d4af37, #ffd700); color: #000;`
- Secondary: `border: 2px solid #d4af37; background: transparent; color: #d4af37;`
- Font weight: `700` (bold)
- Border radius: `6px` o `12px`

**Come Usarlo**:
Quando aggiungi bottoni nuovi, usa uno di questi 3 pattern.

---

### Pattern 4: FORM INPUT

**Originale** (da index.html sezione prenotazioni):
```html
<section id="prenota" style="background: #0f0f0f; padding: 80px 20px; position: relative;">
    <div class="container">
        <h2 style="text-align: center; color: #d4af37; font-size: 36px; margin-bottom: 50px; font-weight: 800;">Prenota Appuntamento</h2>
        
        <div style="background: #1a1a1a; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">📅 Data</label>
            <input type="date" style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
            
            <label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">✂️ Servizio</label>
            <select style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
                <option>Seleziona servizio</option>
                <option>Taglio Uomo - 25€</option>
            </select>
            
            <label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">👤 Nome</label>
            <input type="text" placeholder="Es. Marco" style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
            
            <label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">☎️ Telefono</label>
            <input type="tel" placeholder="Es. +39 320..." style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
            
            <button style="width: 100%; padding: 15px; background: linear-gradient(135deg, #d4af37, #ffd700); color: #000; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                ✅ CONFERMA PRENOTAZIONE
            </button>
        </div>
    </div>
</section>
```

**Elementi Chiave**:
- Container form: `background: #1a1a1a; padding: 40px; border-radius: 12px;`
- Input style: `background: #252525; border: 1px solid #d4af37; color: #f5f5f5;`
- Label: `color: #d4af37; font-weight: 600;`
- Padding input: `12px`
- Placeholder color: `color: #f5f5f5;` (opaco)

**Come Usarlo**:
Quando aggiungi form input nuovi, usa questo pattern esatto.

---

### Pattern 5: GRID LAYOUT

**Originale**:
```html
<!-- AUTO-FIT GRID (responsive) -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px;">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
    <div>Card 4</div>
</div>

<!-- FIXED 2-COLUMN GRID -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div>Left</div>
    <div>Right</div>
</div>

<!-- FLEX LAYOUT (buttons) -->
<div style="display: flex; gap: 20px; justify-content: center;">
    <button>Bottone 1</button>
    <button>Bottone 2</button>
</div>
```

**Elementi Chiave**:
- Auto-fit grid: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- Gap: `40px` (tra items)
- Flex: `justify-content: center` (centra bottoni)

**Come Usarlo**:
Quando aggiungi layout responsive, usa `auto-fit` per responsive, o `1fr` per colonne fisse.

---

## 🎨 Color & Styling Reference

### Colori da Usare

```
Testo Principale:          #f5f5f5 (bianco)
Testo Secondario:          #cccccc (grigio chiaro)
Testo Terziario:           #999999 (grigio scuro)
Sfondo Principale:         #0f0f0f (nero)
Sfondo Secondario:         #1a1a1a (nero +10%)
Sfondo Card/Input:         #252525 (nero +30%)
Border:                    #333 (grigio molto scuro)
Accent Primario:           #d4af37 (giallo/oro)
Accent Secondario:         #c0a080 (marrone/bronzo)
Accento Button:            #ffd700 (giallo brillante)
```

### Font Weights

```
Titoli grandi:             800 (font-weight: 800)
Titoli card:               600 (font-weight: 600)
Label/Button:              700 (font-weight: 700)
Testo normale:             400 (default)
```

### Font Sizes

```
H1 (Hero):                 72px
H2 (Section):              36px o 28px
H3 (Card):                 22px o 18px
Paragrafo:                 16px
Piccolo:                   14px
```

### Spacing

```
Padding sezione:           60px 20px o 80px 20px
Padding card:              30px
Padding input:             12px
Gap tra cards:             40px o 30px
Margin-bottom heading:     20px, 40px, o 50px
```

---

## 📝 Esempio Pratico: Aggiungere una Nuova Sezione

### Passo 1: Leggi la Sezione Simile

```html
<!-- Voglio aggiungere una sezione "Galleria" simile a "Servizi" -->
<!-- Vado a leggere la sezione SERVIZI da index.html -->

<!-- SEZIONE SERVIZI (ORIGINALE) -->
<section id="servizi" style="background: #0f0f0f; padding: 80px 20px;">
    <div class="container">
        <h2 style="text-align: center; color: #d4af37; font-size: 36px; margin-bottom: 50px; font-weight: 800;">I Nostri Servizi</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            <div style="background: #252525; border: 2px solid #d4af37; padding: 30px; border-radius: 12px; text-align: center;">
                <h3 style="color: #d4af37; font-size: 24px; margin-bottom: 15px;">📌 Taglio Uomo</h3>
                <p style="color: #cccccc; margin-bottom: 10px;">Taglio professionale per uomo</p>
                <p style="color: #d4af37; font-size: 18px; font-weight: 700;">25€ • 30 min</p>
                <button onclick="selectService('Taglio Uomo')" style="margin-top: 15px; padding: 10px 20px; background: #d4af37; color: #000; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">SELEZIONA</button>
            </div>
            <!-- altre cards -->
        </div>
    </div>
</section>
```

### Passo 2: Copia il Pattern

```html
<!-- Prendo la STESSA struttura -->
<section style="background: #0f0f0f; padding: 80px 20px;">
    <div class="container">
        <h2 style="text-align: center; color: #d4af37; font-size: 36px; margin-bottom: 50px; font-weight: 800;">Titolo</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            <!-- Card items -->
        </div>
    </div>
</section>
```

### Passo 3: Scrivi il Nuovo Contenuto

```html
<!-- SEZIONE GALLERIA (NUOVA) - Struttura copiata da SERVIZI -->
<section id="galleria" style="background: #0f0f0f; padding: 80px 20px;">
    <div class="container">
        <h2 style="text-align: center; color: #d4af37; font-size: 36px; margin-bottom: 50px; font-weight: 800;">Galleria Foto</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            <div style="background: #252525; border: 2px solid #d4af37; padding: 30px; border-radius: 12px; text-align: center;">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #d4af37, #c0a080); border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                    <p style="color: #000; font-size: 12px;">Foto 1</p>
                </div>
                <h3 style="color: #f5f5f5; font-size: 18px; margin-bottom: 10px;">Titolo Foto</h3>
                <p style="color: #cccccc;">Descrizione della foto</p>
            </div>
            <!-- Altre foto cards -->
        </div>
    </div>
</section>
```

**Cosa è rimasto uguale**:
- `background: #0f0f0f` ✅
- `padding: 80px 20px` ✅
- `color: #d4af37` per titolo ✅
- `font-size: 36px` per titolo ✅
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` ✅
- `background: #252525` per card ✅
- `border: 2px solid #d4af37` ✅
- `border-radius: 12px` ✅

**Cosa è cambiato**:
- ID section: `servizi` → `galleria`
- Titolo: "I Nostri Servizi" → "Galleria Foto"
- Contenuto card: servizio → foto

---

## ✅ Checklist Prima di Salvare

Quando modifichi un file, verifica:

```
☐ Background colori coerenti con originale (#0f0f0f, #1a1a1a, #252525)
☐ Testo colori corretti (#f5f5f5, #d4af37, #cccccc)
☐ Border colori (#333, #d4af37)
☐ Font weights corretti (700, 800, 600)
☐ Font sizes mantengono gerarchia (72px > 36px > 18px > 16px)
☐ Padding/margin coerenti (20px, 30px, 40px, 60px, 80px)
☐ Border radius coerenti (6px, 8px, 12px)
☐ Grid layout responsive (auto-fit o 1fr)
☐ Nessun font esterno (tutti Google safe)
☐ Inline styles solo (no CSS file)
☐ Commenti HTML descrivono modifiche
```

---

## 🔍 Come Leggo la Struttura Originale

Quando voglio copiare un pattern:

```javascript
// PASSO 1: Apri il file HTML originale
// PASSO 2: Trova la sezione simile
// PASSO 3: Seleziona l'INTERO blocco HTML da <!-- SEZIONE --> a </section>
// PASSO 4: Copia nel clipboard
// PASSO 5: Incolla nel punto dove vuoi modificare
// PASSO 6: Cambia SOLO il contenuto (testo, valori, etc.)
// PASSO 7: Mantieni TUTTI gli style inline
```

---

## 📌 Regole Globali

**SEMPRE**:
- ✅ Mantieni inline styles (non aggiungere `<style>` tag)
- ✅ Usa solo colori dalla palette (#0f0f0f, #d4af37, etc.)
- ✅ Grid responsive con `auto-fit` per layout mobile-first
- ✅ Commenta le modifiche con `<!-- MODIFICA: Descrizione -->`
- ✅ Verifica coerenza stilistica prima di salvare

**MAI**:
- ❌ Non aggiungere CSS file esterni
- ❌ Non usare framework (Bootstrap, Tailwind, etc.)
- ❌ Non cambiare font (rimani con system fonts)
- ❌ Non modificare colori base (mantieni palette originale)
- ❌ Non eliminare responsive `auto-fit` grid

---

## 🎯 Esempio Completo: Modificare il Booking Form

### Originale
```html
<label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">📅 Data</label>
<input type="date" style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
```

### Modifica: Aggiungere campo Email

```html
<!-- ORIGINALE: Campo Data -->
<label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">📅 Data</label>
<input type="date" style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">

<!-- MODIFICA: Aggiunto campo Email con stesso stile -->
<label style="display: block; color: #d4af37; font-weight: 600; margin-bottom: 10px;">📧 Email</label>
<input type="email" placeholder="es. mario@example.com" style="width: 100%; padding: 12px; background: #252525; border: 1px solid #d4af37; color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; font-size: 16px;">
```

**Cosa è rimasto uguale**:
- `color: #d4af37` per label ✅
- `font-weight: 600` per label ✅
- `padding: 12px` per input ✅
- `background: #252525` per input ✅
- `border: 1px solid #d4af37` ✅
- `color: #f5f5f5` per testo ✅
- `border-radius: 8px` ✅
- `margin-bottom: 20px` ✅

---

**Summary**: Quando modifichi, SEMPRE leggi il file originale, COPIA la struttura, CAMBIA SOLO il contenuto. Così mantieni stile e design system coerente! ✅
