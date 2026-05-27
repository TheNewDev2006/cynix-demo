# Product Requirements Document (PRD)
**Project:** Cynix Courier Platform — Demo Prototype
**Client Prospect:** Bahamas Courier Company (Package Forwarding + Last-Mile Delivery)
**Prepared by:** Cynix Inc.
**Document Version:** 1.0
**Date:** May 2026
**Status:** Demo / Prototype Phase

---

## 1. Executive Summary

This document defines the product requirements for a fully functional demo prototype of the **Cynix Courier Platform** — a web-based logistics management system purpose-built for a Bahamas courier company operating a US-to-Bahamas package forwarding and last-mile delivery service.

The prototype will demonstrate all four core user roles across a responsive, premium-quality interface. It will use realistic mock data, fully interactive UI flows, and simulated business logic to give the prospect an authentic preview of the final product — with zero backend infrastructure required at this stage.

---

## 2. Business Context

### 2.1 The Problem
The prospect currently operates with no digital system — packages are tracked manually (spreadsheets or paper), customers have no self-service visibility, billing is ad hoc, and delivery coordination is done via phone/WhatsApp. This creates errors, delays, customer dissatisfaction, and an unscalable operation.

### 2.2 The Opportunity
A purpose-built courier platform will:
- Eliminate manual tracking errors through QR/barcode scanning
- Give customers real-time package visibility via a self-service portal
- Automate invoicing and payment collection
- Streamline warehouse intake, dispatch, and last-mile delivery
- Provide management with live operational and financial intelligence

### 2.3 Demo Objective
The prototype must convincingly demonstrate that Cynix Inc. has the capability and vision to deliver this platform. It should feel like a real, polished product — not a mockup. The goal is to **close the deal.**

---

## 3. Scope — Demo Prototype

### 3.1 In Scope (Demo)
| Module | Description |
|---|---|
| Admin Dashboard | Live KPI cards, package pipeline, revenue chart, recent activity feed |
| Customer Portal | Package tracking, invoice view, account overview, pickup/delivery selection |
| Warehouse Staff View | Package intake form, QR/barcode scan simulation, status update, duty flag |
| Driver Mobile View | Assigned delivery list, route order, scan-on-delivery, proof of delivery capture |
| QR Code Generation | Auto-generate scannable QR per package |
| Barcode Scanning | Camera-based barcode/QR scan simulation |
| Notifications UI | Show triggered WhatsApp + email notification previews (simulated) |
| Authentication | Role-based login (4 roles) with demo credentials |

### 3.2 Out of Scope (Demo)
- Real payment processing (Stripe integration deferred to production)
- Live WhatsApp / Email API calls
- Real database / backend server
- US warehouse physical address management
- Customs duty calculation engine
- Live GPS route mapping for drivers

---

## 4. User Roles & Personas

### 4.1 Admin / Manager
**Name:** Marcus Reid — Operations Manager
**Goal:** Full visibility and control of the entire courier operation from one screen.
**Key Needs:**
- Real-time package status across all stages
- Revenue and outstanding invoice summary
- Ability to create, assign, and manage packages
- Generate daily dispatch manifests
- Manage customer accounts

**Demo Login:** `admin@cynix.com` / `demo1234`

---

### 4.2 Customer
**Name:** Trisha Williams — Regular Shopper
**Goal:** Know exactly where her packages are and what she owes, without calling anyone.
**Key Needs:**
- See all packages in one place with current status
- Track a package by tracking number (public, no login required)
- View and download invoices
- Select pickup or delivery preference
- Receive notifications at each status change

**Demo Login:** `customer@demo.com` / `demo1234`

---

### 4.3 Warehouse Staff
**Name:** Devon Clarke — Intake Operator
**Goal:** Quickly log incoming packages accurately without data entry errors.
**Key Needs:**
- Scan external barcode (Amazon/UPS) to auto-create package record
- Log weight, dimensions, and photos
- Flag dutiable items
- Print QR label for internal tracking
- Update package status at each warehouse stage

