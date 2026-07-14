# Technical Specification (SPEC)
# Meenossima — Online Storefront

**Version:** 1.0  
**Date:** 2026-07-14  
**Author:** Development Team  
**Status:** Draft — Awaiting Technical Review  
**Companion Document:** [PRD.md](file:///home/rakis/projects/online_storefront/PRD.md)

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
                                   ┌──────────────────────────────────────┐
                                   │           Cloudflare CDN             │
                                   │  • SSL termination                   │
                                   │  • DDoS protection                   │
                                   │  • Edge caching (static assets)      │
                                   │  • WAF rules                         │
                                   │  • Bot management                    │
                                   │  • Rate limiting (L7)                │
                                   └─────────────┬────────────────────────┘
                                                 │
                                                 ▼
                               ┌─────────────────────────────────────────┐
                               │             Nginx Reverse Proxy          │
                               │  • TLS 1.3 (origin)                     │
                               │  • HTTP/2                                │
                               │  • Security headers                      │
                               │  • Request size limits                   │
                               │  • Gzip/Brotli compression               │
                               └──────────┬──────────────────────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        ▼                                   ▼
              ┌──────────────────┐                ┌──────────────────┐
              │   Next.js App    │                │    ERPNext       │
              │   (Port 3000)    │───────────────▶│   (Port 8000)    │
              │                  │  BFF API       │                  │
              │  • SSR/SSG       │  Calls          │  • Frappe API    │
              │  • API Routes    │                │  • MariaDB       │
              │  • Static files  │                │  • Redis          │
              └──────────────────┘                └──────────────────┘
```

### 1.2 Phase 1 Architecture (Simplified)

```
  Cloudflare ──▶ Nginx ──▶ Next.js (SSG + API routes for cart state)
                                │
                                └── Static JSON (mock product data)
```

---

## 2. Technology Stack

### 2.1 Frontend

| Component | Technology | Version | Rationale |
|---|---|---|---|
| **Runtime** | Node.js | 20 LTS | Stability, long-term support |
| **Framework** | Next.js | 14.x+ | SSR/SSG, App Router, API routes, Image optimization |
| **Language** | TypeScript | 5.x | Type safety, developer experience |
| **Styling** | Vanilla CSS | — | CSS Modules + Custom Properties. No Tailwind. Full design control, zero runtime cost. |
| **State (Cart)** | React Context + useReducer | — | Lightweight, no external dependency |
| **i18n** | next-intl | 3.x | Mature, App Router compatible, ICU message format |
| **Image Optimization** | next/image | — | Automatic WebP/AVIF, lazy loading, srcset |
| **Icons** | Lucide React | — | Tree-shakeable, consistent line-weight icons |
| **Linting** | ESLint + Prettier | — | Consistent code quality |
| **Testing** | Vitest + Playwright | — | Unit + E2E testing |

### 2.2 Backend (Phase 2)

| Component | Technology | Version | Rationale |
|---|---|---|---|
| **ERP** | ERPNext | 15.x | Existing deployment, full business suite |
| **Framework** | Frappe | 15.x | Underlying API framework for ERPNext |
| **Database** | MariaDB | 10.11+ | Frappe's default, battle-tested |
| **Cache** | Redis | 7.x | Session store, cache, queue |
| **Payment** | Xendit / Midtrans | — | Indonesian payment ecosystem coverage |
| **Shipping** | RajaOngkir API | — | Indonesian courier rate calculator |
| **Email** | Resend / AWS SES | — | Transactional email delivery |

### 2.3 Infrastructure

| Component | Technology | Rationale |
|---|---|---|
| **VPS** | DigitalOcean / Linode | Self-hosted, cost-effective for Indonesia |
| **Reverse Proxy** | Nginx | SSL, compression, security headers, load balancing |
| **CDN** | Cloudflare (Free) | Global edge caching, DDoS protection, WAF |
| **Containerization** | Docker + Docker Compose | Reproducible deployments, isolation |
| **Process Manager** | PM2 (Next.js) | Auto-restart, clustering, log management |
| **SSL Certificates** | Let's Encrypt (via Cloudflare) | Free, auto-renewing TLS certificates |
| **Monitoring** | Uptime Robot + Sentry | Uptime monitoring + error tracking |
| **Backups** | Automated daily (VPS snapshots + DB dumps) | Disaster recovery |

---

## 3. Project Structure

```
meenossima/
├── public/
│   ├── fonts/                    # Self-hosted font files
│   ├── images/
│   │   ├── products/            # Product photography
│   │   ├── lifestyle/           # Brand/lifestyle imagery
│   │   └── icons/               # Favicons, OG images
│   └── locales/                 # Translation files (if file-based)
│
├── src/
│   ├── app/
│   │   ├── [locale]/            # i18n routing
│   │   │   ├── layout.tsx       # Root layout (header, footer)
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx     # Product listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx     # Cart page
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx     # Checkout flow
│   │   │   ├── about/
│   │   │   │   └── page.tsx     # Brand story
│   │   │   └── contact/
│   │   │       └── page.tsx     # Contact page
│   │   ├── api/                 # BFF API routes (Phase 2)
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   └── health/
│   │   ├── globals.css          # CSS custom properties, resets
│   │   └── layout.tsx           # App-level layout
│   │
│   ├── components/
│   │   ├── ui/                  # Primitive UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Badge/
│   │   │   └── Skeleton/
│   │   ├── layout/              # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   ├── AnnouncementBar/
│   │   │   └── Container/
│   │   ├── product/             # Product-specific components
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGallery/
│   │   │   ├── ProductInfo/
│   │   │   ├── VariantSelector/
│   │   │   └── SizeGuide/
│   │   ├── cart/                # Cart components
│   │   │   ├── CartDrawer/
│   │   │   ├── CartItem/
│   │   │   └── CartSummary/
│   │   ├── checkout/            # Checkout components
│   │   │   ├── ShippingForm/
│   │   │   ├── PaymentForm/
│   │   │   ├── OrderSummary/
│   │   │   └── CheckoutSteps/
│   │   └── common/              # Shared components
│   │       ├── WhatsAppWidget/
│   │       ├── LanguageSwitcher/
│   │       ├── SearchModal/
│   │       └── Newsletter/
│   │
│   ├── context/
│   │   ├── CartContext.tsx       # Cart state management
│   │   └── LocaleContext.tsx     # Language context
│   │
│   ├── data/                    # Mock data (Phase 1)
│   │   ├── products.json
│   │   ├── categories.json
│   │   └── site-config.json
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/                     # Utility functions
│   │   ├── constants.ts
│   │   ├── formatters.ts        # Currency, date formatting
│   │   ├── validators.ts        # Form validation
│   │   └── erpnext/             # ERPNext API client (Phase 2)
│   │       ├── client.ts
│   │       ├── types.ts
│   │       └── transformers.ts
│   │
│   ├── styles/                  # Shared CSS
│   │   ├── variables.css        # Design tokens
│   │   ├── reset.css            # CSS reset
│   │   ├── typography.css       # Type scale
│   │   └── animations.css       # Micro-interactions
│   │
│   └── types/                   # TypeScript types
│       ├── product.ts
│       ├── cart.ts
│       ├── order.ts
│       └── common.ts
│
├── messages/                    # i18n translation files
│   ├── id.json                  # Indonesian
│   └── en.json                  # English
│
├── docker/
│   ├── Dockerfile               # Production build
│   ├── Dockerfile.dev           # Development build
│   └── nginx/
│       ├── nginx.conf           # Main Nginx config
│       └── security-headers.conf
│
├── docker-compose.yml           # Full stack orchestration
├── docker-compose.dev.yml       # Development overrides
├── next.config.ts               # Next.js configuration
├── tsconfig.json
├── package.json
├── .env.example                 # Environment variable template
├── .env.local                   # Local env (gitignored)
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

---

## 4. Design System

### 4.1 CSS Custom Properties (Design Tokens)

```css
/* src/styles/variables.css */

:root {
  /* ─── Colors ─── */
  --color-primary:        #BDC1B6;   /* Sage green (brand) */
  --color-primary-dark:   #9CA396;   /* Sage green darker */
  --color-primary-light:  #D4D8CE;   /* Sage green lighter */
  
  --color-secondary:      #C4A97D;   /* Muted gold accent */
  --color-secondary-dark: #A68B5B;
  
  --color-bg:             #FAF8F5;   /* Warm linen white */
  --color-bg-alt:         #F5F0EB;   /* Warm ivory */
  --color-bg-card:        #FFFFFF;
  
  --color-text:           #2C2C2C;   /* Charcoal */
  --color-text-secondary: #6B6B6B;   /* Muted gray */
  --color-text-tertiary:  #9B9B9B;   /* Light gray */
  --color-text-inverse:   #FAF8F5;
  
  --color-border:         #E8E5E0;   /* Warm border */
  --color-border-focus:   #BDC1B6;   /* Focus ring = brand color */
  
  --color-success:        #5B8C5A;
  --color-error:          #C54B4B;
  --color-warning:        #D4A843;
  
  /* ─── Typography ─── */
  --font-heading:   'Cormorant Garamond', 'Georgia', serif;
  --font-body:      'Inter', -apple-system, sans-serif;
  --font-mono:      'JetBrains Mono', monospace;
  
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   1.875rem;   /* 30px */
  --text-4xl:   2.25rem;    /* 36px */
  --text-5xl:   3rem;       /* 48px */
  --text-6xl:   3.75rem;    /* 60px */
  
  --leading-tight:    1.2;
  --leading-normal:   1.5;
  --leading-relaxed:  1.7;
  
  --tracking-tight:   -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;
  
  /* ─── Spacing (8px base grid) ─── */
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  
  /* ─── Layout ─── */
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1200px;
  --container-2xl:  1400px;
  --gutter:         var(--space-6);
  
  /* ─── Borders ─── */
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;
  --radius-full: 9999px;
  --border-width: 1px;
  
  /* ─── Shadows ─── */
  --shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md:   0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-lg:   0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-xl:   0 8px 32px rgba(0, 0, 0, 0.10);
  
  /* ─── Transitions ─── */
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
  
  /* ─── Z-Index Scale ─── */
  --z-dropdown:   100;
  --z-sticky:     200;
  --z-overlay:    300;
  --z-modal:      400;
  --z-toast:      500;
  --z-whatsapp:   600;
  
  /* ─── Breakpoints (for reference, used in @media) ─── */
  /* --bp-sm:  640px  */
  /* --bp-md:  768px  */
  /* --bp-lg:  1024px */
  /* --bp-xl:  1200px */
  /* --bp-2xl: 1400px */
}
```

### 4.2 Component Patterns

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx         # Component logic
├── ComponentName.module.css  # Scoped styles
└── index.ts                  # Re-export
```

**CSS Module naming conventions:**
- `.root` — component root element
- `.inner` — main content wrapper
- `.title`, `.subtitle`, `.body` — text elements
- `.action` — interactive elements
- `.isActive`, `.isDisabled` — state modifiers (camelCase)

---

## 5. API Specification (Phase 2 — BFF Layer)

### 5.1 API Design Principles

- RESTful endpoints under `/api/v1/`
- JSON request/response bodies
- Consistent error response shape
- Rate-limited at the BFF layer
- ERPNext credentials never exposed to the client

### 5.2 Endpoints

#### Products

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/products` | List products (paginated, filterable) |
| `GET` | `/api/v1/products/:slug` | Get single product by slug |
| `GET` | `/api/v1/categories` | List product categories |

**Query Parameters (products list):**
```
?category=tops
&sort=price_asc|price_desc|newest
&page=1
&limit=12
&search=dress
```

**Response Shape:**
```json
{
  "data": [
    {
      "id": "PROD-001",
      "slug": "linen-wrap-dress",
      "name": "Linen Wrap Dress",
      "price": 450000,
      "currency": "IDR",
      "images": [
        { "url": "/images/products/linen-wrap-1.webp", "alt": "Front view" }
      ],
      "variants": [
        { "type": "size", "options": ["S", "M", "L"] },
        { "type": "color", "options": ["Sage", "Ivory"] }
      ],
      "inStock": true,
      "category": "dresses",
      "description": "...",
      "details": ["100% Linen", "Made in Indonesia"]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

#### Cart

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/cart` | Create/update cart (server-side session) |
| `GET` | `/api/v1/cart` | Get current cart |
| `POST` | `/api/v1/cart/items` | Add item to cart |
| `PATCH` | `/api/v1/cart/items/:id` | Update item quantity |
| `DELETE` | `/api/v1/cart/items/:id` | Remove item from cart |

#### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/orders` | Create order from cart |
| `GET` | `/api/v1/orders/:id` | Get order status |
| `POST` | `/api/v1/orders/:id/payment` | Initiate payment (Xendit) |

#### Shipping

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/shipping/rates` | Calculate shipping rates (RajaOngkir) |
| `GET` | `/api/v1/shipping/provinces` | List Indonesian provinces |
| `GET` | `/api/v1/shipping/cities/:provinceId` | List cities in province |

### 5.3 Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address",
    "details": [
      { "field": "email", "message": "Must be a valid email address" }
    ]
  }
}
```

**Error Codes:**
| Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `NOT_FOUND` | 404 | Resource not found |
| `OUT_OF_STOCK` | 409 | Product variant out of stock |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error (ERPNext unavailable, etc.) |
| `PAYMENT_FAILED` | 402 | Payment processing failed |

---

## 6. Security Specification

> [!CAUTION]
> Security is not an afterthought. Every layer of the stack has security controls. This section covers the full defense-in-depth strategy.

### 6.1 Transport Layer Security

| Control | Implementation | Phase |
|---|---|---|
| **HTTPS everywhere** | Cloudflare SSL (Full Strict mode) + Let's Encrypt on origin | Phase 1 |
| **TLS version** | Minimum TLS 1.2, prefer TLS 1.3 | Phase 1 |
| **HSTS** | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` | Phase 1 |
| **Certificate pinning** | HPKP not recommended (use CT monitoring instead) | Phase 1 |
| **Origin pull** | Cloudflare authenticated origin pulls (mutual TLS) | Phase 1 |

### 6.2 HTTP Security Headers

```nginx
# Nginx security-headers.conf

# Prevent MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Clickjacking protection
add_header X-Frame-Options "SAMEORIGIN" always;

# XSS filter (legacy browsers)
add_header X-XSS-Protection "1; mode=block" always;

# Referrer policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Content Security Policy
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM}' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://api.xendit.co https://wa.me;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
" always;

