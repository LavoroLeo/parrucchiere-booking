# 🎨 PROMPT PER NUOVO TEMA UI/UX - PARRUCCHIERE ROSSI

## ISPIRAZIONE DESIGN MODERNO 2026

### Tema Scelto: "MINIMALIST LUXURY WITH WARM ACCENTS"

Basato su tendenze di design moderno per servizi premium:
- Minimalismo con elementi di lusso
- Palette caldi e accoglienti
- Typography moderna e leggibile
- Micro-interazioni sofisticate
- Accessibility-first approach

---

## 📋 SPECIFICHE DETTAGLIATE DEL TEMA

### 1. PALETTE COLORI (Warm Minimalist)

**Primary Colors:**
- **Warm Beige** `#D4B8A8` - Accenti principali, pulsanti, titoli
- **Deep Brown** `#4A3728` - Testo, elementi strutturali
- **Cream White** `#FEFDF8` - Background leggero, card backgrounds

**Secondary Colors:**
- **Sage Green** `#8B9E7D` - Accenti naturali, hover states
- **Warm Gold** `#C9A961` - Premium touches, small accents
- **Charcoal** `#2B2B2B` - Dark backgrounds, text contrast

**Neutral Palette:**
- Background Dark: `#F5F1ED` (off-white, warm)
- Background Darker: `#EAE4DD` (warm gray)
- Text Primary: `#2B2B2B` (charcoal)
- Text Secondary: `#6B6B6B` (medium gray)
- Text Light: `#9B9B9B` (light gray)

**Accent Colors:**
- Success: `#6B9E76` (green)
- Warning: `#D4926F` (orange)
- Error: `#C24A4A` (red)

### 2. TYPOGRAPHY

**Font Family:**
- **Headings**: "Playfair Display" (serif, elegant, premium)
  - H1: 64px, weight 800, letter-spacing -1.5px
  - H2: 40px, weight 700, letter-spacing -0.5px
  - H3: 24px, weight 600, letter-spacing 0px

- **Body**: "Inter" (sans-serif, modern, readable)
  - Body text: 16px, weight 400, line-height 1.7
  - Small text: 14px, weight 400, line-height 1.6
  - Buttons: 15px, weight 600

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. SPACING & LAYOUT

**Base Unit: 8px Grid System**
- Small: 8px (gaps, small padding)
- Medium: 16px (standard padding)
- Large: 24px (section spacing)
- XLarge: 40px (major sections)
- XXLarge: 60px-80px (hero sections)

**Widths:**
- Container max-width: 1200px
- Mobile breakpoints: 320px, 480px, 768px, 1024px, 1280px

### 4. COMPONENTS

#### Buttons
- **Primary Button:**
  - Background: `#D4B8A8` (warm beige)
  - Color: `#FFF` (white text)
  - Padding: 14px 32px
  - Border-radius: 6px
  - Font-weight: 600
  - Hover: Background `#C9A89C`, slight lift transform

- **Secondary Button:**
  - Background: transparent
  - Color: `#4A3728` (deep brown)
  - Border: 2px solid `#D4B8A8`
  - Padding: 12px 30px
  - Hover: Background `#FEF8F2`, border-color `#C9A961`

#### Cards
- Background: `#FEFDF8` (cream)
- Border: 1px solid `#E8DFD5` (light border)
- Border-radius: 12px
- Padding: 24px
- Box-shadow: 0 2px 12px rgba(0,0,0,0.05)
- Hover: shadow increase, subtle border color change

#### Input Fields
- Background: `#FEFDF8`
- Border: 1px solid `#D4B8A8`
- Border-radius: 6px
- Padding: 12px 16px
- Focus: Border-color `#C9A961`, soft glow
- Placeholder: `#9B9B9B`

#### Header
- Background: `#FEFDF8`
- Border-bottom: 2px solid `#D4B8A8`
- Height: 80px
- Sticky: yes
- Shadow: subtle (0 2px 8px rgba(0,0,0,0.05))

### 5. ANIMATIONS & INTERACTIONS

**Transitions:**
- Standard: 0.3s ease-in-out
- Hover: 0.2s ease-out
- Page load: 0.8s ease-out

