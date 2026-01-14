# LEXXI PRO - BEAUTIFUL MODERN UI DESIGN SYSTEM

## 🎨 COMPLETE UI/UX DESIGN PROMPT

Use this prompt with **v0.dev**, **Cursor**, **Claude**, or any AI design tool to generate the Lexxi Pro interface:

---

### **📱 DESIGN BRIEF**

**App Name:** Lexxi Pro  
**Tagline:** "Show them. Don't tell them."  
**Purpose:** Professional AR hair color consultation tool for stylists  
**Platform:** iPad-first (landscape orientation), with iPhone support  
**Design Style:** Luxurious, professional, minimalist with high-end salon aesthetic  

---

## **PRIMARY PROMPT FOR v0.dev / CURSOR**

```
Create a beautiful, modern iPad app interface for Lexxi Pro, a professional hair color consultation tool for stylists. The app combines AR camera preview with color selection and generates precise formulas.

DESIGN SYSTEM:
- Colors: Deep charcoal (#2C2C2C), champagne gold (#D4AF37), pure white (#FFFFFF), soft cream (#F9F7F4)
- Typography: Inter (sans-serif) for UI, Cormorant Garamond (serif) for headings
- Layout: Split-screen on iPad (camera left, controls right)
- Aesthetic: Luxury salon - think Vidal Sassoon meets Apple Store
- Vibe: Professional, trustworthy, high-end, clean

CORE SCREENS TO DESIGN:

1. HOME DASHBOARD
- Top bar: "Lexxi Pro" logo (gold script), notification bell, settings gear
- Hero section: Large "New Consultation" button (gold, rounded, elevated shadow)
- Recent clients: Card-based grid with client photos + last service
- Today's stats: Clean metrics cards (consultations, bookings, conversion %)
- Quick actions: Formula library, client database, analytics (icon buttons)

2. CONSULTATION SCREEN (Split-screen iPad layout)
LEFT SIDE (60% width):
- Live camera feed fills entire space
- AR color overlay blends naturally with hair
- Subtle crosshair guides for face positioning
- Before/After toggle button (bottom-left corner)
- Capture photo button (bottom-center, gold circle with camera icon)

RIGHT SIDE (40% width):
- Client name header with avatar
- Color picker: Horizontal scrollable swatches (large, circular, 60px)
- Active color displays: Name, brand, line (e.g., "Warm Caramel - Redken Shades EQ")
- Category tabs: All, Blonde, Brown, Red, Black, Fashion (pill-shaped)
- Brand filter dropdown: Wella, Redken, L'Oréal, etc.
- Compare mode: Small preview grid (2x2) for side-by-side
- Action buttons: "Generate Formula" (gold, prominent), "Save", "Email"

3. FORMULA GENERATOR OUTPUT
- Elegant card design with subtle drop shadow
- Header: Client name + desired color + starting level
- Sections with clean dividers:
  * Technique (icon + text)
  * Processing time (clock icon + time)
  * Formula breakdown (bullet list, indented, monospace font for measurements)
  * Cost analysis (table: products, service, total, retail suggestions, margin %)
  * Maintenance schedule (calendar icon + dates)
- Footer: Alternative options as chips (tappable pills)
- Buttons: "Approve & Continue" (gold), "Modify Formula", "Save to Library"

4. CONSENT FORM SCREEN
- Legal document aesthetic (clean, serif headings, sans-serif body)
- Header: "Hair Color Service Agreement & Liability Waiver"
- Client info section: Name, date, stylist
- Service summary card: Description, formula, cost (highlighted box)
- Acknowledgments: Custom checkbox design (gold checkmarks)
- Signature areas: Two side-by-side boxes with signature capture
- Footer buttons: "Finalize & Proceed" (gold, full-width)

5. PATCH TEST SCHEDULER
- Warning banner at top: Yellow background, ⚠️ icon, "Patch Test Required"
- Reason chips: "First-time client", "New product line" (rounded, gray background)
- Product list: Clean bullet points with brand logos
- Date picker: Native iOS-style picker with 48-hour constraint
- Timeline visualization: Line connecting patch test date → service date
- Schedule button: Gold, prominent, "Schedule 15-Minute Appointment"

INTERACTION PATTERNS:
- Smooth animations (300ms ease-in-out transitions)
- Haptic feedback on button taps
- Color swatches scale on hover/press (1.1x)
- Loading states: Subtle gold spinner
- Success states: Gold checkmark with fade-in
- Error states: Soft red (#E57373) with helpful message

ICONOGRAPHY:
- Use SF Symbols (iOS native) or Lucide icons
- 24px default size, 32px for primary actions
- Gold (#D4AF37) for active/primary, charcoal (#2C2C2C) for inactive

MOBILE RESPONSIVENESS:
- iPhone: Stack vertically (camera full-width, controls below)
- iPad portrait: Adjust split to 50/50
- iPad landscape: 60/40 split as described

ACCESSIBILITY:
- WCAG AA compliant (4.5:1 contrast minimum)
- Large tap targets (minimum 44x44px)
- VoiceOver optimized labels
- High-contrast mode support

DESIGN DELIVERABLES:
- Figma file with all screens
- Component library (buttons, cards, forms)
- Color palette with hex codes
- Typography scale (heading 1-6, body, caption)
- Spacing system (4px, 8px, 12px, 16px, 20px, 24px, 32px)
- Interactive prototype with transitions

TECHNICAL SPECS:
- Export assets @1x, @2x, @3x for React Native
- SVG icons preferred
- Design for iPad Pro 12.9" (2732 x 2048px) as base
- Safe areas for camera notch + home indicator

MOOD BOARD INSPIRATION:
- Vidal Sassoon salon aesthetic (luxurious, minimalist)
- Apple product pages (clean, spacious)
- Stripe dashboard (professional, data-focused)
- Figma interface (modern, functional)
- Net-a-Porter (high-end retail, elegant)
```