# Permissions Policy
add_header Permissions-Policy "
  camera=(),
  microphone=(),
  geolocation=(),
  payment=(self),
  usb=()
" always;

# Prevent caching of sensitive pages
# (Applied selectively to checkout/account pages)
# add_header Cache-Control "no-store, no-cache, must-revalidate" always;
```

### 6.3 Input Validation & Sanitization

#### Client-Side (Defense-in-Depth, not trusted)
```typescript
// src/lib/validators.ts

export const validators = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v: string) => /^(\+62|62|0)[0-9]{8,13}$/.test(v), // Indonesian
  postalCode: (v: string) => /^[0-9]{5}$/.test(v), // Indonesian postal
  name: (v: string) => v.length >= 2 && v.length <= 100,
  quantity: (v: number) => Number.isInteger(v) && v > 0 && v <= 99,
  
  // Anti-XSS: strip HTML from user inputs
  sanitizeText: (v: string) => v.replace(/<[^>]*>/g, '').trim(),
};
```

#### Server-Side (BFF Layer — Source of Truth)

| Vector | Protection |
|---|---|
| **SQL Injection** | Frappe ORM (parameterized queries) — no raw SQL |
| **XSS (Reflected)** | Output encoding via React's JSX escaping + CSP nonce |
| **XSS (Stored)** | Server-side sanitization with DOMPurify on text inputs |
| **XSS (DOM)** | Avoid `dangerouslySetInnerHTML`; use React's default escaping |
| **Path Traversal** | Validate file paths, use allowlists for product slugs |
| **Prototype Pollution** | Validate JSON payloads, use `Object.create(null)` for dictionaries |
| **Request Size** | Nginx `client_max_body_size 2m;` for API, `10m` for image uploads |
| **Content Type Validation** | Reject requests without proper `Content-Type: application/json` |

```typescript
// src/app/api/middleware.ts — Example validation middleware

