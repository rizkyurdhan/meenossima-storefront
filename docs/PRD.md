# Product Requirements Document (PRD)
# Meenossima — Online Storefront

**Version:** 1.0  
**Date:** 2026-07-14  
**Author:** Development Team  
**Status:** Draft — Awaiting Stakeholder Approval

---

## 1. Executive Summary

Meenossima is an Indonesian curated fashion & accessories brand targeting quality-conscious millennials (25–40). The brand currently sells through Instagram, WhatsApp, and Shopee — channels that are reaching their operational ceiling. This project delivers a standalone eCommerce website that elevates the brand from social-commerce into a proper direct-to-consumer (D2C) storefront.

**Phase 1** focuses on a production-quality frontend mockup built with **Next.js** to pitch stakeholders, investors, and early customers. **Phase 2** integrates an existing self-hosted **ERPNext** instance as the backend (inventory, orders, accounting). **Phase 3** expands into full operational e-commerce with payment processing, logistics, and analytics.

### Why now?
- Social-commerce channels (IG DM, WhatsApp) don't scale; order tracking is manual.
- Shopee takes significant commission fees and controls the customer relationship.
- A D2C storefront builds brand equity, captures first-party data, and enables higher margins.

---

## 2. Brand Identity

### 2.1 Brand Essence
| Attribute | Detail |
|---|---|
| **Brand Name** | Meenossima |
| **Tagline** | *"Simplicity is The Key to Beautiful Soul"* |
| **Origin** | Indonesia |
| **Positioning** | Curated, minimal, soulful fashion — quality over quantity |
| **Voice** | Warm, authentic, understated elegance — not loud luxury |
| **Instagram** | @meenossima / @ordermeenossima |

### 2.2 Visual Direction

The design takes cues from **Seilin.net** (clean Japanese minimalism, Inter typography, generous whitespace, editorial product photography) and **Huckberry.com** (lifestyle storytelling, curated collections, warm editorial tone) — but adapted to Meenossima's softer, organic Indonesian identity.

| Element | Specification |
|---|---|
| **Primary Color** | Sage / Muted Green `#BDC1B6` (from current site) |
| **Secondary Colors** | Warm Ivory `#F5F0EB`, Charcoal `#2C2C2C`, Muted Gold `#C4A97D` |
| **Background** | Off-white / warm linen `#FAF8F5` |
| **Typography — Headings** | Serif or transitional serif (e.g., DM Serif Display, Cormorant Garamond) |
| **Typography — Body** | Clean sans-serif (e.g., Inter, DM Sans) |
| **Typography — Accent** | Handwritten or script for select decorative elements |
| **Photography Style** | Natural light, lifestyle-first, muted warm tones, shot on fabric/linen textures |
| **Border Radius** | Minimal (0–4px) — sharp, editorial feel |
| **Iconography** | Line-weight icons, consistent 1.5px stroke |

### 2.3 Anti-Patterns (De-Slop Principles)

> [!IMPORTANT]  
> The following are explicitly **forbidden** to avoid a generic "Tailwind template" look:

- ❌ Excessive rounded corners (`rounded-xl`, `rounded-full` on cards)
- ❌ Gratuitous gradients or neon accent colors
- ❌ Stock-photo hero banners with overlaid gradient text
- ❌ Cookie-cutter card grids with identical shadow depths
- ❌ Utility-class bloat visible in the DOM
- ❌ Generic "Add to Cart" buttons with no brand personality
- ❌ Overuse of badges, ribbons, and floating action buttons
- ❌ Parallax effects that compromise mobile performance
- ✅ **Instead:** Custom CSS (vanilla), intentional whitespace, bespoke layout compositions, editorial hierarchy, real photography, subtle micro-interactions authored by hand

---

## 3. Target Market

### 3.1 Primary Persona: *"Nia"*
| Attribute | Detail |
|---|---|
| **Age** | 28 |
| **Location** | Jakarta, Indonesia |
| **Occupation** | Creative professional / content creator |
| **Income** | Middle-upper (IDR 8–20 juta/month) |
| **Shopping Behavior** | Discovers brands on Instagram, researches before buying, values authenticity over hype |
| **Pain Points** | Frustrated with Shopee's chaotic UX, wants to support independent brands directly |
| **Device** | 80% mobile (iPhone/Android), 20% laptop |
| **Decision Drivers** | Brand story, product quality, photography, easy checkout, WhatsApp support |