---

## **EXTENDED DESIGN SPECIFICATIONS**

### **COLOR PALETTE**

```
PRIMARY COLORS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deep Charcoal      #2C2C2C  │ Backgrounds, text
Champagne Gold     #D4AF37  │ Primary actions, highlights
Pure White         #FFFFFF  │ Cards, overlays
Soft Cream         #F9F7F4  │ Subtle backgrounds

SECONDARY COLORS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Slate Gray         #64748B  │ Secondary text
Light Gray         #E2E8F0  │ Borders, dividers
Success Green      #10B981  │ Success states
Warning Yellow     #FBBF24  │ Warnings, alerts
Error Red          #E57373  │ Errors, dangers
Info Blue          #3B82F6  │ Information, links

GRADIENT (for premium features):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gold Gradient: linear-gradient(135deg, #D4AF37 0%, #F4E5C3 100%)
Dark Gradient: linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%)
```

### **TYPOGRAPHY SCALE**

```
HEADINGS (Cormorant Garamond - Serif):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1: 48px / 56px line-height / 700 weight
H2: 36px / 44px / 600 weight
H3: 28px / 36px / 600 weight
H4: 24px / 32px / 600 weight
H5: 20px / 28px / 500 weight
H6: 18px / 24px / 500 weight

BODY TEXT (Inter - Sans-Serif):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Large:   18px / 28px / 400 weight
Regular: 16px / 24px / 400 weight
Small:   14px / 20px / 400 weight
Caption: 12px / 16px / 400 weight

SPECIAL CASES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Button Text:  16px / 24px / 600 weight
Formula Code: 14px / 20px / 400 weight / Monospace (SF Mono)
Price Text:   24px / 32px / 700 weight
```

### **SPACING SYSTEM**

```
BASE UNIT: 4px

SCALE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
XXS:  4px   │ Icon padding, tight spacing
XS:   8px   │ Form field padding
SM:   12px  │ Card padding (small)
MD:   16px  │ Default padding
LG:   20px  │ Section padding
XL:   24px  │ Card padding (large)
XXL:  32px  │ Screen padding
XXXL: 48px  │ Hero section spacing
```

