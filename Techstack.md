# Technical Stack Document
**Project:** Cynix Courier Platform — Demo Prototype
**Prepared by:** Cynix Inc.
**Document Version:** 1.0
**Date:** May 2026
**Status:** Demo / Prototype Phase

---

## 1. Architecture Overview

The demo prototype is a **100% client-side Single Page Application (SPA)**. There is no backend server, no database, and no external API calls required to run it. All data is seeded in-memory at app load time, and all state is managed within the React component tree — optionally persisted to `localStorage` for session continuity during the demo.

```
┌─────────────────────────────────────────────────────┐
│                   BROWSER (Client)                  │
│                                                     │
│  ┌─────────────┐   ┌────────────┐  ┌─────────────┐ │
│  │  React SPA  │   │  Mock Data │  │  localStorage│ │
│  │  (Vite)     │◄──│  Seed Layer│  │  (session)  │ │
│  └──────┬──────┘   └────────────┘  └─────────────┘ │
│         │                                           │
│  ┌──────▼──────────────────────────────────────┐   │
│  │           React Router v6                   │   │
│  │  /login  /admin  /customer  /staff  /driver │   │
│  └──────┬──────────────────────────────────────┘   │
│         │                                           │
│  ┌──────▼────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Tailwind CSS │  │ Recharts │  │  qrcode.react│ │
│  │  (styling)    │  │(charts)  │  │  (QR gen)   │ │
│  └───────────────┘  └──────────┘  └─────────────┘ │
│                                                     │
│  ┌───────────────┐  ┌──────────────────────────┐   │
│  │  html5-qrcode │  │  Lucide React (icons)    │   │
│  │  (scanning)   │  │                          │   │
│  └───────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Key Principle:** Every technology choice below is free, open-source, production-proven, and requires zero paid accounts or API keys to run.

---

## 2. Core Framework

### 2.1 React 18
| Property | Detail |
|---|---|
| **Library** | React 18 |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Industry-standard UI library. Component architecture maps perfectly to the 4 role-based views. Hooks (useState, useContext, useReducer) handle all demo state management cleanly. Massive ecosystem of free supporting libraries. |
| **Alternatives Rejected** | Vue.js (smaller ecosystem for this use case); plain HTML/JS (too slow to build complex interactive UI; harder to maintain demo state) |

### 2.2 Vite 5
| Property | Detail |
|---|---|
| **Tool** | Vite |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Fastest dev server available. Instant hot reload. Zero-config React setup. Produces optimised static build (single `dist/` folder) deployable to any free host with one command. Far faster than Create React App (deprecated). |
| **Build Output** | Static HTML + JS + CSS bundle — can be opened directly in browser or served from any free host |

---

## 3. Routing

### React Router v6
| Property | Detail |
|---|---|
| **Library** | react-router-dom v6 |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Client-side routing gives the app a real multi-page feel with clean URLs per role. Enables deep-linking to specific views during demo presentation. Nested routes map cleanly to dashboard sub-sections. |

**Route Map:**
```
/                         → Redirect to /login
/login                    → Login screen (role selector)
/admin                    → Admin dashboard (default)
/admin/packages           → Packages table
/admin/packages/:id       → Package detail
/admin/customers          → Customer accounts list
/admin/manifest           → Manifest generator
/customer                 → Customer portal home
/customer/packages        → My packages
/customer/packages/:id    → Package detail + timeline
/customer/invoices        → Invoices list
/customer/invoices/:id    → Invoice detail
/staff                    → Warehouse staff dashboard
/staff/scan               → Scan intake view
/staff/packages           → Warehouse package list
/driver                   → Driver delivery manifest
/driver/deliver/:id       → Scan & deliver flow
/track                    → Public tracking page (no auth)
```

---

## 4. Styling & UI

### 4.1 Tailwind CSS v3
| Property | Detail |
|---|---|
| **Library** | Tailwind CSS v3 |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Utility-first CSS enables pixel-precise, consistent UI without writing custom stylesheets. Pairs perfectly with React components. Responsive breakpoints (`sm:`, `md:`, `lg:`) handle mobile/desktop in one pass. No design debt. |
| **Configuration** | Custom `tailwind.config.js` to register Cynix brand tokens (blues, neutrals, accents) |

### 4.2 Lucide React
| Property | Detail |
|---|---|
| **Library** | lucide-react |
| **License** | ISC (free) |
| **Cost** | Free |
| **Why** | 1,400+ clean, consistent SVG icons as React components. Used throughout for navigation, status indicators, action buttons, and KPI cards. Renders sharply at all sizes. |
| **Key Icons Used** | Package, Truck, QrCode, Scan, MapPin, CheckCircle, AlertTriangle, Bell, User, BarChart3, FileText, LogOut |

### 4.3 Headless UI
| Property | Detail |
|---|---|
| **Library** | @headlessui/react |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Fully accessible, unstyled UI components (modals, dropdowns, toggles, tabs). Pairs with Tailwind for polished interactive components without building from scratch. Handles keyboard navigation and ARIA attributes automatically. |

---

## 5. Data Visualisation

### Recharts
| Property | Detail |
|---|---|
| **Library** | recharts |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Built specifically for React. Declarative chart components (BarChart, LineChart, AreaChart, PieChart) that render responsively. Used in the Admin dashboard for revenue trends, package pipeline, and delivery performance charts. |
| **Charts Used** |  |
| Revenue Trend | AreaChart — 30-day rolling revenue |
| Package Pipeline | BarChart — count per status stage |
| Delivery Performance | PieChart — Delivered / Failed / Pending |
| Weekly Volume | BarChart — packages in vs out per week |

---

## 6. QR Code & Barcode

### 6.1 qrcode.react — QR Generation
| Property | Detail |
|---|---|
| **Library** | qrcode.react |
| **License** | ISC (free) |
| **Cost** | Free |
| **Why** | Renders QR codes as React SVG or Canvas components. Zero dependencies. Used to generate the Cynix internal tracking QR for each package at intake. QR encodes the public tracking URL. |
| **Usage** | `<QRCodeSVG value={trackingUrl} size={200} level="H" />` |
| **Print Support** | QR rendered in a printable label layout — browser print dialog triggered via `window.print()` |

### 6.2 html5-qrcode — Camera Scanning
| Property | Detail |
|---|---|
| **Library** | html5-qrcode |
| **License** | Apache 2.0 (free) |
| **Cost** | Free |
| **Why** | Accesses device camera via browser MediaDevices API. Decodes QR codes AND standard 1D barcodes (Code128, EAN, UPC — the formats Amazon/UPS/FedEx use) in real-time from the camera feed. Works on desktop (webcam) and mobile (rear camera). No app install needed — pure browser. |
| **Fallback** | Manual tracking number text input on the same scan screen |
| **Used In** | Warehouse staff intake scan view, Driver scan-on-delivery view |

---

## 7. State Management

### React Context API + useReducer
| Property | Detail |
|---|---|
| **Approach** | Built-in React (no extra library) |
| **Cost** | Free |
| **Why** | For a demo prototype, React Context with useReducer is sufficient and avoids the complexity of Redux. A single `AppContext` holds the global package, customer, and invoice state. Actions (SCAN_PACKAGE, UPDATE_STATUS, ASSIGN_DRIVER, etc.) mutate state and trigger re-renders across all role views — making the demo feel live and connected. |

**Context Structure:**
```javascript
AppContext = {
  packages: [...],          // All 35 seed packages
  customers: [...],         // 8 demo customers
  invoices: [...],          // 20 demo invoices
  currentUser: { role, name, email },
  notifications: [...],     // Notification log
  dispatch: fn              // useReducer dispatcher
}
```

**Key Actions:**
```
SCAN_PACKAGE_IN        → Create new package record
UPDATE_PACKAGE_STATUS  → Move package through lifecycle
ASSIGN_TO_DRIVER       → Link package to driver run
MARK_DELIVERED         → Set delivered + timestamp
MARK_FAILED            → Set failed delivery + reason
SIMULATE_NOTIFICATION  → Add to notification log + show modal
PAY_INVOICE            → Mark invoice as paid
```

---

## 8. PDF / Print

### Browser Native Print API
| Property | Detail |
|---|---|
| **Approach** | `window.print()` with print-specific CSS (`@media print`) |
| **Cost** | Free |
| **Why** | For the demo, manifest and invoice "PDF" generation is handled by browser print. A clean print stylesheet hides navigation and renders the document in a professional layout. In production this would be replaced by a server-side PDF library. |
| **Print Views** | Invoice print layout, Manifest print layout, QR label print layout |

---

## 9. Notifications (Simulated)

### Custom Modal + Template Engine
| Property | Detail |
|---|---|
| **Approach** | Custom React component — no external library |
| **Cost** | Free |
| **Why** | On any status change action, a `NotificationPreviewModal` component fires showing: (a) the WhatsApp message template that would be sent, (b) the email preview. This simulates the Twilio WhatsApp API and SendGrid email that would be used in production. Adds enormous demo realism with zero external dependencies. |

**Notification Templates Included:**
```
📦 Package Arrived (US Warehouse)
✈️  In Transit to Bahamas
🏪 Ready for Collection
🚚 Out for Delivery
✅ Delivered Successfully
📄 Invoice Ready — Amount Due
```

---

## 10. Signature Capture (Driver POD)

### react-signature-canvas
| Property | Detail |
|---|---|
| **Library** | react-signature-canvas |
| **License** | MIT |
| **Cost** | Free |
| **Why** | Renders an HTML Canvas-based signature pad. Driver can sign with finger on mobile or mouse on desktop. Signature saved as base64 PNG and displayed as proof of delivery on the package record. Adds a highly realistic touch to the driver delivery flow. |

---

## 11. Hosting & Deployment

### Vercel (Free Tier)
| Property | Detail |
|---|---|
| **Platform** | Vercel |
| **License** | Free tier |
| **Cost** | Free (Hobby plan — unlimited for demo use) |
| **Why** | One command deploy (`vercel --prod`). Instant HTTPS URL to share with prospect. Automatic CDN. Zero config for Vite/React apps. The demo can be live at a URL like `https://cynix-demo.vercel.app` in under 2 minutes. |
| **Alternatives** | Netlify (also free, also excellent); GitHub Pages (free, requires minor config) |