### 3.2 Market Context (Indonesia)
- Mobile-first market: **>70%** of traffic will be mobile.
- WhatsApp is the dominant messaging platform for customer service.
- Trust is built through social proof (Instagram reviews, testimonials).
- Bank transfer and e-wallet (Xendit-powered) are preferred payment methods.
- Indonesian data protection law (**UU PDP / Undang-Undang Perlindungan Data Pribadi**) applies.

---

## 4. Feature Requirements

### 4.1 Phase 1 — Frontend Mockup (Pitch-Ready) ⏱️ 3–4 Weeks

> **Goal:** A clickable, production-quality Next.js frontend with real product imagery that demonstrates the complete shopping experience. No backend integration.

#### Pages

| Page | Priority | Description |
|---|---|---|
| **Homepage** | P0 | Hero section, featured products, brand story teaser, Instagram feed |
| **Product Listing** | P0 | Filterable catalog grid (by category, price, size) |
| **Product Detail** | P0 | Image gallery, size/variant selector, "Add to Cart", product description, size guide link |
| **Shopping Cart** | P0 | Slide-out drawer or dedicated page, quantity controls, subtotal |
| **Checkout** | P0 | Multi-step form (shipping → payment → confirmation), UI-only |
| **About / Brand Story** | P1 | The Meenossima story, values, craftsmanship |
| **Contact** | P1 | WhatsApp link, email form, social links |
| **Size Guide** | P2 | Measurement reference table |
| **FAQ** | P2 | Collapsible accordion |

#### Components

| Component | Description |
|---|---|
| **Navigation** | Sticky header with logo, menu links, search icon, cart icon with badge count. Hamburger menu on mobile. |
| **Hero Section** | Full-bleed lifestyle imagery with minimal text overlay. Seilin-style editorial feel. |
| **Product Card** | Image, product name, price. Hover: subtle zoom on image. No excessive badges. |
| **Product Gallery** | Thumbnail strip + main image. Zoom on hover/tap. Swipe on mobile. |
| **Cart Drawer** | Slide-in from right. Product thumbnails, qty controls, remove, subtotal. |
| **Footer** | Brand info, quick links, social icons, newsletter signup, Indonesian legal disclaimers. |
| **WhatsApp Widget** | Floating button (bottom-right), opens WhatsApp with pre-filled message. |
| **Announcement Bar** | Dismissible top bar for promotions (e.g., "Free shipping on orders over IDR 500K"). |
| **Language Switcher** | ID 🇮🇩 / EN 🇬🇧 toggle in header. |

#### Technical (Phase 1)

| Aspect | Decision |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Styling** | Vanilla CSS (custom properties / CSS modules) — **no Tailwind** |
| **Language** | TypeScript |
| **State Management** | React Context + `useReducer` for cart |
| **Data** | Static JSON / mock data files (products, categories) |
| **Images** | Real product photos from Instagram + Next.js `<Image>` optimization |
| **i18n** | `next-intl` or custom — Indonesian (default) + English |
| **Deployment** | Self-hosted VPS (Docker / PM2 behind Nginx) |
| **SEO** | SSG/SSR pages, semantic HTML, Open Graph tags, structured data |

---

### 4.2 Phase 2 — ERPNext Backend Integration 🔧 6–8 Weeks

> **Goal:** Connect the Next.js frontend to the existing ERPNext instance for real inventory, orders, and customer management.

#### Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│                 │     │   Next.js API     │     │                │
│  Next.js        │────▶│   Routes (BFF)    │────▶│  ERPNext       │
│  Frontend       │     │   /api/*          │     │  REST API      │
│  (SSR/SSG)      │     │                  │     │  (Frappe)      │
│                 │     │  • Auth proxy     │     │                │
└─────────────────┘     │  • Data transform │     │  • Items       │
                        │  • Rate limiting  │     │  • Orders      │
                        │  • Caching        │     │  • Customers   │
                        └──────────────────┘     │  • Stock       │
                                                  │  • Accounting  │
                                                  └────────────────┘
```

> [!TIP]
> **Recommended: BFF (Backend-for-Frontend) via Next.js API Routes**
>
> This is the best pattern for your setup because:
> - ERPNext's Frappe API is not designed for public-facing frontends (exposes internal field names, lacks proper pagination for e-commerce).
> - The BFF normalizes ERPNext's response format into clean, frontend-friendly shapes.
> - It acts as a security boundary — ERPNext credentials never reach the browser.
> - Rate limiting and caching are applied at the BFF layer, protecting ERPNext from abuse.
> - No additional infra needed — Next.js API routes run in the same deployment.

#### ERPNext Multi-Tenant Assessment

> [!WARNING]
> **ERPNext multi-tenant is a reasonable choice, but with caveats:**
>
> **✅ Good for your case because:**
> - You already have a running ERPNext instance (personal finance).
> - ERPNext supports multiple "Companies" within one instance — Meenossima can be a separate Company entity alongside your personal finance.
> - Shared infrastructure reduces cost for a small operation.
> - Frappe's multi-tenant mode (`bench setup` with multiple sites) allows separate databases per domain.
>
> **⚠️ Watch out for:**
> - **Performance:** A single ERPNext instance handling both personal finance and e-commerce may have resource contention. ERPNext is not lightweight — budget ≥4GB RAM for the combined workload.
> - **Isolation:** Multi-company (same site) shares the database. True multi-site (separate databases) is safer but more complex to maintain.
> - **API Performance:** ERPNext's Frappe API is not optimized for high-frequency e-commerce reads. The BFF layer with aggressive caching is essential.
> - **Upgrades:** Upgrading ERPNext affects all tenants simultaneously.
>
> **Recommendation:** Use **multi-site** (separate Frappe site for Meenossima with its own database), not just multi-company on the same site. This gives true data isolation.

#### ERPNext Doctypes to Leverage

| ERPNext Doctype | E-Commerce Use |
|---|---|
| Item | Product catalog (SKU, variants, pricing) |
| Item Group | Product categories |
| Item Price | Price lists (retail, wholesale) |
| Stock Entry | Inventory management |
| Sales Order | Customer orders |
| Customer | Customer profiles |
| Payment Entry | Payment records |
| Delivery Note | Shipping/fulfillment tracking |
| Website Item | Public product page data |

#### Key Integrations

| Integration | Provider | Phase |
|---|---|---|
| **Payment Gateway** | Xendit or Midtrans (IDR) | Phase 2 |
| **Shipping** | JNE, J&T, SiCepat via RajaOngkir API | Phase 2 |
| **WhatsApp Business** | WhatsApp Cloud API or WATI | Phase 2 |
| **Email** | Transactional via Resend or AWS SES | Phase 2 |
| **Analytics** | Plausible (privacy-first) or GA4 | Phase 1–2 |

---

### 4.3 Phase 3 — Full Operations & Growth 📈 Ongoing

| Feature | Description |
|---|---|
| Customer Accounts | Login, order history, saved addresses, wishlist |
| Order Tracking | Real-time status via courier APIs |
| Reviews & Ratings | Customer reviews on product pages |
| Blog / Lookbook | Editorial content, styling guides, brand stories |
| Promo Engine | Coupon codes, flash sales, bundling |
| Social Login | Google, Facebook authentication |
| Push Notifications | Order status updates via web push |
| Admin Dashboard | Custom analytics dashboard (beyond ERPNext reports) |
| Marketplace Sync | Shopee order sync via ERPNext |

---

## 5. User Stories (Phase 1)

### Customer Journey

| # | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Visitor | See a beautiful homepage with lifestyle imagery | I understand the brand's aesthetic and want to explore |
| US-02 | Shopper | Browse products by category | I can find what I'm looking for quickly |
| US-03 | Shopper | View detailed product information with multiple images | I can make an informed purchase decision |
| US-04 | Shopper | Select size and color variants | I get exactly what I want |
| US-05 | Shopper | Add items to cart without leaving the page | My browsing flow isn't interrupted |
| US-06 | Shopper | View and edit my cart | I can review before checkout |
| US-07 | Shopper | Complete a multi-step checkout | I feel confident in the purchase process |
| US-08 | Visitor | Switch between Indonesian and English | I can browse in my preferred language |
| US-09 | Visitor | Contact support via WhatsApp | I get immediate help from a real person |
| US-10 | Mobile user | Have a fast, responsive experience | The site feels native on my phone |

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| **Page Load (LCP)** | < 2.5s on 4G mobile |
| **First Input Delay** | < 100ms |
| **Cumulative Layout Shift** | < 0.1 |
| **Lighthouse Score** | ≥ 90 (Performance, Accessibility, SEO) |
| **Mobile Responsive** | 320px–2560px breakpoints |
| **Browser Support** | Chrome 90+, Safari 15+, Firefox 90+, Samsung Internet |
| **Uptime** | 99.5% (VPS with monitoring) |
| **Image Format** | WebP with AVIF fallback, lazy-loaded below fold |
| **Bundle Size** | < 200KB initial JS (gzipped) |
| **Accessibility** | WCAG 2.1 AA compliant |

---

## 7. Success Metrics

### Phase 1 (Mockup)
- [ ] Stakeholder sign-off on design direction
- [ ] < 3s load time on Indonesian 4G networks
- [ ] 100% responsive across test devices (iPhone SE, iPhone 14, Samsung Galaxy, iPad, Desktop)
- [ ] All pages navigable with mock data

### Phase 2 (Launch)
- [ ] First 50 orders processed through the website
- [ ] Average order value (AOV) within 10% of Instagram channel
- [ ] < 5% cart abandonment rate at checkout
- [ ] Zero critical security vulnerabilities (penetration test)

### Phase 3 (Growth)
- [ ] 30% of total sales through website (vs. Shopee/IG)
- [ ] 500+ monthly unique visitors
- [ ] Positive customer NPS score (>50)

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| ERPNext API performance under load | Slow page loads, poor UX | BFF caching layer, CDN for static assets |
| Limited product photography | Weak visual impact at pitch | Source from Instagram, supplement with lifestyle shots |
| Xendit/Midtrans integration complexity | Delayed Phase 2 launch | Use test sandbox early, allocate buffer time |
| Indonesian internet speeds | Poor mobile experience | Aggressive image optimization, SSG, edge caching |
| ERPNext upgrade breaks API | Frontend breaks | Pin ERPNext version, BFF abstracts API changes |
| Single VPS as SPOF | Downtime | Automated backups, monitoring alerts, documented recovery |

---

## 9. Project Timeline

```
Phase 1 ─────────────────────────────────── 3–4 weeks
  Week 1: Design system, homepage, navigation
  Week 2: Product pages, catalog, cart
  Week 3: Checkout flow, about page, responsiveness
  Week 4: Polish, performance optimization, deployment

Phase 2 ─────────────────────────────────── 6–8 weeks
  ERPNext configuration, BFF API, payment integration,
  shipping integration, testing

Phase 3 ─────────────────────────────────── Ongoing
  Customer accounts, reviews, blog, analytics,
  Shopee sync, growth features
```

---

## 10. Appendix

### A. Competitive References
| Site | What to Borrow | What to Avoid |
|---|---|---|
| **seilin.net** | Clean grid layout, Inter typography, minimal chrome, editorial product display | Shopify-specific UI patterns, slow custom font loading |
| **huckberry.com** | Lifestyle storytelling, curated collections, warm editorial tone, trust indicators | Overly complex mega-menus, heavy JS bundles |
| **Current Milkshake site** | Color palette (sage green), brand tagline, product photography | Milkshake builder limitations, link-tree format |

### B. Technology Stack Summary

| Layer | Technology |
|---|---|
| Frontend | Next.js 14+ (App Router, TypeScript) |
| Styling | Vanilla CSS (custom properties, CSS modules) |
| Backend (Phase 2) | ERPNext (Frappe REST API) |
| BFF | Next.js API Routes |
| Payment | Xendit or Midtrans |
| Shipping | RajaOngkir API |
| Hosting | Self-hosted VPS (Docker, Nginx) |
| CDN | Cloudflare (free tier) |
| Monitoring | Uptime Robot + Sentry |
| Analytics | Plausible or GA4 |

---

*This document is a living artifact. Updates require stakeholder review and version increment.*