### **COMPONENT SPECIFICATIONS**

**BUTTONS:**
```
PRIMARY BUTTON (Gold):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: #D4AF37
Text: #FFFFFF
Padding: 16px 32px
Border Radius: 8px
Height: 48px
Shadow: 0px 4px 12px rgba(212, 175, 55, 0.3)
Hover: background #C49D2F, shadow increases
Active: scale(0.98)

SECONDARY BUTTON (Outline):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: transparent
Border: 2px solid #D4AF37
Text: #D4AF37
Padding: 16px 32px
Border Radius: 8px
Height: 48px
Hover: background rgba(212, 175, 55, 0.1)

ICON BUTTON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Size: 44x44px (minimum tap target)
Border Radius: 8px
Background: transparent
Hover: background #F9F7F4
Active: background #E2E8F0
```

**CARDS:**
```
STANDARD CARD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: #FFFFFF
Border Radius: 12px
Padding: 24px
Shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
Border: 1px solid #E2E8F0

HOVER STATE:
Shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)
Transform: translateY(-2px)
Transition: all 300ms ease-in-out

ELEVATED CARD (for important content):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
Border: 2px solid #D4AF37 (optional accent)
```

**FORMS:**
```
INPUT FIELDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Height: 48px
Padding: 12px 16px
Border: 1px solid #E2E8F0
Border Radius: 8px
Background: #FFFFFF
Font: 16px Inter

FOCUS STATE:
Border: 2px solid #D4AF37
Shadow: 0px 0px 0px 4px rgba(212, 175, 55, 0.1)

ERROR STATE:
Border: 2px solid #E57373
Helper text: #E57373, 12px

CHECKBOXES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Size: 24x24px
Border: 2px solid #D4AF37
Border Radius: 4px
Checkmark: #FFFFFF on #D4AF37 background
```

---

## **SCREEN-BY-SCREEN LAYOUTS**

### **1. HOME DASHBOARD**