import { z } from 'zod';

// Strict input schemas using Zod
const AddToCartSchema = z.object({
  productId: z.string().regex(/^PROD-[0-9]{3,6}$/),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1).max(99),
});

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (req: Request) => {
    const body = await req.json().catch(() => null);
    if (!body) throw new ApiError('VALIDATION_ERROR', 'Invalid JSON body');
    
    const result = schema.safeParse(body);
    if (!result.success) {
      throw new ApiError('VALIDATION_ERROR', 'Validation failed', 
        result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
      );
    }
    return result.data;
  };
}
```

### 6.4 CSRF Protection

| Context | Protection |
|---|---|
| **Next.js API Routes** | `SameSite=Strict` cookies + custom header check (`X-Requested-With: XMLHttpRequest`) |
| **Forms** | CSRF tokens generated per session, validated server-side |
| **Fetch requests** | Origin header validation against allowlist |

```typescript
// CSRF middleware for API routes
export function csrfProtection(req: Request): boolean {
  const origin = req.headers.get('origin');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'https://meenossima.com',
    'https://www.meenossima.com',
  ].filter(Boolean);
  
  if (!origin || !allowedOrigins.includes(origin)) {
    return false; // Block request
  }
  return true;
}
```

### 6.5 Rate Limiting & DDoS Protection

#### Layer 1: Cloudflare (Edge)
- Rate limiting rules: 100 requests/minute per IP for API endpoints
- Bot management: Challenge suspicious traffic
- Under Attack Mode: Available for emergency activation
- Geographic restrictions: Optional — restrict to Indonesian IPs + known VPNs

#### Layer 2: Nginx

```nginx
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=checkout:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=general:10m rate=60r/m;