**Demo Login:** `staff@cynix.com` / `demo1234`

---

### 4.4 Delivery Driver
**Name:** Ray Thompson — Last-Mile Driver
**Goal:** Complete deliveries efficiently with minimal phone calls back to base.
**Key Needs:**
- See today's assigned delivery list
- Tap to get address / navigation link
- Scan package QR on delivery
- Capture proof of delivery (photo or signature)
- Mark delivered / failed delivery with notes

**Demo Login:** `driver@cynix.com` / `demo1234`

---

## 5. Functional Requirements

### 5.1 Authentication & Role Routing
- FR-001: System shall present a unified login screen
- FR-002: Each demo credential shall route to the correct role-specific dashboard
- FR-003: A role indicator badge shall be visible in the navigation at all times
- FR-004: Users can log out and switch roles (for demo purposes)

---

### 5.2 Admin Dashboard
- FR-010: Display KPI cards: Total Packages Today, Packages In Transit, Pending Invoices (value), Deliveries Completed Today
- FR-011: Display a visual package pipeline (funnel or kanban) showing count at each status stage
- FR-012: Display a revenue chart (last 30 days, bar or line)
- FR-013: Display a recent activity feed (last 10 events with timestamps)
- FR-014: Display a packages table with search, filter by status, and sort
- FR-015: Admin can click any package to view full detail
- FR-016: Admin can create a new package record manually
- FR-017: Admin can assign packages to a driver
- FR-018: Admin can view all customer accounts
- FR-019: Admin can generate a mock manifest PDF (triggered, shown as download)

---

### 5.3 Customer Portal
- FR-020: Customer dashboard shows summary: Active Packages, Packages Ready for Collection, Outstanding Balance
- FR-021: Packages list with status chips, estimated availability, and duty flag indicator
- FR-022: Click any package to see full timeline (status history with timestamps)
- FR-023: Package detail shows weight, dimensions, declared value, invoice amount
- FR-024: Customer can select "Delivery" or "Pickup" preference per package (if not yet dispatched)
- FR-025: Customer can view invoice and see itemised charges (weight fee, service fee, duty flag)
- FR-026: "Pay Now" button present (shows simulated payment success — no real gateway in demo)
- FR-027: Public tracking page accessible without login via tracking number input
- FR-028: Notification log shows recent WhatsApp/email alerts sent to the customer

---

### 5.4 Warehouse Staff View
- FR-030: Staff dashboard shows today's intake count and pending scan queue
- FR-031: "Scan Package" button activates camera QR/barcode reader (via device camera)
- FR-032: On successful scan of external barcode: auto-populate carrier, tracking number
- FR-033: Staff completes intake form: customer mailbox number, weight (kg), dimensions (cm), declared value
- FR-034: "Flag as Dutiable" toggle with item category dropdown
- FR-035: On save: system generates internal Cynix tracking number and QR code
- FR-036: QR code is displayed for printing (print button triggers browser print)
- FR-037: Staff can update package status (Arrived Bahamas, Ready for Collection, Dispatched)
- FR-038: Staff can view all packages currently in warehouse with their status

---

### 5.5 Driver Mobile View
- FR-040: Driver sees today's delivery manifest — list of assigned packages
- FR-041: Each item shows: customer name, address, package count, priority flag
- FR-042: Driver can tap "Navigate" — opens Google Maps (or Apple Maps) with address
- FR-043: "Scan & Deliver" button activates QR scanner to confirm package identity
- FR-044: After scan: driver confirms delivery with photo capture (simulated in demo) or signature pad
- FR-045: Package marked as Delivered — status updates in real-time across the system
- FR-046: Driver can mark "Delivery Failed" with reason (not home, wrong address, refused)
- FR-047: Driver sees running count: Delivered / Pending / Failed for the day

---

