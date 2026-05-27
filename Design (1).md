# Design System Document — v2.0 (Glassmorphism Edition)
**Project:** Cynix Courier Platform — Demo Prototype
**Prepared by:** Cynix Inc.
**Document Version:** 2.0
**Date:** May 2026
**Status:** Demo / Prototype Phase

---

## 1. Design Philosophy

The Cynix Courier Platform v2.0 adopts a **premium glassmorphism aesthetic** — the same visual language used in cutting-edge aviation, fintech, and premium SaaS interfaces. The design must feel like a command centre: immersive, modern, and breathtakingly polished. Every screen should make the prospect think: *"This is the real thing."*

**Three governing principles:**

**1. Depth through glass**
Layers of frosted glass, luminous gradients, and translucency create a visual depth that flat design cannot achieve. Content floats on a living background rather than sitting on a dead white page.

**2. Softness with purpose**
Pill-shaped buttons, heavily rounded cards, and fluid curves signal approachability and modernity — without sacrificing clarity. Every radius is intentional. Every blur is purposeful.

**3. Motion as communication**
Animations are not decorative — they communicate state changes, guide attention, and make the system feel responsive. Every interaction has a reply. Every transition has a story.

---

## 2. Brand Identity — Cynix Inc.

### 2.1 Brand Voice
- **Tone:** Confident, premium, forward-thinking
- **Personality:** A next-generation logistics intelligence platform — not legacy enterprise software
- **Visual Personality:** Aviation control centre meets fintech dashboard — precise but beautiful

### 2.2 Logo Usage
- Wordmark: **CYNIX** in weight 700, letter-spacing 0.15em, rendered in white or gradient text
- On dark glass: white wordmark with subtle glow `text-shadow: 0 0 20px rgba(99,179,237,0.4)`
- On light surfaces: `--color-brand-900`
- Subline: **Courier Platform** in weight 300, letter-spacing 0.08em, `rgba(255,255,255,0.6)`
- Minimum clear space: 1× cap-height on all sides

### 2.3 Brand Tagline
> *"Delivered with Precision."*

Login screen only — rendered in light italic, muted glass style.

---

## 3. Colour System

### 3.1 Background Gradient — The Canvas

The entire app shell renders on a rich gradient background — never a flat colour. This is the foundation that makes glassmorphism work.

```css
/* Primary app background — applied to <body> or root shell div */
--bg-gradient-primary: linear-gradient(
  135deg,
  #0f172a 0%,      /* Deep navy */
  #1e3a5f 25%,     /* Ocean blue */
  #0c4a6e 50%,     /* Midnight teal */
  #164e63 75%,     /* Deep cyan */
  #0f172a 100%     /* Back to navy */
);

/* Alternative: lighter dashboard variant for daytime feel */
--bg-gradient-light: linear-gradient(
  135deg,
  #dbeafe 0%,      /* Ice blue */
  #e0f2fe 30%,     /* Sky */
  #ecfeff 60%,     /* Pale cyan */
  #f0f9ff 100%     /* Almost white */
);

/* Accent orb overlays — radial glows positioned behind glass panels */
--bg-orb-1: radial-gradient(ellipse 600px 400px at 20% 20%, rgba(99,179,237,0.15) 0%, transparent 70%);
--bg-orb-2: radial-gradient(ellipse 500px 500px at 80% 60%, rgba(16,185,129,0.10) 0%, transparent 70%);
--bg-orb-3: radial-gradient(ellipse 400px 300px at 50% 90%, rgba(139,92,246,0.08) 0%, transparent 70%);
```

**Implementation:** Stack `--bg-gradient-primary`, then `--bg-orb-1`, `--bg-orb-2`, `--bg-orb-3` as layered backgrounds on the root. Orbs are `position: fixed` so they stay stationary while content scrolls — the parallax creates subtle depth.

---

### 3.2 Glass Surface System

The glass palette replaces the flat white card system. All surfaces are translucent layers above the gradient background.

```css
/* Glass tiers — ordered by prominence */

/* Tier 1: Primary glass — main content cards, sidebar */
--glass-primary-bg:     rgba(255, 255, 255, 0.10);
--glass-primary-border: rgba(255, 255, 255, 0.18);
--glass-primary-blur:   blur(24px);
--glass-primary-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.15);

/* Tier 2: Elevated glass — modals, dropdowns, tooltips */
--glass-elevated-bg:     rgba(255, 255, 255, 0.16);
--glass-elevated-border: rgba(255, 255, 255, 0.24);
--glass-elevated-blur:   blur(40px);
--glass-elevated-shadow: 0 24px 64px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.20);

/* Tier 3: Subtle glass — table rows, inline highlights */
--glass-subtle-bg:     rgba(255, 255, 255, 0.05);
--glass-subtle-border: rgba(255, 255, 255, 0.08);
--glass-subtle-blur:   blur(8px);

/* Tier 4: Dark glass — sidebar, bottom nav (slightly darker) */
--glass-dark-bg:     rgba(15, 23, 42, 0.60);
--glass-dark-border: rgba(255, 255, 255, 0.10);
--glass-dark-blur:   blur(32px);

/* Tier 5: Input glass — form fields */
--glass-input-bg:     rgba(255, 255, 255, 0.08);
--glass-input-border: rgba(255, 255, 255, 0.20);
--glass-input-focus:  rgba(99, 179, 237, 0.35);
```

