# 🎨 DESIGN PROMPT - MODERN LUXURY BARBERSHOP UI
## Google Stitch Inspired Design System

### Design Brief
Create a modern, premium design system for an Italian luxury barbershop ("Parrucchiere Rossi") that combines:
- Contemporary minimalism (2026 aesthetic)
- Premium luxury feel without being ostentatious
- Warm, welcoming, professional atmosphere
- High contrast for accessibility
- Smooth, sophisticated interactions

---

## 📋 COLOR PALETTE

### Primary Colors (Main Brand)
```
Primary Accent: #8B5A3C (Rich Warm Brown)
Secondary: #D4A574 (Golden Tan)
Tertiary: #2D3E50 (Deep Navy)
```

### Supporting Colors
```
Success/Growth: #27AE60 (Fresh Green)
Accent Highlight: #E8B4A8 (Warm Rose)
Background Light: #FAFBFC (Off White)
Background Dark: #1A1A1A (Deep Black for contrast)
```

### Neutral Tones
```
Text Primary: #1A1A1A (Near Black)
Text Secondary: #555555 (Medium Gray)
Text Light: #888888 (Light Gray)
Borders: #D0D0D0 (Soft Gray)
```

---

## 🔤 TYPOGRAPHY

### Font Families
```
Headlines: "Playfair Display" (Serif, elegant)
- Weights: 700, 800
- Usage: Main titles, section headers

Body Text: "Inter" (Sans-serif, modern)
- Weights: 400, 500, 600, 700
- Usage: All body text, buttons, labels
```

### Type Scale
```
H1: 56px, weight 800, color #1A1A1A
H2: 40px, weight 700, color #2D3E50
H3: 28px, weight 600, color #8B5A3C
Body Large: 18px, weight 400, line-height 1.6
Body Regular: 16px, weight 400, line-height 1.6
Body Small: 14px, weight 400, line-height 1.5
Label: 12px, weight 600, color #555555
```

---

## 🎯 COMPONENT DESIGN

### Buttons
#### Primary Button
```
Background: Linear gradient #8B5A3C → #6B4423
Text Color: #FAFBFC (white)
Padding: 14px 32px
Border Radius: 8px
Font: Inter, 16px, 600
Shadow: 0 4px 12px rgba(139, 90, 60, 0.25)
Hover: 
  - Shadow increased
  - Transform: translateY(-2px)
  - Gradient shift: slightly darker
```

#### Secondary Button
```
Background: Transparent
Border: 2px solid #8B5A3C
Text Color: #8B5A3C
Padding: 12px 30px
Hover:
  - Background: rgba(139, 90, 60, 0.05)
  - Border Color: #D4A574
  - Text Color: #D4A574
```

#### Accent Button (WhatsApp)
```
Background: #25D366 (WhatsApp Green)
Gradient: #25D366 → #128C7E
Border Radius: 50%
Size: 60px × 60px
Position: Fixed bottom-right
Animation: Gentle float + scale on hover
```

### Cards
```
Background: #FAFBFC
Border: 1px solid #D0D0D0
Border Radius: 12px
Padding: 24px
Shadow: 0 2px 8px rgba(0, 0, 0, 0.06)
Hover:
  - Shadow: 0 8px 24px rgba(139, 90, 60, 0.12)
  - Border Color: #D4A574
  - Transform: translateY(-4px)
  - Transition: 0.3s ease
```

### Input Fields
```
Background: #FAFBFC
Border: 1px solid #D0D0D0
Border Radius: 6px
Padding: 12px 16px
Font: Inter, 14px
Color: #1A1A1A
Placeholder: #888888

Focus State:
  - Border Color: #8B5A3C
  - Box Shadow: 0 0 0 3px rgba(139, 90, 60, 0.1)
  - Background: white
```

### Header/Navigation
```
Background: #FAFBFC with backdrop blur
Border Bottom: 2px solid #8B5A3C
Height: 80px
Position: Sticky
Shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

Nav Links:
  - Text: #1A1A1A
  - Hover: Color #8B5A3C with animated underline
  - Active: Color #D4A574, underline #D4A574
```

### Footer
```
Background: #2D3E50
Text Color: #FAFBFC
Links: #D4A574 (hover → #E8B4A8)
Border Top: 2px solid #8B5A3C
Padding: 40px 20px
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### Standard Transitions
```
Duration: 0.3s
Easing: cubic-bezier(0.4, 0, 0.2, 1) (Material Design standard)
```

### Keyframe Animations
```
fadeInUp:
  from: opacity 0, translateY(30px)
  to: opacity 1, translateY(0)
  duration: 0.8s ease-out

slideInLeft:
  from: opacity 0, translateX(-40px)
  to: opacity 1, translateX(0)
  duration: 0.8s ease-out