### 5.6 QR Code & Barcode
- FR-050: Every package in the system has a unique QR code generated at intake
- FR-051: QR encodes the Cynix internal tracking URL
- FR-052: QR is scannable by phone camera (links to public tracking page)
- FR-053: Warehouse and driver scan views accept both QR and standard 1D barcodes
- FR-054: Scan input also accepts manual entry (keyboard) as fallback

---

### 5.7 Notifications (Simulated)
- FR-060: At each status change, a notification preview modal appears showing the WhatsApp message that would be sent
- FR-061: Notification log in customer portal shows last 5 alerts with channel icon (WhatsApp / Email)
- FR-062: Notification templates include: Package Arrived, Invoice Ready, Out for Delivery, Delivered

---

## 6. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Responsiveness** | Fully responsive: 320px mobile to 1440px+ desktop |
| **Performance** | All views load under 1 second (client-side only, no network calls) |
| **Compatibility** | Chrome, Safari, Firefox, Edge — latest versions |
| **Accessibility** | WCAG AA compliant colour contrast; keyboard navigable |
| **Data** | All data is mock/seeded — no real PII, no external API calls |
| **Offline** | Fully functional without internet (except map navigation link) |
| **Tooling** | 100% free and open-source libraries only |

---

## 7. Mock Data Specification

The demo shall be pre-loaded with realistic seed data:

| Entity | Quantity |
|---|---|
| Customer accounts | 8 |
| Packages (various statuses) | 35 |
| Invoices (mix of paid/unpaid) | 20 |
| Delivery runs | 2 (today + yesterday) |
| Notification log entries | 15 |
| Revenue data points | 30 days |

Package statuses represented in seed data:
- Received at US Warehouse (5)
- In Transit to Bahamas (6)
- Arrived at Bahamas Warehouse (7)
- Ready for Collection (5)
- Out for Delivery (4)
- Delivered (6)
- Failed Delivery (2)

---

## 8. Demo Flow (Recommended Presentation Order)

1. **Login screen** — showcase branded entry point
2. **Admin Dashboard** — lead with the command centre (most impressive opening)
3. **Package detail drilldown** — show full lifecycle visibility
4. **Customer Portal** — switch role, show self-service tracking
5. **Public tracking page** — show no-login tracking (QR scan demo)
6. **Warehouse Staff view** — scan a package, watch it appear in admin
7. **Driver view** — show mobile-optimised delivery workflow
8. **Notification preview** — trigger a status change, show WhatsApp/email preview

---

## 9. Success Criteria for Demo

The prototype achieves its goal if the prospect can:
- [ ] Navigate all 4 role views without confusion
- [ ] See a package move through its full lifecycle
- [ ] Experience the QR scan workflow
- [ ] See a real-looking invoice
- [ ] See a notification preview trigger
- [ ] Feel confident this is a real, production-grade system

---

## 10. Assumptions & Constraints

- Demo runs entirely client-side (no backend server required)
- All state managed in-memory (React state or localStorage)
- No real payments, no real notifications, no real scanning hardware required for demo
- Cynix Inc. branding used throughout (prospect's actual brand to be applied post-contract)
- All libraries used must be free and open-source with no usage restrictions

---

## 11. Glossary

| Term | Definition |
|---|---|
| **Mailbox Number** | Unique US address identifier assigned to each customer (e.g. CYN-00142) |
| **Cynix Tracking Number** | Internal tracking ID generated at Bahamas warehouse intake |
| **Duty Flag** | Indicator that an item may be subject to Bahamas import duty |
| **Manifest** | Daily dispatch document listing all packages assigned to a driver |
| **Last-Mile Delivery** | The final leg of delivery from the Bahamas warehouse to the customer's address |
| **POD** | Proof of Delivery — photo or signature confirming package receipt |

---

*Document prepared by Cynix Inc. — Confidential & Proprietary*
*This PRD covers the demo prototype phase only. Production PRD to follow upon engagement.*