**CSS Class Template (copy-paste for any glass card):**
```css
.glass-card {
  background:   var(--glass-primary-bg);
  border:       1px solid var(--glass-primary-border);
  backdrop-filter: var(--glass-primary-blur);
  -webkit-backdrop-filter: var(--glass-primary-blur);
  box-shadow:   var(--glass-primary-shadow);
  border-radius: var(--radius-2xl);
}
```

---

### 3.3 Colour Tokens

```css
/* Brand blues — used for CTAs, active states, accent highlights */
--color-brand-300: #93C5FD;   /* Light accent, icon highlights */
--color-brand-400: #60A5FA;   /* Secondary CTA, link hover */
--color-brand-500: #3B82F6;   /* Gradient start for pill buttons */
--color-brand-600: #2563EB;   /* Primary action colour */
--color-brand-700: #1D4ED8;   /* CTA gradient end */
--color-brand-glow: rgba(37, 99, 235, 0.40);   /* Button glow effect */

/* Text on glass — white-spectrum, never solid black on dark glass */
--text-primary:   rgba(255, 255, 255, 0.95);   /* Headings, key values */
--text-secondary: rgba(255, 255, 255, 0.65);   /* Sub-labels, captions */
--text-muted:     rgba(255, 255, 255, 0.40);   /* Placeholders, disabled */
--text-accent:    #93C5FD;                      /* Highlight text (brand-300) */

/* Text on light glass variant */
--text-dark-primary:   #0F172A;
--text-dark-secondary: #475569;
--text-dark-muted:     #94A3B8;

/* Semantic status — brightened for legibility on dark glass */
--color-status-us:           #818CF8;   /* Indigo (brighter) */
--color-status-us-glass:     rgba(129, 140, 248, 0.15);

--color-status-transit:      #FCD34D;   /* Amber (brighter) */
--color-status-transit-glass: rgba(252, 211, 77, 0.15);

--color-status-arrived:      #38BDF8;   /* Sky (brighter) */
--color-status-arrived-glass: rgba(56, 189, 248, 0.15);

--color-status-ready:        #C084FC;   /* Violet (brighter) */
--color-status-ready-glass:  rgba(192, 132, 252, 0.15);

--color-status-delivery:     #60A5FA;   /* Blue (brighter) */
--color-status-delivery-glass: rgba(96, 165, 250, 0.15);

--color-status-delivered:    #34D399;   /* Emerald (brighter) */
--color-status-delivered-glass: rgba(52, 211, 153, 0.15);

--color-status-failed:       #F87171;   /* Red (brighter) */
--color-status-failed-glass: rgba(248, 113, 113, 0.15);

--color-duty-flag:           #FB923C;   /* Orange */
--color-duty-flag-glass:     rgba(251, 146, 60, 0.15);
```

---

## 4. Typography

### 4.1 Font Stack
```css
/* Primary — Inter (same as v1, but rendered on glass = premium feel) */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* Expanded weight range for glass aesthetic */
/* Load weights: 300, 400, 500, 600, 700 */
```

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Weight 300 (light) is added for subheadings on dark glass where lightness reads as elegance.

### 4.2 Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Glass Usage |
|---|---|---|---|---|---|
| `text-display` | 32px | 40px | 700 | -0.02em | Login hero, empty states |
| `text-h1` | 24px | 32px | 700 | -0.01em | Dashboard page title |
| `text-h2` | 18px | 26px | 600 | 0 | Glass card headings |
| `text-h3` | 15px | 22px | 500 | 0 | Sub-section labels |
| `text-body-lg` | 15px | 24px | 400 | 0 | Primary body on glass |
| `text-body` | 14px | 22px | 400 | 0 | Table cells, form values |
| `text-body-sm` | 13px | 20px | 400 | 0 | Descriptions, hints |
| `text-caption` | 12px | 18px | 400 | 0.01em | Timestamps, footnotes |
| `text-label` | 11px | 16px | 600 | 0.08em (uppercase) | Glass card section labels |
| `text-kpi` | 36px | 40px | 700 | -0.03em | KPI numbers (large, bold) |
| `text-mono` | 13px | 20px | 400 | 0.04em | Tracking IDs, codes |

### 4.3 Tracking Number Styling (Glass Edition)
```css
.tracking-number {
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--color-brand-300);
  background: rgba(99, 179, 237, 0.12);
  border: 1px solid rgba(99, 179, 237, 0.25);
  padding: 3px 10px;
  border-radius: 999px;   /* Full pill */
  backdrop-filter: blur(8px);
}
```

### 4.4 Gradient Text (Hero Use Only)
For the CYNIX wordmark and key KPI values:
```css
.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #93C5FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 5. Spacing System

8-point grid — unchanged from v1. Glass surfaces need generous padding for breathing room.

```
4px   — xs  — icon gap, chip internal
8px   — sm  — tight element padding
12px  — md  — compact glass cell
16px  — lg  — standard glass card padding
20px  — lg+ — glass card inner breathing room
24px  — xl  — glass card padding (preferred)
32px  — 2xl — between glass cards
48px  — 3xl — section divisions
64px  — 4xl — hero / login centred area
```

**Glass cards prefer `p-6` (24px) as minimum internal padding.** Less looks cramped against the frosted border.

---

## 6. Border Radius System — "Soft Everything"

This is the most visually defining change from v1. Every element is softer.

```css
/* Radius tokens */
--radius-sm:   8px;    /* Small badges, inner elements */
--radius-md:   12px;   /* Inputs, small chips */
--radius-lg:   16px;   /* Standard glass cards */
--radius-xl:   20px;   /* Large panels, sidebar */
--radius-2xl:  24px;   /* Main dashboard cards */
--radius-3xl:  32px;   /* Modal overlays, login card */
--radius-pill: 999px;  /* All buttons, status chips, search inputs */