```
┌──────────────────────────────────────────────────────┐
│  [Lexxi Pro]            [🔔]  [⚙️]  [Profile Pic]   │
├──────────────────────────────────────────────────────┤
│                                                      │
│        ┌───────────────────────────┐                │
│        │                           │                │
│        │  [+] NEW CONSULTATION     │   ← Large gold │
│        │                           │      button    │
│        └───────────────────────────┘                │
│                                                      │
│  Recent Clients                                     │
│  ┌────────┐  ┌────────┐  ┌────────┐                │
│  │ Sarah  │  │ Emily  │  │ Jessica│                │
│  │ [pic]  │  │ [pic]  │  │ [pic]  │                │
│  │ Jan 10 │  │ Jan 12 │  │ Jan 14 │                │
│  └────────┘  └────────┘  └────────┘                │
│                                                      │
│  Today's Performance                                │
│  ┌──────────┬──────────┬──────────┐                │
│  │    12    │     8    │   67%    │                │
│  │Consults  │ Bookings │Conversion│                │
│  └──────────┴──────────┴──────────┘                │
│                                                      │
│  [📚 Formula Library] [👥 Clients] [📊 Analytics]  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### **2. CONSULTATION SCREEN (iPad Landscape)**

```
┌────────────────────────────────────────────────────────────┐
│  [← Back]  Sarah Martinez - New Consultation  [Save] [⋮]   │
├───────────────────────────────┬────────────────────────────┤
│                               │                            │
│                               │  WARM CARAMEL              │
│                               │  Redken Shades EQ          │
│                               │                            │
│      [LIVE CAMERA FEED]       │  Categories:               │
│                               │  [All] Blonde Brown Red    │
│      AR color overlay         │                            │
│      blends with hair         │  Brand: [Wella ▼]        │
│                               │                            │
│                               │  Colors:                   │
│                               │  ●●●●●●●●●●                │
│                               │  (horizontal scroll)       │
│  [Before] [After] Toggle      │                            │
│                               │  Compare Mode:             │
│  [📸 Capture]                 │  ┌──┬──┐                 │
│                               │  │ 1│ 2│                 │
│                               │  ├──┼──┤                 │
│                               │  │ 3│ 4│                 │
│                               │  └──┴──┘                 │
│                               │                            │
│                               │  [GENERATE FORMULA]        │
│                               │  [Email Preview]           │
└───────────────────────────────┴────────────────────────────┘
```

### **3. FORMULA OUTPUT**

```
┌──────────────────────────────────────────────────────┐
│  COLOR FORMULA - Sarah Martinez                      │
│  Warm Caramel Balayage                              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  🎨 TECHNIQUE: Hand-painted balayage                │
│  ⏱️  PROCESSING: 2.5 hours total                    │
│                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                      │
│  BASE COLOR (Roots):                                │
│  • Redken Shades EQ 06NB ............ 60g          │
│  • Processing Solution 20vol ........ 90ml         │
│  • Ratio: 1:1.5 | Processing: 20 min               │
│                                                      │
│  HIGHLIGHT FORMULA (Mid-lengths):                   │
│  • Wella Blondor Multi-Blonde ....... 30g          │
│  • Welloxon Perfect 30vol ........... 90ml         │
│  • Olaplex No.1 ..................... 7.5ml        │
│  • Ratio: 1:3 + bond | Processing: 25-30 min       │
│                                                      │
│  TONER (Ends):                                      │
│  • Wella Color Touch 9/16 ........... 30g          │
│  • Wella Color Touch 8/3 ............ 15g          │
│  • Emulsion 1.9% .................... 90ml         │
│  • Ratio: 1:2 | Processing: 20 min                 │
│                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                      │
│  COST ANALYSIS:                                     │
│  ┌────────────────────────┬──────────┐             │
│  │ Color Products         │  $42.50  │             │
│  │ Service Fee            │ $165.00  │             │
│  ├────────────────────────┼──────────┤             │
│  │ TOTAL                  │ $207.50  │             │
│  │ PROFIT MARGIN          │    77%   │             │
│  └────────────────────────┴──────────┘             │
│                                                      │
│  MAINTENANCE: Toner refresh in 6-8 weeks           │
│                                                      │
│  Alternatives: [Full Highlights $245] [Single $135]│
│                                                      │
│  [✓ APPROVE & CONTINUE]  [✎ Modify]  [💾 Save]    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## **ANIMATION & INTERACTIONS**

**Key Animations:**
```
PAGE TRANSITIONS:
- Slide in from right (300ms cubic-bezier(0.4, 0, 0.2, 1))
- Fade overlay (200ms ease-in-out)

COLOR SWATCH SELECTION:
- Scale up to 1.15x (200ms)
- Add gold ring (border: 4px solid #D4AF37)
- Haptic feedback (light impact)

FORMULA GENERATION:
- Loading spinner (gold, 2s rotation)
- Formula cards slide up with stagger (100ms delay between cards)
- Success checkmark bounces in (spring animation)

SIGNATURE CAPTURE:
- Canvas fade in (300ms)
- Drawing appears with delay (feel premium)
- Complete button pulses when signature detected
```

---

## **ACCESSIBILITY FEATURES**

```
VOICE OVER:
- All buttons labeled clearly
- Color swatches announce: "Warm Caramel by Redken, selected"
- Formula reads line-by-line with pauses

HIGH CONTRAST MODE:
- Gold becomes darker (#B8960F) for better contrast
- Text increases weight (500 → 600)
- Borders become 2px instead of 1px

LARGE TEXT SUPPORT:
- All text scales with system settings
- Minimum 44x44px tap targets maintained
- Buttons expand vertically as needed
```

---

**USE THIS PROMPT to generate the complete Lexxi Pro UI in v0.dev, Cursor, or any AI design tool. The result will be a luxurious, professional interface that positions Lexxi Pro as the premium tool for high-end salons.**

Ready to generate the actual screens?