**Deploy Command:**
```bash
npm run build       # Vite produces /dist folder
vercel --prod       # Deploys dist/ — live URL returned
```

---

## 12. Development Tooling

| Tool | Purpose | License | Cost |
|---|---|---|---|
| **Node.js 20 LTS** | Runtime for Vite dev server and build | MIT | Free |
| **npm** | Package management | Artistic License 2.0 | Free |
| **ESLint** | Code linting | MIT | Free |
| **Prettier** | Code formatting | MIT | Free |
| **VS Code** | Recommended IDE | MIT | Free |
| **Git** | Version control | GPL-2.0 | Free |
| **GitHub** | Repository hosting | Free tier | Free |

---

## 13. Complete Package List

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "tailwindcss": "^3.4.4",
    "lucide-react": "^0.394.0",
    "@headlessui/react": "^2.1.1",
    "recharts": "^2.12.7",
    "qrcode.react": "^3.1.0",
    "html5-qrcode": "^2.3.8",
    "react-signature-canvas": "^1.0.6",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "vite": "^5.3.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "eslint": "^9.6.0",
    "prettier": "^3.3.2"
  }
}
```

**Total external dependencies:** 11 production, 6 dev
**Total paid dependencies:** 0
**Total API keys required:** 0

---

## 14. Browser & Device Compatibility

| Browser | Desktop | Mobile |
|---|---|---|
| Chrome 120+ | ✅ Full support | ✅ Full support |
| Safari 17+ | ✅ Full support | ✅ Full support |
| Firefox 120+ | ✅ Full support | ✅ Full support |
| Edge 120+ | ✅ Full support | ✅ Full support |

**Camera scanning** (html5-qrcode) requires HTTPS — satisfied automatically by Vercel hosting.
**Signature pad** works with mouse, trackpad, stylus, and touch input.

---

## 15. Local Development Setup

```bash
# 1. Clone / initialise project
git init cynix-courier-demo
cd cynix-courier-demo