/* Usage map */
.btn-*         → border-radius: var(--radius-pill)
.status-chip   → border-radius: var(--radius-pill)
.search-input  → border-radius: var(--radius-pill)
.glass-card    → border-radius: var(--radius-2xl)
.kpi-card      → border-radius: var(--radius-xl)
.modal         → border-radius: var(--radius-3xl)
.input-field   → border-radius: var(--radius-md)
.nav-item      → border-radius: var(--radius-lg)
.table-row     → border-radius: var(--radius-sm)   /* on hover */
.sidebar       → border-radius: 0 var(--radius-2xl) var(--radius-2xl) 0
```

---

## 7. Shadow & Glow System

Shadows on glass carry luminous glows, not just darkness.

```css
/* Card shadows — dark + inner highlight */
--shadow-glass-sm:  0 4px 16px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.12);
--shadow-glass-md:  0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
--shadow-glass-lg:  0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.20);
--shadow-glass-xl:  0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25);

/* Button glow — appears on hover, matches button colour */
--shadow-btn-blue:    0 0 20px rgba(37, 99, 235, 0.50), 0 4px 12px rgba(0,0,0,0.25);
--shadow-btn-emerald: 0 0 20px rgba(52, 211, 153, 0.40), 0 4px 12px rgba(0,0,0,0.25);
--shadow-btn-red:     0 0 20px rgba(248, 113, 113, 0.40), 0 4px 12px rgba(0,0,0,0.25);

/* Status glow — used on dot indicators */
--glow-delivered:  0 0 8px rgba(52, 211, 153, 0.70);
--glow-transit:    0 0 8px rgba(252, 211, 77, 0.70);
--glow-failed:     0 0 8px rgba(248, 113, 113, 0.70);
--glow-ready:      0 0 8px rgba(192, 132, 252, 0.70);
```

---

## 8. Component Library

### 8.1 Pill Button — Primary (CTA)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: white;
  background: linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%);
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow: 0 4px 15px var(--color-brand-glow);
  transition: all 220ms cubic-bezier(0.34, 1.56, 0.64, 1);  /* Spring easing */
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Shimmer overlay — moves on hover */
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 400ms ease;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-btn-blue);
}

.btn-primary:hover::before {
  transform: translateX(100%);   /* Shimmer sweep */
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px var(--color-brand-glow);
}
```

### 8.2 Pill Button — Secondary (Ghost Glass)

```css
.btn-secondary {
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--glass-subtle-bg);
  border: 1px solid var(--glass-primary-border);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-glass-sm);
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.30);
  transform: translateY(-1px);
}
```

### 8.3 Pill Button — Danger

```css
.btn-danger {
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  color: #FCA5A5;
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.30);
  backdrop-filter: blur(12px);
  transition: all 200ms ease;
}

.btn-danger:hover {
  background: rgba(248, 113, 113, 0.22);
  box-shadow: var(--shadow-btn-red);
  transform: translateY(-1px);
}
```

### 8.4 Icon Pill Button (Navigation / Action)

```css
/* Square-ish pill used in the sidebar nav and action icon buttons */
.btn-icon-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: var(--radius-lg);
  transition: all 180ms ease;
  cursor: pointer;
}

.btn-icon-pill.active {
  background: linear-gradient(135deg, rgba(37,99,235,0.30) 0%, rgba(37,99,235,0.15) 100%);
  border: 1px solid rgba(37, 99, 235, 0.40);
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.20), inset 0 1px 0 rgba(255,255,255,0.10);
  color: white;
}

.btn-icon-pill:hover:not(.active) {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
}
```

---

### 8.5 Glass KPI Card

```css
.kpi-card {
  background: var(--glass-primary-bg);
  border: 1px solid var(--glass-primary-border);
  backdrop-filter: var(--glass-primary-blur);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-glass-md);
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 250ms ease,
              border-color 250ms ease;
  position: relative;
  overflow: hidden;
}

/* Colour accent strip — top-left radial glow per card */
.kpi-card::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--kpi-accent-color, rgba(37, 99, 235, 0.25));
  filter: blur(30px);
  pointer-events: none;
}

.kpi-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--shadow-glass-lg);
  border-color: rgba(255, 255, 255, 0.28);
}
```

**KPI Card Inner Layout:**
```
┌────────────────────────────────────────────┐  ← glass-card radius-xl
│  [Icon pill — 36×36 glass bg, brand glow]  │
│                                            │
│  142                                       │  ← text-kpi (36px, 700, white)
│  Packages In Transit                       │  ← text-body-sm (text-secondary)
│                                            │
│  ↑ 12% from yesterday                     │  ← text-caption (emerald-400)
└────────────────────────────────────────────┘

Icon pill: width:36px height:36px, border-radius:10px,
           background: linear-gradient(135deg, brand-500/30%, brand-700/30%),
           border: 1px solid brand-400/30%,
           box-shadow: 0 0 12px brand-glow
```

---

### 8.6 Glass Status Chip (Pill)