# Apply to locations
location /api/ {
    limit_req zone=api burst=10 nodelay;
    limit_req_status 429;
    proxy_pass http://nextjs;
}

location /api/v1/orders {
    limit_req zone=checkout burst=5 nodelay;
    proxy_pass http://nextjs;
}
```

#### Layer 3: Application (BFF)

```typescript
// Rate limiting with in-memory store (or Redis for distributed)
import { Ratelimit } from '@upstash/ratelimit'; // Or custom implementation

const rateLimiters = {
  api: { window: '1m', max: 60 },
  checkout: { window: '1m', max: 10 },
  search: { window: '1m', max: 30 },
};
```

### 6.6 Authentication & Authorization (Phase 2)

| Aspect | Implementation |
|---|---|
| **Session Management** | Server-side sessions with `httpOnly`, `Secure`, `SameSite=Strict` cookies |
| **Password Storage** | Managed by ERPNext (Frappe uses bcrypt with salt) |
| **Token Lifetime** | Session: 24h, Refresh: 7 days |
| **Brute Force Protection** | Account lockout after 5 failed attempts, progressive delay |
| **Session Fixation** | Regenerate session ID on login |
| **Concurrent Sessions** | Max 3 active sessions per user |

```typescript
// Cookie security configuration
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,      // No JavaScript access
  secure: true,        // HTTPS only
  sameSite: 'strict',  // No cross-origin sending
  maxAge: 86400,       // 24 hours
  path: '/',
  domain: '.meenossima.com',
};
```

### 6.7 Data Protection (UU PDP Compliance)

Indonesia's **Undang-Undang Perlindungan Data Pribadi** (Personal Data Protection Law) requires:

| Requirement | Implementation |
|---|---|
| **Consent** | Explicit opt-in for data collection (newsletter, analytics). Cookie banner with accept/reject. |
| **Purpose Limitation** | Only collect data necessary for order fulfillment. Document data purposes. |
| **Data Minimization** | Don't store payment card data (handled by Xendit/Midtrans). Minimal PII in database. |
| **Right to Access** | Customer can request all personal data via support/API |
| **Right to Delete** | Customer can request data deletion (anonymize orders, delete account) |
| **Data Breach Notification** | Notify affected users within 72 hours of a confirmed breach |
| **Encryption at Rest** | MariaDB transparent data encryption (TDE) for PII tables |
| **Encryption in Transit** | TLS 1.3 for all connections (CDN → Origin → Database) |
| **Data Residency** | VPS in Indonesia or Singapore (nearest region) |
| **Access Logging** | Audit log of all PII access (who, when, what) |

### 6.8 Payment Security (PCI DSS Considerations)

> [!IMPORTANT]
> By using **Xendit** or **Midtrans** as tokenized payment processors, Meenossima qualifies for **PCI DSS SAQ-A** (lowest compliance burden). Card data never touches our servers.

| Control | Implementation |
|---|---|
| **Card data handling** | **NEVER** store, process, or transmit raw card numbers. Use Xendit/Midtrans tokenized checkout. |
| **Payment page** | Redirect to Xendit/Midtrans hosted payment page OR embed their secure iframe. |
| **Webhook validation** | Verify Xendit/Midtrans webhook signatures using shared secret + HMAC-SHA256 |
| **Idempotency** | Use idempotency keys for payment creation to prevent duplicate charges |
| **Amount verification** | Server-side cart total verification before payment initiation |
| **Payment status** | Store payment status, never raw card data. Only store last 4 digits + card brand. |

```typescript
// Xendit webhook signature verification
import crypto from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string, 
  secretKey: string
): boolean {
  const expected = crypto
    .createHmac('sha256', secretKey)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

### 6.9 Bot Protection & CAPTCHA

| Mechanism | Where Applied |
|---|---|
| **Cloudflare Bot Management** | All traffic (transparent, no user friction) |
| **Cloudflare Turnstile** | Checkout form, contact form, newsletter signup (privacy-friendly CAPTCHA alternative) |
| **Honeypot Fields** | Hidden form fields to catch basic bots |
| **User-Agent Validation** | Block known bad user agents at Nginx level |
| **JavaScript Challenge** | Cloudflare JS challenge for suspicious patterns |

```html
<!-- Honeypot field example -->
<div style="position: absolute; left: -9999px;" aria-hidden="true">
  <input type="text" name="website" tabindex="-1" autocomplete="off" />
</div>
```

### 6.10 Dependency Security

| Practice | Implementation |
|---|---|
| **Lockfile** | `package-lock.json` committed, exact versions |
| **Audit** | `npm audit` in CI pipeline, fail on critical/high vulnerabilities |
| **Renovate/Dependabot** | Automated dependency update PRs |
| **License compliance** | `license-checker` to flag copyleft licenses |
| **Supply chain** | Use `npm` with `--ignore-scripts` where possible; review post-install scripts |
| **SRI** | Subresource Integrity for any CDN-loaded scripts |
| **Minimal dependencies** | Prefer native browser APIs and small, focused libraries over large frameworks |

### 6.11 Infrastructure Security

| Control | Implementation |
|---|---|
| **SSH hardening** | Key-only auth, disable root login, non-standard port, fail2ban |
| **Firewall** | UFW: only ports 80, 443, SSH open |
| **Docker security** | Non-root containers, read-only filesystems where possible, no `--privileged` |
| **Secrets management** | `.env` files (gitignored), consider Docker secrets or HashiCorp Vault for production |
| **Log management** | Centralized logging (stdout → Docker logs → optional ELK/Loki) |
| **Backup encryption** | Encrypted backup archives (GPG) stored off-site |
| **OS updates** | `unattended-upgrades` for security patches |
| **Container images** | Pin base image digests, use `node:20-slim` (minimal attack surface) |

### 6.12 Security Monitoring & Incident Response

| Aspect | Implementation |
|---|---|
| **Error Tracking** | Sentry — captures exceptions with stack traces (scrub PII) |
| **Uptime Monitoring** | Uptime Robot — alerts on downtime (Slack, Email, WhatsApp) |
| **WAF Logs** | Cloudflare — blocked requests, suspicious patterns |
| **Access Logs** | Nginx — request logs with IP, UA, response code |
| **Security Scanning** | Monthly: `npm audit`, OWASP ZAP scan, SSL Labs test |
| **Incident Response** | Documented runbook: detect → contain → eradicate → recover → post-mortem |

---

## 7. Performance Specification

### 7.1 Performance Budget

| Metric | Budget | Measurement |
|---|---|---|
| **Initial HTML** | < 14KB (gzipped) | First meaningful render without JS |
| **Total JS (initial)** | < 200KB (gzipped) | JavaScript parsed on first load |
| **Total CSS** | < 50KB (gzipped) | All stylesheets combined |
| **Hero Image (LCP)** | < 200KB | Optimized WebP, `fetchpriority="high"` |
| **Product Card Image** | < 80KB each | WebP, responsive `srcset` |
| **Web Font** | < 100KB total | Subset fonts, `font-display: swap` |
| **Time to Interactive** | < 3.5s on 4G | Indonesian mobile networks |

### 7.2 Optimization Strategies

| Strategy | Implementation |
|---|---|
| **Image Optimization** | Next.js `<Image>` with automatic WebP/AVIF, responsive srcset, lazy loading |
| **Font Loading** | Self-host fonts, `font-display: swap`, subset to Latin + Extended Latin |
| **Code Splitting** | Next.js automatic per-route splitting + dynamic imports for modals |
| **Static Generation** | SSG for product pages, ISR (Incremental Static Regeneration) in Phase 2 |
| **Edge Caching** | Cloudflare caches static assets (1 year), HTML (stale-while-revalidate) |
| **Prefetching** | Next.js `<Link>` automatic prefetch for visible viewport links |
| **Critical CSS** | Next.js inlines critical CSS automatically |
| **Resource Hints** | `preconnect` to Cloudflare, font origins; `prefetch` for likely next navigations |

### 7.3 Core Web Vitals Targets

| Metric | Target | Strategy |
|---|---|---|
| **LCP** | < 2.5s | SSG pages, optimized hero images, `fetchpriority="high"` |
| **INP** | < 200ms | Avoid long tasks, use `startTransition` for state updates |
| **CLS** | < 0.1 | Explicit image dimensions, font `size-adjust`, skeleton loading |

---

## 8. Deployment Specification

### 8.1 Docker Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  nextjs:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://meenossima.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./docker/nginx/security-headers.conf:/etc/nginx/conf.d/security-headers.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - nextjs
    restart: unless-stopped
```

### 8.2 Dockerfile

```dockerfile
# docker/Dockerfile
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --production=false

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 8.3 Deployment Checklist

- [ ] Environment variables set (`.env.production`)
- [ ] Docker images built and tested
- [ ] Nginx SSL configured and tested
- [ ] Cloudflare DNS pointing to VPS
- [ ] Cloudflare SSL mode set to "Full (Strict)"
- [ ] Security headers verified (securityheaders.com)
- [ ] SSL configuration tested (ssllabs.com — target A+)
- [ ] Performance tested (Lighthouse CI — target 90+)
- [ ] Backup schedule configured (daily DB + weekly full)
- [ ] Monitoring alerts configured (Uptime Robot + Sentry)
- [ ] Error pages (404, 500) customized with brand styling

---

## 9. Testing Strategy

### 9.1 Testing Pyramid

| Level | Tool | Coverage Target |
|---|---|---|
| **Unit Tests** | Vitest | Utility functions, validators, formatters, hooks — 80% coverage |
| **Component Tests** | Vitest + React Testing Library | Interactive components (cart, variant selector) — key flows |
| **Integration Tests** | Vitest | BFF API routes + ERPNext mock (Phase 2) |
| **E2E Tests** | Playwright | Full user journeys: browse → add to cart → checkout |
| **Visual Regression** | Playwright screenshots | Homepage, product page, cart — compare across deploys |
| **Performance** | Lighthouse CI | Run on every deployment, fail if score < 85 |
| **Security** | OWASP ZAP + npm audit | Monthly automated scan + CI audit |
| **Accessibility** | axe-core (via Playwright) | WCAG 2.1 AA compliance on all pages |

### 9.2 E2E Test Scenarios (Phase 1)

```typescript
// Example Playwright test
test('complete shopping flow', async ({ page }) => {
  // Homepage loads with products
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  
  // Navigate to product
  await page.getByTestId('product-card').first().click();
  await expect(page).toHaveURL(/\/products\//);
  
  // Select variant and add to cart
  await page.getByRole('button', { name: 'M' }).click();
  await page.getByRole('button', { name: /Add to Cart/i }).click();
  
  // Cart drawer opens with item
  await expect(page.getByTestId('cart-drawer')).toBeVisible();
  await expect(page.getByTestId('cart-item')).toHaveCount(1);
  
  // Proceed to checkout
  await page.getByRole('link', { name: /Checkout/i }).click();
  await expect(page).toHaveURL(/\/checkout/);
});
```

---

## 10. ERPNext Integration Specification (Phase 2)

### 10.1 Frappe API Authentication

```typescript
// src/lib/erpnext/client.ts

class ERPNextClient {
  private baseUrl: string;
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    this.baseUrl = process.env.ERPNEXT_URL!;
    this.apiKey = process.env.ERPNEXT_API_KEY!;
    this.apiSecret = process.env.ERPNEXT_API_SECRET!;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `token ${this.apiKey}:${this.apiSecret}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ERPNextError(response.status, await response.text());
    }

    return response.json();
  }

  async getItems(filters?: Record<string, any>) {
    return this.request('/resource/Item', {
      method: 'GET',
      // Add query params for filters
    });
  }

  async createSalesOrder(order: SalesOrderPayload) {
    return this.request('/resource/Sales Order', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
}
```

### 10.2 Data Transformation Layer

```typescript
// src/lib/erpnext/transformers.ts

// ERPNext Item → Frontend Product
export function transformItem(erpItem: ERPNextItem): Product {
  return {
    id: erpItem.name,
    slug: slugify(erpItem.item_name),
    name: erpItem.item_name,
    price: erpItem.standard_rate,
    currency: 'IDR',
    images: parseImageUrls(erpItem.image, erpItem.website_image),
    variants: extractVariants(erpItem.attributes),
    inStock: erpItem.stock_qty > 0,
    category: erpItem.item_group,
    description: erpItem.web_long_description || erpItem.description,
    details: parseItemDetails(erpItem),
  };
}
```

### 10.3 Caching Strategy

| Data | Cache Duration | Invalidation |
|---|---|---|
| Product list | 5 minutes | Webhook on Item save |
| Product detail | 5 minutes | Webhook on Item save |
| Categories | 1 hour | Manual purge |
| Shipping rates | 15 minutes | TTL-based |
| Cart | No cache | Real-time |
| Stock levels | 30 seconds | Near real-time |

---

## 11. Monitoring & Observability

### 11.1 Health Check Endpoint

```typescript
// src/app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || 'dev',
    uptime: process.uptime(),
    checks: {
      nextjs: 'healthy',
      erpnext: await checkERPNext(), // Phase 2
      database: await checkDatabase(), // Phase 2
    },
  };
  
  const isHealthy = Object.values(checks.checks).every(c => c === 'healthy');
  return Response.json(checks, { status: isHealthy ? 200 : 503 });
}
```

### 11.2 Key Metrics to Monitor

| Metric | Tool | Alert Threshold |
|---|---|---|
| **Uptime** | Uptime Robot | < 99.5% monthly |
| **Response Time (P95)** | Nginx logs + custom | > 3s |
| **Error Rate** | Sentry | > 1% of requests |
| **CPU Usage** | VPS monitoring | > 80% sustained |
| **Memory Usage** | VPS monitoring | > 85% |
| **Disk Usage** | VPS monitoring | > 90% |
| **SSL Expiry** | Uptime Robot | < 14 days |
| **Core Web Vitals** | Lighthouse CI / CrUX | Below "Good" threshold |

---

## 12. Environment Variables

```bash
# .env.example