**Keyframes:**
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes softGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(201, 169, 97, 0.2); }
  50% { box-shadow: 0 0 16px rgba(201, 169, 97, 0.4); }
}
```

**Button Interactions:**
- Hover: translate Y-2px, shadow increase
- Active: translate Y 0px
- Focus: border-color change + glow

**Link Underlines:**
- Animated underline on hover
- Width: 0 → 100% on hover
- Duration: 0.3s ease

### 6. SECTIONS DESIGN

#### Hero Section
- Min-height: 100vh
- Background: Gradient from `#FEFDF8` to `#EAE4DD`
- Content: Centered, max-width 800px
- Animation: staggered fadeInUp

#### Service Cards Grid
- Grid: 3 columns (auto-fit minmax(320px, 1fr))
- Gap: 24px
- Card hover: lift effect, border color change to `#C9A961`

#### Staff Showcase
- Grid: 3 columns with image circles
- Image: 120px circles with gradient overlay
- Info: below image, center aligned
- Rating display with stars

#### Contact Section
- 2 column layout (info + map)
- Background: `#EAE4DD` with gradient
- Map: rounded corners, shadow

#### Footer
- Background: `#4A3728` (deep brown)
- Text: `#FEFDF8` (cream)
- Links: `#D4B8A8` with hover `#C9A961`

### 7. RESPONSIVE DESIGN

**Mobile (320px-480px):**
- Single column layout
- Larger touch targets (min 44px height)
- Simplified navigation (hamburger menu)
- Button full-width

**Tablet (480px-768px):**
- 2 column grid for cards
- Adjusted font sizes
- Flexible layout

**Desktop (1024px+):**
- Full 3 column grid
- All animations enabled
- Hover states visible

### 8. ACCESSIBILITY

- Contrast ratio: All text min 4.5:1
- Font sizes: min 16px for body text
- Line-height: min 1.6 for readability
- Focus states: Clearly visible (min 2px border)
- Color not only information source
- Semantic HTML: proper heading hierarchy

### 9. MICRO-INTERACTIONS

**Hover Effects:**
- Card lift: translateY(-4px)
- Button shadow increase
- Link underline animation
- Icon rotation/scale

**Click Feedback:**
- Button press-down effect
- Form field focus ring
- Loading states with spinner

**Scroll Animations:**
- Hero fade-in on scroll
- Card stagger animations
- Parallax subtle backgrounds

### 10. WHATSAPP WIDGET STYLING

- Button: Circular, `#25D366` (WhatsApp green)
- Position: Fixed bottom-right
- Size: 60px diameter
- Hover: scale(1.1), shadow enhance
- Animation: gentle bounce/float

### 11. GOOGLE MAPS STYLING

- Border-radius: 12px
- Shadow: 0 8px 24px rgba(0,0,0,0.1)
- Height: 400px responsive
- Container: max-width 600px

---

## 🎯 KEY DIFFERENTIATORS FROM ORIGINAL

| Aspetto | Original (Gold/Pink) | Nuovo (Warm Beige) |
|---------|---------------------|-------------------|
| Feeling | Luxury dark | Warm minimalist |
| Colors | Bold gold + pink | Subtle beige + green |
| Typography | Playfair + Inter | Same (optimized) |
| Contrast | High (dark bg) | Lower (light bg) |
| Accessibility | Good | Better |
| Modernity | 2023-24 style | 2026 contemporary |
| Vibe | Premium/Nightclub | Professional/Welcoming |

---

## 📱 IMPLEMENTAZIONE PREVISTA

**File CSS:** `style-warm-minimalist.css`
**File HTML:** `index-warm-minimalist.html`

Stessi componenti, nuovo styling:
- ✅ Header sticky
- ✅ Hero section
- ✅ Service cards
- ✅ Staff showcase
- ✅ Contact section + Google Maps
- ✅ WhatsApp widget
- ✅ Footer
- ✅ Form elements
- ✅ Responsive design
- ✅ Animations

---

## 🚀 RESULT

Un sito che mantiene la funzionalità dell'originale ma con:
- **Estetica più moderna** (warm minimalist vs dark luxury)
- **Migliore accessibilità** (light background, warm colors)
- **Più accogliente** (warm tones vs cold gold)
- **Ancora premium** (quality design, attention to detail)
- **Contemporaneo** (design trends 2026)

**TEMA PRONTO DA IMPLEMENTARE!** ✨