# 2. Scaffold with Vite
npm create vite@latest . -- --template react

# 3. Install all dependencies
npm install react-router-dom tailwindcss @headlessui/react \
  lucide-react recharts qrcode.react html5-qrcode \
  react-signature-canvas clsx

npm install -D autoprefixer postcss eslint prettier \
  @vitejs/plugin-react

# 4. Initialise Tailwind
npx tailwindcss init -p

# 5. Start dev server
npm run dev
# → http://localhost:5173

# 6. Production build
npm run build
# → /dist (deployable static bundle)
```

---

## 16. Production Upgrade Path

When the prospect signs and the real system is built, the following upgrades apply with **zero frontend rewrites**:

| Demo (Prototype) | Production Upgrade |
|---|---|
| React Context + mock data | React Query + REST API / GraphQL |
| localStorage state | PostgreSQL via Node.js/Express backend |
| Simulated notifications | Twilio WhatsApp Business API + SendGrid |
| Browser print PDF | Node.js PDF generation (Puppeteer or PDFKit) |
| Vercel free tier | Vercel Pro or AWS / DigitalOcean |
| Mock payment button | Stripe Payment Links / Stripe.js |
| Simulated camera scan | Same library — connects to real package records |

---

*Document prepared by Cynix Inc. — Confidential & Proprietary*
*All libraries listed are free and open-source. No paid tools, APIs, or subscriptions are required for the prototype.*