# ─── App ───
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://meenossima.com
NEXT_PUBLIC_SITE_NAME=Meenossima
APP_VERSION=1.0.0

# ─── ERPNext (Phase 2) ───
ERPNEXT_URL=https://erp.meenossima.com
ERPNEXT_API_KEY=
ERPNEXT_API_SECRET=

# ─── Payment (Phase 2) ───
XENDIT_SECRET_KEY=
XENDIT_WEBHOOK_SECRET=
XENDIT_PUBLIC_KEY=

# ─── Shipping (Phase 2) ───
RAJAONGKIR_API_KEY=

# ─── Analytics ───
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=meenossima.com

# ─── WhatsApp ───
NEXT_PUBLIC_WHATSAPP_NUMBER=62XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Halo, saya tertarik dengan produk Meenossima!

# ─── Security ───
SESSION_SECRET=          # Min 32 characters, cryptographically random
CSRF_SECRET=             # Min 32 characters
CLOUDFLARE_TURNSTILE_SECRET=
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=
```

---

## 13. Glossary

| Term | Definition |
|---|---|
| **BFF** | Backend-for-Frontend — a thin API layer between the frontend and backend services |
| **CSP** | Content Security Policy — HTTP header that restricts resource loading |
| **CSRF** | Cross-Site Request Forgery — attack that tricks users into making unwanted requests |
| **ERPNext** | Open-source Enterprise Resource Planning software built on the Frappe framework |
| **Frappe** | Python web framework underlying ERPNext, provides REST API |
| **HSTS** | HTTP Strict Transport Security — forces HTTPS connections |
| **ISR** | Incremental Static Regeneration — Next.js feature for updating static pages |
| **LCP** | Largest Contentful Paint — Core Web Vital measuring visual load speed |
| **INP** | Interaction to Next Paint — Core Web Vital measuring responsiveness |
| **PCI DSS** | Payment Card Industry Data Security Standard |
| **SAQ-A** | Self-Assessment Questionnaire A — lowest PCI compliance tier (no card data handling) |
| **SSG** | Static Site Generation — pre-render pages at build time |
| **SSR** | Server-Side Rendering — render pages on each request |
| **UU PDP** | Indonesian Personal Data Protection Law |
| **WAF** | Web Application Firewall |
| **XSS** | Cross-Site Scripting — attack injecting malicious scripts |

---

*This specification is a living document. All security controls should be validated through regular audits and penetration testing.*