```css
.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  border: 1px solid currentColor;
  border-color: rgba(currentColor, 0.30);  /* approximated per status */
  transition: all 300ms ease;
}

/* Status dot — glowing */
.status-chip::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
  flex-shrink: 0;
}

/* Per-status variants */
.chip-delivered  { color: #34D399; background: rgba(52,211,153,0.12);  border-color: rgba(52,211,153,0.30); }
.chip-transit    { color: #FCD34D; background: rgba(252,211,77,0.12);  border-color: rgba(252,211,77,0.30); }
.chip-ready      { color: #C084FC; background: rgba(192,132,252,0.12); border-color: rgba(192,132,252,0.30); }
.chip-arrived    { color: #38BDF8; background: rgba(56,189,248,0.12);  border-color: rgba(56,189,248,0.30); }
.chip-delivery   { color: #60A5FA; background: rgba(96,165,250,0.12);  border-color: rgba(96,165,250,0.30); }
.chip-failed     { color: #F87171; background: rgba(248,113,113,0.12); border-color: rgba(248,113,113,0.30); }
.chip-us         { color: #818CF8; background: rgba(129,140,248,0.12); border-color: rgba(129,140,248,0.30); }
.chip-duty       { color: #FB923C; background: rgba(251,146,60,0.12);  border-color: rgba(251,146,60,0.30); }
```

---

### 8.7 Glass Search Input (Pill)

```css
.search-pill {
  width: 100%;
  padding: 12px 20px 12px 48px;   /* left padding for search icon */
  border-radius: var(--radius-pill);
  background: var(--glass-input-bg);
  border: 1px solid var(--glass-input-border);
  backdrop-filter: blur(16px);
  color: var(--text-primary);
  font-size: 14px;
  transition: all 200ms ease;
  outline: none;
}

.search-pill::placeholder {
  color: var(--text-muted);
}

.search-pill:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(99, 179, 237, 0.50);
  box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.15);
}
```

---

### 8.8 Glass Form Input

```css
.glass-input {
  width: 100%;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  background: var(--glass-input-bg);
  border: 1px solid var(--glass-input-border);
  backdrop-filter: blur(16px);
  color: var(--text-primary);
  font-size: 14px;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.glass-input:focus {
  border-color: rgba(99, 179, 237, 0.60);
  box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.15),
              inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Label — floating glass style */
.glass-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
```

---

### 8.9 Glass Data Table

The table is replaced by a **glass list panel** — each row is a softly bordered glass strip.

```css
.glass-table-row {
  display: grid;
  grid-template-columns: [tracking] 130px [customer] 1fr [weight] 80px [status] 160px [invoice] 90px [actions] 60px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 150ms ease, border-radius 150ms ease;
  cursor: pointer;
}

.glass-table-row:hover {
  background: rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
}

.glass-table-header {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}
```

---

### 8.10 Glass Modal

```css
/* Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.60);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 50;
  animation: fadeIn 200ms ease;
}

/* Panel */
.modal-panel {
  background: rgba(15, 23, 42, 0.80);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-glass-xl);
  padding: 32px;
  animation: modalIn 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1.00) translateY(0); }
}
```

---

### 8.11 Timeline Component (Glass Edition)

```css
.timeline-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  position: relative;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
  position: relative;
}

/* Active dot pulses */
.timeline-dot.active {
  background: var(--color-status-delivered);
  box-shadow: var(--glow-delivered);
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { box-shadow: 0 0 6px currentColor, 0 0 0 0 currentColor; }
  50%       { box-shadow: 0 0 10px currentColor, 0 0 0 6px rgba(52,211,153,0); }
}

.timeline-line {
  position: absolute;
  left: 5px;
  top: 16px;
  bottom: -16px;
  width: 2px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.20), rgba(255,255,255,0.05));
}

.timeline-dot.future {
  background: rgba(255, 255, 255, 0.15);
  border: 1px dashed rgba(255, 255, 255, 0.25);
}
```

---

### 8.12 Notification Preview Modal (Glass)

```css
/* WhatsApp tab — green-tinted glass */
.notif-whatsapp-bubble {
  background: rgba(37, 211, 102, 0.08);
  border: 1px solid rgba(37, 211, 102, 0.20);
  border-radius: 0 var(--radius-lg) var(--radius-lg) var(--radius-lg);
  padding: 16px 20px;
  backdrop-filter: blur(12px);
}

/* Email tab — cool glass */
.notif-email-body {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  padding: 20px;
}
```

---

### 8.13 Scan View Component (Glass)

```css
.scan-viewfinder {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: var(--radius-2xl);
  background: rgba(0, 0, 0, 0.50);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

/* Corner brackets — animated brand-coloured corners */
.scan-corner {
  position: absolute;
  width: 32px;
  height: 32px;
  border-color: var(--color-brand-400);
  border-style: solid;
  opacity: 0.8;
  animation: cornerPulse 1.5s ease-in-out infinite;
}

/* Scanning sweep line */
.scan-line {
  position: absolute;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-brand-400), transparent);
  box-shadow: 0 0 12px var(--color-brand-400), 0 0 24px rgba(96,165,250,0.40);
  animation: scanSweep 2.5s ease-in-out infinite;
}

@keyframes scanSweep {
  0%   { top: 10%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}

/* Scan success flash */
.scan-success {
  position: absolute;
  inset: 0;
  background: rgba(52, 211, 153, 0.25);
  border-radius: inherit;
  animation: successFlash 500ms ease forwards;
}

@keyframes successFlash {
  0%   { opacity: 0; }
  30%  { opacity: 1; }
  100% { opacity: 0; }
}
```

