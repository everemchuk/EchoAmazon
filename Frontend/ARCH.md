# Frontend Architecture

## Overview
The Frontend domain of EchoAmazon is built to deliver a high-performance, SEO-optimized, and interactive e-commerce experience. We utilize a **Hybrid Rendering** approach, leveraging **Astro** for static and server-side rendering, and **SolidJS** for highly interactive "islands".

## Tech Stack

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Core Framework** | **Astro** | Best-in-class performance, Island Architecture, built-in SSR/SSG support. |
| **Interactivity** | **SolidJS** | Lightweight, high-performance reactivity for interactive components (Cart, Checkout). |
| **Language** | **TypeScript** | Type safety and better developer experience. |
| **Styling** | **SASS** | Modular, powerful CSS pre-processing (Indented Syntax). |
| **State Management** | **Nano Stores** | Lightweight, framework-agnostic state sharing between Astro and SolidJS islands. |
| **Build Tool** | **Vite** | Fast HMR and optimized builds (powered by Astro). |
| **Testing** | **Vitest** | Fast unit and integration testing. |

## Directory Structure

```
Frontend/
├── public/              # Static assets (images, fonts, robots.txt)
├── source/
│   ├── components/      # UI Components
│   │   ├── common/      # Shared components (Buttons, Inputs) - mostly Astro
│   │   ├── islands/     # Interactive SolidJS components (Cart, Search)
│   │   └── layout/      # Header, Footer, Sidebar
│   ├── layouts/         # Page layouts (BaseLayout, AuthLayout)
│   ├── pages/           # File-based routing (Astro pages)
│   │   ├── api/         # API endpoints (if needed for BFF pattern)
│   │   ├── account/     # User account pages
│   │   ├── cart/        # Cart and checkout
│   │   ├── help/        # Help center
│   │   ├── home/        # Home page
│   │   ├── login/       # Authentication
│   │   ├── news/        # News and articles
│   │   ├── store/       # Store listing and categories
│   │   │   ├── [category].astro
│   │   │   └── product/
│   │   │       └── [slug].astro
│   ├── styles/          # Global styles and SASS variables
│   │   ├── _vars.sass   # Colors, fonts, breakpoints
│   │   └── global.sass  # Reset and global styles
│   ├── state/           # Utilities, API clients, types
│   │   ├── api.ts       # Fetch wrappers for Backend API
│   │   └── store.ts     # Nano Stores definitions
│   └── env.d.ts         # TypeScript environment definitions
├── astro.config.mjs     # Astro configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Architectural Patterns

### 1. Islands Architecture
We use Astro's **Islands Architecture** to hydrate only the interactive parts of the page.
- **Static (Default):** Header, Footer, Product Details (Text/Images), Marketing Pages.
- **Interactive (SolidJS):** Add to Cart button, Mini-Cart, Checkout Form, Search Bar, User Profile.

**Example Usage:**
```astro
---
// ProductPage.astro
import ProductInfo from '../components/ProductInfo.astro'; // Static
import AddToCart from '../components/islands/AddToCart.tsx'; // Interactive
---
<Layout>
  <ProductInfo product={product} />
  <AddToCart client:visible product={product} />
</Layout>
```

### 2. State Management (Nano Stores)
Since Astro components don't share state directly with hydrated islands, we use **Nano Stores** for global state (e.g., Cart contents, User Session).

- **Stores** are defined in `source/state/store.ts`.
- **Astro** can read stores during SSR.
- **SolidJS** components subscribe to stores for real-time updates.

### 3. Hybrid Rendering
We will configure Astro with the **Node adapter** to enable hybrid rendering:
- **Static by Default:** Most pages are pre-rendered.
- **Server-Side Rendered (SSR):** Specific pages opt-in via `export const prerender = false`.

### 4. Styling Strategy
- **Global Styles:** `source/styles/global.sass` for resets and typography.
- **Component Styles:** Scoped `<style lang="sass">` blocks within `.astro` files.
- **SolidJS Styles:** CSS Modules or SASS imports.

## Development Workflow
1.  **Install Dependencies:** `npm install`
2.  **Dev Server:** `npm run dev`
3.  **Build:** `npm run build`
4.  **Preview:** `npm run preview`