softGlow:
  0%, 100%: box-shadow 0 0 8px rgba(212, 165, 116, 0.2)
  50%: box-shadow 0 0 16px rgba(212, 165, 116, 0.4)
  duration: 2s ease-in-out infinite

float:
  0%, 100%: translateY(0)
  50%: translateY(-8px)
  duration: 3s ease-in-out infinite

slideDown:
  from: opacity 0, height 0
  to: opacity 1, height auto
  duration: 0.3s ease-out
```

### Interactive Micro-Interactions
```
Button Press:
  - Down: translateY(2px), shadow decrease
  - Release: back to hover state

Link Hover:
  - Underline animation (width 0 → 100%)
  - Color fade to accent
  - Duration: 0.3s

Card Hover:
  - Shadow enhancement
  - Subtle lift (translateY -4px)
  - Border color shift
  - Duration: 0.3s
```

---

## 📐 SPACING & LAYOUT

### Base 8px Grid System
```
XS: 4px
S: 8px
M: 16px
L: 24px
XL: 32px
XXL: 48px
XXXL: 64px
```

### Container Widths
```
Mobile: Full width (320px min)
Tablet: 90% with max 768px
Desktop: 1200px max-width, centered
```

### Section Spacing
```
Padding Top/Bottom: 60px (mobile), 80px (desktop)
Gap Between Sections: 40px
Card Grid Gap: 24px
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile: 320px - 480px
  - Single column layouts
  - Touch-friendly buttons (min 44px height)
  - Font sizes reduced proportionally
  - Padding: 16px

Tablet: 481px - 1024px
  - 2 column grids
  - Adjusted spacing
  - Font sizes medium scale
  - Padding: 24px

Desktop: 1025px+
  - 3 column grids
  - Full spacing
  - Original font sizes
  - Padding: 30px+
```

---

## ♿ ACCESSIBILITY

### Color Contrast
```
- All text: minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): minimum 3:1 ratio
- Primary buttons: #1A1A1A text on #8B5A3C = 8.5:1
```

### Focus States
```
- Visible 2px border in contrasting color
- Applied to all interactive elements
- Keyboard navigation fully supported
```

### Typography
```
- Body text: minimum 16px
- Line height: minimum 1.6
- Letter spacing: optimal for readability
- No text-only color differentiation
```

### Semantic HTML
```
- Proper heading hierarchy (H1 → H6)
- ARIA labels for complex components
- Form labels properly associated with inputs
- Alt text for all images
```

---

## 🎨 VISUAL HIERARCHY

### Color Usage
```
Primary (#8B5A3C): Main actions, important elements
Secondary (#D4A574): Supporting elements, accents
Neutral (#1A1A1A, #555555): Text, structure
Accent (#E8B4A8): Highlights, hover states
Success (#27AE60): Confirmations, positive feedback
```

### Typography Usage
```
Playfair Display: Major headings, premium feel
Inter: Everything else, readability
Weight contrast: Bold (700+) for titles, normal (400) for body
```

### Shadow & Depth
```
Subtle shadows (0 2px 8px) for cards
Medium shadows (0 8px 24px) for hover/elevation
Deep shadows (0 12px 32px) for modals/overlays
```

---

## 🔄 Design System Advantages

✅ **Consistency**: All components use unified color palette
✅ **Accessibility**: WCAG AA compliant color contrasts
✅ **Modern**: Contemporary 2026 aesthetic
✅ **Flexible**: Works from mobile to desktop
✅ **Professional**: Premium feel for luxury services
✅ **Responsive**: Scales beautifully across devices
✅ **Interactive**: Smooth animations enhance UX
✅ **Maintainable**: CSS variables for easy updates

---

## 📋 Implementation Checklist

- [ ] Color palette in CSS :root variables
- [ ] Typography styles defined
- [ ] Button variants (primary, secondary, accent)
- [ ] Card component styling
- [ ] Header/navigation styling
- [ ] Footer styling
- [ ] Input/form styling
- [ ] Animation keyframes
- [ ] Responsive breakpoints
- [ ] Accessibility verification
- [ ] Cross-browser testing
- [ ] Mobile testing

---

## 🚀 Design Token Summary

```css
:root {
  --primary: #8B5A3C;
  --secondary: #D4A574;
  --tertiary: #2D3E50;
  --accent: #E8B4A8;
  --success: #27AE60;
  
  --background-light: #FAFBFC;
  --background-dark: #1A1A1A;
  
  --text-primary: #1A1A1A;
  --text-secondary: #555555;
  --text-light: #888888;
  
  --border-color: #D0D0D0;
  
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.15);
  
  --transition-standard: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

This design system creates a **modern, luxury experience** perfect for a high-end barber shop while maintaining **excellent usability and accessibility**.