---

## 9. Layout Architecture

### 9.1 App Shell — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│  BACKGROUND: gradient + 3 orb layers (fixed, behind everything)     │
│                                                                     │
│  ┌──────────────────────┐  ┌──────────────────────────────────────┐ │
│  │  GLASS SIDEBAR       │  │  MAIN CONTENT (scrollable)           │ │
│  │  (dark glass tier 4) │  │                                      │ │
│  │  width: 240px        │  │  ┌──────────────────────────────┐   │ │
│  │  radius: 0 2xl 2xl 0 │  │  │ Glass page header bar        │   │ │
│  │  blur: 32px          │  │  │ (glass tier 1, radius-xl)    │   │ │
│  │                      │  │  └──────────────────────────────┘   │ │
│  │  [CYNIX gradient     │  │                                      │ │
│  │   wordmark]          │  │  ┌──────────────────────────────┐   │ │
│  │                      │  │  │  KPI cards row               │   │ │
│  │  [icon-pill nav]     │  │  │  (4 × glass-card radius-xl)  │   │ │
│  │  ● Dashboard         │  │  └──────────────────────────────┘   │ │
│  │  ○ Packages          │  │                                      │ │
│  │  ○ Customers         │  │  ┌──────────────────────────────┐   │ │
│  │  ○ Invoices          │  │  │  Chart glass panels          │   │ │
│  │  ○ Manifest          │  │  │  (glass tier 1, radius-2xl)  │   │ │
│  │                      │  │  └──────────────────────────────┘   │ │
│  │  ─── (glass divider) │  │                                      │ │
│  │  [Avatar glass pill] │  │  ┌──────────────────────────────┐   │ │
│  │  [Role badge pill]   │  │  │  Package list glass panel    │   │ │
│  │  [Logout btn-ghost]  │  │  └──────────────────────────────┘   │ │
│  └──────────────────────┘  └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Sidebar details:**
- `background: var(--glass-dark-bg)`
- `backdrop-filter: blur(32px)`
- `border-right: 1px solid rgba(255,255,255,0.08)`
- `border-radius: 0 24px 24px 0`
- Nav items use `.btn-icon-pill` — active state glows

### 9.2 App Shell — Mobile

```
┌──────────────────────────────────────┐
│  GLASS TOP NAR (blur:20px, h:60px)   │  ← position: sticky, glass-dark
│  [≡]  CYNIX            [🔔]  [👤]   │
├──────────────────────────────────────┤
│                                      │
│   Scrollable content                 │
│   (glass cards on gradient bg)       │
│                                      │
├──────────────────────────────────────┤
│  GLASS BOTTOM TAB BAR (blur:20px)   │  ← position: fixed, glass-dark
│  [🏠]    [📦]    [📄]    [👤]       │
│  Home   Pkgs   Invoices  Account    │
└──────────────────────────────────────┘
```

Bottom tab bar: `background: rgba(15,23,42,0.80)`, `backdrop-filter: blur(24px)`, `border-top: 1px solid rgba(255,255,255,0.08)`.

Active tab icon glows in brand-400 with `filter: drop-shadow(0 0 6px #60A5FA)`.

### 9.3 Driver View — Glass Mobile

```
┌──────────────────────────────────────┐
│  GLASS NAR — Today's Deliveries     │
│  Ray Thompson · 26 May              │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │  Progress pill                 │  │  ← glass pill, progress bar inside
│  │  ████████░░░░  3 / 8          │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │  ← glass-card radius-2xl
│  │  📦  CYN-0142                  │  │
│  │  Trisha Williams               │  │
│  │  14 Palm Blvd, Nassau          │  │
│  │  1 pkg · 1.2 kg               │  │
│  │                                │  │
│  │  [Navigate →]   [Scan & Del→]  │  │  ← pill buttons
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │  ← glass-card
│  │  📦  CYN-0140  ...            │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │  ← sticky bottom pill CTA
│  │  [ 📷  SCAN NEXT PACKAGE ]    │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 10. Screen-by-Screen Blueprints

### Screen 1 — Login

```
┌──────────────────────────────────────────────────────────────────┐
│  BACKGROUND: full-screen gradient + orb glows                    │
│                                                                  │
│                     (vertical centre)                            │
│                                                                  │
│       ┌────────────────────────────────────┐                     │
│       │  GLASS CARD (radius-3xl, blur:40px │                     │
│       │  shadow-glass-xl, w:400px)         │                     │
│       │                                    │                     │
│       │  CYNIX  [gradient text]            │                     │
│       │  Courier Platform [weight 300]     │                     │
│       │                                    │                     │
│       │  [glass-input: Email]              │                     │
│       │  [glass-input: Password]           │                     │
│       │                                    │                     │
│       │  [btn-primary pill: Sign In →]     │                     │
│       │                                    │                     │
│       │  ── Demo Credentials ─────────     │                     │
│       │  admin / staff / customer / driver │  ← glass pill tags  │
│       │                                    │                     │
│       │  "Delivered with Precision."       │  ← caption, muted   │
│       └────────────────────────────────────┘                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Credential pills: clickable, auto-fill email on tap — each a mini `btn-secondary` pill.

### Screen 2 — Admin Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  Sidebar (glass-dark) │  Content area (gradient bg)              │
│                       │                                          │
│                       │  Good morning, Marcus  [May 26]          │
│                       │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│                       │  │ KPI  │ │ KPI  │ │ KPI  │ │ KPI  │  │  ← 4 glass cards
│                       │  │ 142  │ │  38  │ │$4820 │ │  12  │  │
│                       │  └──────┘ └──────┘ └──────┘ └──────┘  │
│                       │                                          │
│                       │  ┌───────────────────┐ ┌─────────────┐ │
│                       │  │ Revenue AreaChart  │ │ Pipeline    │ │  ← 2 glass panels
│                       │  │ (glass tier 1)     │ │ BarChart    │ │
│                       │  └───────────────────┘ └─────────────┘ │
│                       │                                          │
│                       │  ┌─────────────────────────────────┐   │
│                       │  │  Packages [Search pill] [Filter▾]│   │
│                       │  │  ─── glass table rows ──────     │   │
│                       │  │  CYN-0142 · Williams · [●Ready] │   │
│                       │  └─────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

Charts inside glass panels: `CartesianGrid` stroke `rgba(255,255,255,0.08)`, line/bar fill with brand gradient, tooltip styled as glass-elevated.

### Screen 3 — Customer Portal

```
┌──────────────────────────────────────────────────────────────────┐
│  Sidebar │  Welcome back, Trisha                                  │
│          │  Mailbox: [CYN-00087 — tracking-number pill]           │
│          │                                                        │
│          │  ┌───────────────┐ ┌───────────────┐ ┌─────────────┐ │
│          │  │ 3 Active      │ │ 1 Ready       │ │ $36.50 Due  │ │  ← glass cards
│          │  └───────────────┘ └───────────────┘ └─────────────┘ │
│          │                                                        │
│          │  My Packages                    [Search pill]          │
│          │  ┌──────────────────────────────────────────────────┐ │
│          │  │ glass-card row: CYN-0142                         │ │
│          │  │ Nike Sneakers · 1.2kg · [●Ready chip]            │ │
│          │  │ [⚑ Duty pill]              $24.00  [Pay Now →]   │ │
│          │  ├──────────────────────────────────────────────────┤ │
│          │  │ glass-card row: CYN-0139                         │ │
│          │  │ Laptop Bag · 0.8kg · [●Transit chip]             │ │
│          │  │                          Est. Fri 30 May         │ │
│          │  └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Screen 4 — Package Detail + Timeline

```
┌──────────────────────────────────────────────────────────────────┐
│  Sidebar │  ← Back    CYN-0142             [● Ready chip]         │
│          │                                                        │
│          │  ┌──────────────────────┐  ┌───────────────────────┐ │
│          │  │ GLASS PANEL          │  │ STATUS TIMELINE        │ │
│          │  │ Package Details      │  │                        │ │
│          │  │                      │  │ ●̲ Ready (active pulse) │ │
│          │  │ Nike Sneakers        │  │ │  11 May · 16:00      │ │
│          │  │ 1.2 kg               │  │ ●  Arrived Bahamas     │ │
│          │  │ 30×20×15 cm          │  │ │  11 May · 09:30      │ │
│          │  │ Declared: $120       │  │ ○  In Transit          │ │
│          │  │ [⚑ Duty pill]        │  │ ○  Received US         │ │
│          │  └──────────────────────┘  └───────────────────────┘ │
│          │                                                        │
│          │  ┌──────────────────────────────────────────────────┐ │
│          │  │ INVOICE glass panel                               │ │
│          │  │ Weight fee (1.2kg × $8)    $9.60                 │ │
│          │  │ Service fee               $14.40                 │ │
│          │  │ Total Due                 $24.00                 │ │
│          │  │                      [Pay Invoice →] (btn-primary)│ │
│          │  └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Screen 5 — Warehouse Intake

```
┌──────────────────────────────────────────────────┐
│  Glass top bar: Warehouse Intake · Devon Clarke  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  GLASS SCAN CARD (radius-2xl)            │   │
│  │                                          │   │
│  │     ┌──────────────────────────────┐    │   │
│  │     │  SCAN VIEWFINDER (radius-2xl)│    │   │
│  │     │  [sweeping scan line]        │    │   │
│  │     │  [glowing corner brackets]   │    │   │
│  │     └──────────────────────────────┘    │   │
│  │                                          │   │
│  │     ── or enter manually ──              │   │
│  │     [Search pill input + Find btn]       │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  PACKAGE DETAILS (glass card)            │   │
│  │  [glass-input: Customer Mailbox]         │   │
│  │  [glass-input: Weight kg]                │   │
│  │  [glass-input: Dimensions]               │   │
│  │  [glass-input: Declared Value]           │   │
│  │  [Toggle glass pill: Flag as Dutiable]   │   │
│  │                                          │   │
│  │  [btn-primary: Save & Generate QR Label] │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### Screen 6 — QR Label

```
┌──────────────────────────────────────┐
│  ┌──────────────────────────────┐   │  ← glass card (print-safe white inside)
│  │  CYNIX COURIER PLATFORM      │   │
│  │                              │   │
│  │  [QR Code SVG — 200×200]     │   │
│  │                              │   │
│  │  CYN-0143  [tracking pill]   │   │
│  │  T. Williams · CYN-00087     │   │
│  │  1.2 kg · 30×20×15 cm       │   │
│  │  Received: 26 May 2026       │   │
│  └──────────────────────────────┘   │
│                                      │
│  [🖨 Print Label]  [+ New Intake]   │  ← pill buttons
└──────────────────────────────────────┘
```

### Screen 7 — Driver Manifest (Mobile)

```
┌────────────────────────────────┐
│  Glass top: Deliveries         │
│  Ray · 26 May                  │
│  [Progress glass pill: 3/8]    │
├────────────────────────────────┤
│  ┌──────────────────────────┐  │  ← glass-card radius-2xl
│  │  CYN-0142                │  │
│  │  Trisha Williams         │  │
│  │  14 Palm Blvd, Nassau    │  │
│  │  1 pkg · 1.2 kg          │  │
│  │                          │  │
│  │  [Navigate]  [Deliver]   │  │  ← pill buttons
│  └──────────────────────────┘  │
│  ...more delivery cards...     │
└────────────────────────────────┘
```

### Screen 8 — Public Tracking (No Login)

```
┌──────────────────────────────────────────────────────────────────┐
│  BACKGROUND: lighter gradient variant                            │
│                                                                  │
│  CYNIX [top minimal glass bar]                                   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Track Your Package                                        │  │
│  │  [Search pill input: Enter tracking number]  [Track →]    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  RESULT glass card (radius-2xl)                           │  │
│  │  CYN-0142 · Nike Sneakers · 1.2 kg                       │  │
│  │  [● Ready for Collection chip]                            │  │
│  │                                                           │  │
│  │  TIMELINE (glass glass variant)                           │  │
│  │  ●̲ Ready for Collection    11 May · 16:00                │  │
│  │  ●  Arrived Bahamas        11 May · 09:30                │  │
│  │  ●  In Transit             09 May · 22:00                │  │
│  │  ●  Received US            07 May · 14:15                │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 11. Responsive Breakpoints

```css
screens: {
  'sm':  '480px',
  'md':  '768px',
  'lg':  '1024px',
  'xl':  '1280px',
  '2xl': '1440px',
}
```

| Breakpoint | Glass Adaptation |
|---|---|
| < 480px | Full-bleed glass cards (no margin). Bottom glass tab nav. Stacked 2×2 KPI grid. Single column. |
| 480–768px | 12px page margins. 2-col KPI grid. Glass cards full width. |
| 768–1024px | Sidebar hidden → glass top nav + hamburger sheet. 4-col KPI row. |
| 1024px+ | Glass sidebar visible (240px, rounded-r-2xl). Full layout. Split panels on detail. |

**Driver view:** Always `max-w-sm mx-auto` — mobile glass regardless of viewport.

---

## 12. Motion & Animation System

This is where the glass aesthetic comes alive. All animations use `cubic-bezier` easing — never linear.

```css
/* Easing tokens */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* Buttons, cards — soft overshoot */
--ease-smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Transitions — smooth decel */
--ease-sharp:    cubic-bezier(0.55, 0.06, 0.68, 0.19); /* Dismiss, exit */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);    /* Material standard — general */
```

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Page transition | Fade + slide up (opacity 0→1, translateY 16→0) | 280ms | ease-smooth |
| Glass card mount | Fade + scale (0.96→1.00) + translateY (12→0) | 320ms | ease-spring |
| KPI card hover | translateY(-4px) + scale(1.01) + glow shadow | 250ms | ease-spring |
| Pill button hover | translateY(-2px) + scale(1.02) + shimmer sweep | 220ms | ease-spring |
| Button press | scale(0.98) + shadow reduce | 100ms | ease-sharp |
| Modal open | scale(0.92→1.00) + translateY(20→0) + fade | 300ms | ease-spring |
| Modal close | scale(1.00→0.96) + translateY(0→12) + fade | 200ms | ease-sharp |
| Status chip update | Glow flash + text/bg crossfade | 400ms | ease-standard |
| Scan line sweep | translateY (top→bottom, loop) | 2500ms | ease-in-out ∞ |
| Timeline dot pulse | box-shadow expand → fade (loop) | 2000ms | ease-in-out ∞ |
| Toast slide in | translateX(120→0) + fade | 320ms | ease-spring |
| Toast dismiss | translateX(0→120) + fade | 200ms | ease-sharp |
| Nav item active | Background glow + border fade in | 200ms | ease-smooth |
| Bottom tab switch | Icon scale(1→1.15→1) + glow appear | 250ms | ease-spring |
| Table row hover | Background fade in (rgba 0→0.06) | 120ms | ease-standard |
| Accordion expand | height + opacity (0→auto) | 280ms | ease-smooth |
| Orb background | Drift slowly (translateX ±20px, loop) | 12000ms | ease-in-out ∞ |

**Staggered card entrance:** When a dashboard loads, glass cards animate in with 60ms stagger between each:
```css
.kpi-card:nth-child(1) { animation-delay: 0ms; }
.kpi-card:nth-child(2) { animation-delay: 60ms; }
.kpi-card:nth-child(3) { animation-delay: 120ms; }
.kpi-card:nth-child(4) { animation-delay: 180ms; }

@keyframes cardEnter {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1.00); }
}
```

**Rule:** Animations must respect `prefers-reduced-motion`. Wrap all animations:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Iconography

All icons from **Lucide React** — unchanged library, new styling rules for glass.

- Icon size: 18px (nav items), 20px (buttons), 22px (KPI cards), 28px (empty states)
- On dark glass: icons render `rgba(255,255,255,0.75)` default, `white` on active/hover
- Active nav icons: `color: white; filter: drop-shadow(0 0 6px rgba(96,165,250,0.60))`
- KPI card icons: wrapped in a 36×36 glass-tinted pill with brand colour background
- Button icons: always left of label, `gap: 8px`

---

## 14. Empty States (Glass Edition)

```
┌────────────────────────────────────────┐  ← glass-card radius-2xl
│                                        │
│   [Icon, 40px, rgba(255,255,255,0.25)] │
│                                        │
│   No packages found                    │  ← text-h3, text-secondary
│   Adjust filters or scan a package     │  ← text-body-sm, text-muted
│   to get started.                      │
│                                        │
│   [+ Scan New Package]                 │  ← btn-secondary pill
│                                        │
└────────────────────────────────────────┘
```

---

## 15. Recharts Glass Theming

```jsx
// Shared chart props for all Recharts components
const glassChartConfig = {
  style: { background: 'transparent' },
};

// CartesianGrid
<CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

// Axis ticks
<XAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }} axisLine={false} tickLine={false} />
<YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }} axisLine={false} tickLine={false} />

// Tooltip — glass styled
<Tooltip
  contentStyle={{
    background: 'rgba(15,23,42,0.85)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
    color: 'rgba(255,255,255,0.90)',
  }}
  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
/>

// Area fill — brand gradient with transparency
<defs>
  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#3B82F6" stopOpacity={0.5} />
    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
  </linearGradient>
</defs>
<Area fill="url(#revenueGradient)" stroke="#60A5FA" strokeWidth={2} />
```

---

## 16. Tailwind Configuration Additions

```js
// tailwind.config.js additions for glass system
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        '2xl': '40px',
      },
      borderRadius: {
        'pill': '999px',
        '2xl':  '24px',
        '3xl':  '32px',
        '4xl':  '40px',
      },
      animation: {
        'card-enter':   'cardEnter 320ms cubic-bezier(0.34,1.56,0.64,1) forwards',
        'scan-sweep':   'scanSweep 2500ms ease-in-out infinite',
        'dot-pulse':    'dotPulse 2000ms ease-in-out infinite',
        'orb-drift':    'orbDrift 12000ms ease-in-out infinite alternate',
        'shimmer':      'shimmer 400ms ease forwards',
        'toast-in':     'toastIn 320ms cubic-bezier(0.34,1.56,0.64,1)',
        'modal-in':     'modalIn 300ms cubic-bezier(0.34,1.56,0.64,1)',
      },
      colors: {
        brand: {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        glass: {
          white10: 'rgba(255,255,255,0.10)',
          white16: 'rgba(255,255,255,0.16)',
          white20: 'rgba(255,255,255,0.20)',
          dark60:  'rgba(15,23,42,0.60)',
          dark80:  'rgba(15,23,42,0.80)',
        },
      },
    },
  },
  plugins: [],
};
```

---

## 17. Do / Do Not — Glass UI Guardrails

| ✅ DO | ❌ DO NOT |
|---|---|
| Use `backdrop-filter: blur()` on all glass surfaces | Use opaque white/grey backgrounds anywhere in the app shell |
| Use `border-radius: 999px` on all buttons and chips | Use square or mildly-rounded (4px) buttons |
| Apply `inset 0 1px 0 rgba(255,255,255,0.15)` to glass shadows | Use flat drop-shadows with no inner highlight |
| Use `rgba(255,255,255,0.10–0.16)` for glass card backgrounds | Use solid colours for card backgrounds |
| Animate with `transform` and `opacity` only | Animate `width`, `height`, `padding`, or `border-radius` |
| Use spring easing for interactive elements | Use `linear` or generic `ease` for hover states |
| Apply staggered delays on page mount animations | Animate all cards simultaneously |
| Keep orb background layers `position: fixed` | Scroll background layers with content |
| Ensure WCAG AA contrast on all glass text (test with DevTools) | Assume light text on frosted glass is automatically readable |
| Use gradient text (`-webkit-text-fill-color: transparent`) for CYNIX wordmark only | Apply gradient text to body copy or labels |
| Include `prefers-reduced-motion` override in global CSS | Ship animations without accessibility override |
| Test `backdrop-filter` on iOS Safari (requires `-webkit-` prefix) | Omit `-webkit-backdrop-filter` |

---

## 18. Accessibility on Glass

Glass morphism introduces contrast risks. Mandatory rules:

- **Minimum contrast ratio:** 4.5:1 for all body text on glass backgrounds (WCAG AA)
- **Test tool:** Chrome DevTools Accessibility panel or [contrast.tools](https://contrast.tools)
- **Safe text colours on dark glass:** `rgba(255,255,255,0.95)` on `rgba(0,0,0,0.50)` glass = ≈ 8:1 ✅
- **Status chips:** All chip text must meet 4.5:1 against their glass background — use the brightened status colours from Section 3.3
- **Focus rings:** All interactive elements must show a visible focus ring: `outline: 2px solid rgba(96,165,250,0.80); outline-offset: 3px;`
- **Keyboard navigation:** Glass nav items and pill buttons must have `:focus-visible` styles as prominent as hover states

---

*Document prepared by Cynix Inc. — Confidential & Proprietary*
*Design System v2.0 — Glassmorphism Edition. Supersedes v1.0 for all prototype development.*
*This document is forward-compatible: the glass system can be retained in production or replaced with a lighter theme post-contract, with zero structural frontend changes required.*
