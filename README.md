# Tushar Visuals — Digital Portfolio

A futuristic, high-performance 3D portfolio website for **Tushar Visuals**, Graphic Designer and WordPress Web Designer. Engineered with React 19, TypeScript, Three.js, Tailwind CSS v4, and Motion, this platform communicates digital craftsmanship, technical authority, and design precision.

---

## Table of Contents

1. [Website Purpose & Overview](#website-purpose--overview)
2. [Design Concept & Visual Direction](#design-concept--visual-direction)
3. [Technology Stack](#technology-stack)
4. [Key Features & Modules](#key-features--modules)
5. [Portfolio Architecture (Graphic & Website Design)](#portfolio-architecture-graphic--website-design)
6. [3D Canvas & Micro-Interaction Engine](#3d-canvas--micro-interaction-engine)
7. [Project Structure](#project-structure)
8. [Getting Started (Local Development)](#getting-started-local-development)
9. [Content Management & Maintenance](#content-management--maintenance)
   - [Updating Portfolio Projects & Mockups](#updating-portfolio-projects--mockups)
   - [Updating Services & Capabilities](#updating-services--capabilities)
   - [Updating Contact Details & Social Links](#updating-contact-details--social-links)
   - [Updating Testimonials & Experience](#updating-testimonials--experience)
10. [Performance, SEO & Accessibility](#performance-seo--accessibility)
11. [License & Credits](#license--credits)

---

## Website Purpose & Overview

**Tushar Visuals** is the digital flagship portfolio for a multidisciplinary creative specializing in:
- **Graphic Design**: Monolithic visual identities, high-fidelity stationery & packaging mockups, marketing collateral, and editorial poster systems.
- **Website Design & Development**: High-conversion WordPress architectures, modern Elementor implementations, responsive SaaS web designs, and interactive web experiences.

The portfolio is designed to immediately establish credibility with enterprise clients, venture-backed startups, and creative agencies, ensuring that prospective clients instantly perceive exceptional taste and technical execution.

---

## Design Concept & Visual Direction

| Dimension | Implementation |
| :--- | :--- |
| **Color Palette** | **Obsidian Black** (`#000000`, `#0A0A0A`, `#121212`) paired with **Laser Red** (`#FF2A2A`) as an intentional focal accent, complemented by crisp neutral typography (`#FFFFFF` to `#A3A3A3`). |
| **Typography** | **Syne** for bold, avant-garde display headings; **Space Grotesk** for technical telemetry and monospace details; **Inter** for clean, readable body copy. |
| **Aesthetic Theme** | **Cyberpunk Luxe & Modern Minimalist**: Deep blacks, subtle ambient glows, glassmorphism cards, and mathematical negative space without visual clutter. |
| **Interactive Cursor** | Custom spring-interpolated cursor with a minimal 7px resting dot, 20px pointer ring, and a 22px contextual pill that labels interactions (`VIEW`, `FILTER`, `CLOSE`, `NEXT`). |
| **Hover System** | Magnetic buttons with spring displacement, 3D perspective card tilts with radial spotlighting, and seamless image zoom reveals. |

---

## Technology Stack

### Frontend Core
- **React 19** (`^19.0.1`): Next-generation component architecture with concurrent rendering.
- **TypeScript 5.8** (`~5.8.2`): Strict type safety across all interfaces, data schemas, and event hooks.
- **Vite 6** (`^6.2.3`): Sub-millisecond HMR build tool and production bundler.
- **Tailwind CSS v4** (`^4.1.14`): Modern utility-first CSS engine with `@tailwindcss/vite`.

### Motion & 3D WebGL
- **Three.js** (`^0.186.0`): WebGL 3D rendering engine driving the interactive obsidian geometric core, glowing ruby wireframe rings, and orbital particle field.
- **Motion (Framer Motion v12)** (`^12.23.24`): Spring-physics animations, scroll-triggered reveals, and layout state transitions.

### Icons & Assets
- **Lucide React** (`^0.546.0`): Clean, featherweight vector iconography.
- **Google Fonts CDN**: Pre-connected Syne, Space Grotesk, and Inter font weights.

### Production Server
- **Express 4** (`^4.21.2`): Optional custom Node.js full-stack proxy runtime for Cloud Run and containerized environments.

---

## Key Features & Modules

1. **Glassmorphic Navigation Bar (`Navbar.tsx`)**
   - Active section tracking via intersection observers.
   - Real-time "Available for Work" status indicator.
   - Direct CTA launching the project commission drawer.

2. **Real-time 3D Hero Stage (`Hero.tsx` & `ThreeDHeroCanvas.tsx`)**
   - Interactive Three.js WebGL canvas responding smoothly to mouse coordinates.
   - Metallic obsidian faceted dodecahedron core with floating wireframe ruby accents.
   - Telemetry statistics chips and dual call-to-action buttons with magnetic physics.

3. **Curated Portfolio Showcase (`Portfolio.tsx`)**
   - Filterable strictly by **All**, **Graphic Design**, and **Website Design**.
   - Dynamic item counts on filter pills (`All (6)`, `Graphic Design (3)`, `Website Design (3)`).
   - 3D perspective tilt cards with cursor-driven radial spotlight highlights.
   - "Inspect Mockups" quick trigger revealing mockups count.

4. **In-Depth Case Study Modal (`CaseStudyModal.tsx`)**
   - Comprehensive editorial breakdown: Brief, Friction/Challenge, Strategy, Execution Checklist, and Final Outcome.
   - **High-Resolution Mockup Showcase**: Curated multi-image gallery with click-to-expand lightbox preview.
   - Direct "Commission Similar Project" CTA and seamless "Next Case Study" cycle navigation.

5. **About & Design Philosophy (`AboutSection.tsx`)**
   - Creative story, core design values (Precision, Functionality, Elevation, Longevity), and downloadable CV action.

6. **Skills & Capabilities Matrix (`SkillsSection.tsx`)**
   - Categorized proficiencies across Graphic Design, WordPress/Web Development, UI/UX, and Strategic Tooling.

7. **Services & Deliverables Suite (`ServicesSection.tsx`)**
   - Transparent service cards displaying deliverables, software toolchains, and scope outlines.

8. **Strategic Process Roadmap (`ProcessSection.tsx`)**
   - 4-phase execution framework: Discovery, Architecture, Refinement, and Launch.

9. **Client Testimonials (`TestimonialsSection.tsx`)**
   - Interactive review slider with verified client quotes, metrics, and star ratings.

10. **Interactive Hire Me Drawer (`HireMeModal.tsx`)**
    - Commission inquiry form with structured project type selector, budget tiers, and timeline specifications.

11. **Direct Contact Section & Footer (`ContactSection.tsx` & `Footer.tsx`)**
    - Direct inquiry form, email address, timezone/availability details, social media pills, and magnetic back-to-top button.

---

## Portfolio Architecture (Graphic & Website Design)

All portfolio work is strictly organized into two complementary disciplines:

```
Portfolio Projects
├── Graphic Design
│   ├── Project Alpha (Robotics Brand & Collateral System — Stationery Mockups)
│   ├── Project Red (Cyberpunk Editorial Posters & Advertising Graphics)
│   └── Project Mono (Geometric Specimen Book & Print Graphics)
└── Website Design
    ├── Project Nova (Spatial Audio Flagship E-Commerce Website)
    ├── Project Orbit (Architectural Atelier Portfolio Website)
    └── Project Flux (Dark FinTech Protocol & SaaS Web Platform)
```

Each project adheres to the `Project` interface defined in `src/types.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Graphic Design' | 'Website Design';
  year: string;
  client: string;
  mockupType?: string; // e.g. "Stationery & Collateral Mockup"
  thumbnail: string;
  featuredImage: string;
  shortDescription: string;
  overview: string;
  challenge: string;
  strategy: string;
  process: string[];
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  gallery: string[];
  liveUrl?: string;
}
```

---

## 3D Canvas & Micro-Interaction Engine

### 1. Three.js WebGL Scene
Located in `src/components/ThreeDHeroCanvas.tsx`:
- **Geometry**: Central icosahedron core, inner wireframe cage, outer orbital rings, and background particle cloud.
- **Lighting**: Multidirectional lighting rig with an ambient base, key white light, and crimson point light (`#FF2A2A`) with exponential falloff.
- **Mouse Dynamics**: Raycaster-free lerped vector tracking that rotates the 3D model toward the user's cursor with soft damping.
- **Resource Cleanup**: Geometry, materials, and renderer contexts are automatically disposed on component unmount to prevent WebGL memory leaks.

### 2. Custom Elegant Cursor
Located in `src/components/CustomCursor.tsx`:
- **Resting State**: Minimal 7px crimson dot with subtle glow.
- **Hovering Interactive Controls**: Expands to a delicate 20px ring.
- **Contextual Label Capsule**: Expands into a compact 22px-tall pill badge with dynamic width and micro-monospace label (`VIEW`, `FILTER`, `GOTO`, `NEXT`, `CLOSE`).
- **Touch Safe**: Automatically hides on touch-enabled devices to preserve native mobile UX.

### 3. Magnetic Physics
Located in `src/components/MagneticButton.tsx`:
- Bound via Framer Motion's `useMotionValue` and `useSpring`.
- Translates elements toward the cursor up to an offset threshold (`magneticStrength = 0.35`) and snaps back smoothly on mouse leave.

---

## Project Structure

```
tushar-visuals/
├── index.html                     # HTML5 entry point & SEO meta tags
├── metadata.json                  # Application capabilities & title metadata
├── package.json                   # Scripts, dependencies, and engine requirements
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Vite + Tailwind CSS v4 compiler setup
├── src/
│   ├── main.tsx                   # React root mount point
│   ├── App.tsx                    # Primary layout coordinator & state manager
│   ├── index.css                  # Global Tailwind CSS directives & CSS variables
│   ├── types.ts                   # TypeScript interfaces & domain types
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky header with navigation & hire trigger
│   │   ├── Hero.tsx               # Hero section layout & telemetry chips
│   │   ├── ThreeDHeroCanvas.tsx   # Three.js WebGL 3D interactive core
│   │   ├── Portfolio.tsx          # Filterable project grid & 3D tilt cards
│   │   ├── CaseStudyModal.tsx     # Fullscreen case study & mockup lightbox
│   │   ├── AboutSection.tsx       # Studio profile, values & design philosophy
│   │   ├── SkillsSection.tsx      # Graphic & web skills matrix
│   │   ├── ServicesSection.tsx    # Transparent service offerings & deliverables
│   │   ├── ProcessSection.tsx     # 4-stage creative methodology roadmap
│   │   ├── WhyWorkWithMe.tsx      # Value proposition & client guarantees
│   │   ├── TestimonialsSection.tsx# Verified client review carousel
│   │   ├── ContactSection.tsx     # Lead capture form & direct contact links
│   │   ├── Footer.tsx             # Studio sign-off, legal & back-to-top
│   │   ├── CustomCursor.tsx       # Spring-interpolated custom cursor
│   │   ├── MagneticButton.tsx     # Reusable magnetic spring wrapper
│   │   └── HireMeModal.tsx        # Project inquiry commission modal
│   ├── data/
│   │   └── portfolioData.ts       # Single source of truth for projects & content
│   └── images/
│       └── logo.jpg               # Official primary logo & favicon asset
├── public/
│   ├── favicon.jpg                # Browser tab favicon
│   └── logo.jpg                   # Root-served brand logo asset
```

---

## Getting Started (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### Installation & Launch

1. **Clone or navigate to the repository**:
   ```bash
   cd tushar-visuals
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

4. **Verify TypeScript types & linting**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

---

## Content Management & Maintenance

### Updating Portfolio Projects & Mockups

All project entries reside in `src/data/portfolioData.ts`. To add or edit a project, modify or push a new object into the `PROJECTS` array:

```typescript
// src/data/portfolioData.ts
{
  id: 'my-new-project',
  title: 'Brand Modernization',
  subtitle: 'Full Identity & Digital Flagship',
  category: 'Graphic Design', // Must be 'Graphic Design' or 'Website Design'
  year: '2026',
  client: 'Studio Apex',
  mockupType: 'Stationery & Collateral Mockup',
  thumbnail: 'https://your-image-url.com/thumbnail.jpg',
  featuredImage: 'https://your-image-url.com/hero-mockup.jpg',
  shortDescription: 'One or two sentence summary displayed on portfolio cards.',
  overview: 'In-depth client brief and project background.',
  challenge: 'The obstacles or visual fragmentation addressed.',
  strategy: 'Creative vision and architectural approach.',
  process: [
    'Research and visual benchmarking',
    'Typographic pairing and color hierarchy',
    '3D Mockup staging and art direction'
  ],
  solution: 'The final design outcome delivered to the client.',
  results: [
    { label: 'Conversion Lift', value: '+84%' },
    { label: 'Time on Page', value: '4m 12s' }
  ],
  tags: ['Graphic Design', 'Stationery', 'Typography'],
  gallery: [
    'https://your-image-url.com/mockup-1.jpg',
    'https://your-image-url.com/mockup-2.jpg'
  ],
  liveUrl: 'https://example.com' // Optional external URL
}
```

> **Image Tip**: High-resolution 16:9 images are recommended for `featuredImage` and 4:3 images for `gallery` items. You can use assets stored in `src/images/` or host them on cloud CDNs (Unsplash, Cloudinary, etc.).

---

### Updating Services & Capabilities

Modify the `SERVICES` array in `src/data/portfolioData.ts`:
- Change `title`, `tagline`, and `description`.
- Update `deliverables` list items.
- Update `tools` pills (e.g., `['Photoshop', 'Illustrator', 'WordPress', 'Figma']`).

---

### Updating Contact Details & Social Links

1. **Email & Availability**:
   - In `src/components/ContactSection.tsx`, update:
     - Direct email link: `<a href="mailto:hello@tusharvisuals.com">`
     - Timezone and guaranteed response time.
2. **Social Media Profiles**:
   - In `src/components/ContactSection.tsx` and `src/components/Footer.tsx`, locate the social channel lists.
   - Add your profile URLs to the respective platform links (`Behance`, `Dribbble`, `LinkedIn`, `Instagram`, `Twitter / X`).

---

### Updating Testimonials & Experience

- **Client Reviews**: Update the `TESTIMONIALS` array in `src/data/portfolioData.ts`.
- **Career Timeline / Experience**: Update `RESUME_EXPERIENCES` in `src/data/portfolioData.ts`.

---

### Updating the Brand Logo & Favicon

The official logo is located at `src/images/logo.jpg`.
- To update the primary brand logo across the Navbar, Footer, About section, and Hire Me modal, replace `src/images/logo.jpg` with your new image.
- To update the browser tab favicon, replace `public/favicon.jpg` and `public/logo.jpg`.
- A square aspect ratio (1:1) with at least 512×512px resolution is recommended for optimal sharpness across Retina and high-DPI displays.

---

## Performance, SEO & Accessibility

### Performance
- **Zero Heavy UI Kits**: Pure Tailwind CSS v4 styling without heavy runtime CSS-in-JS dependencies.
- **Lazy Loaded Modals**: The Case Study Modal and Hire Me Drawer render conditionally with AnimatePresence to minimize initial DOM size.
- **Hardware-Accelerated WebGL**: Three.js canvas utilizes `ACESFilmicToneMapping` and caps `pixelRatio` to `2` to preserve high frame rates on high-DPI displays.
- **Scroll Lock Cleanup**: Dynamic overflow lock ensures smooth scrolling restoration upon modal dismissal.

### SEO Best Practices
- Semantic HTML tags: `<main>`, `<section>`, `<header>`, `<nav>`, `<footer>`.
- OpenGraph meta tags configured in `index.html`:
  - `og:title`: "Tushar Visuals — Graphic Designer & WordPress Web Designer"
  - `og:description`: "Bold visual identities, modern websites, and memorable digital experiences."
  - `og:type`: "website"
  - Twitter Card: `summary_large_image`

### Accessibility (a11y)
- **Contrast Ratios**: Body copy and headlines meet WCAG AA contrast against obsidian backgrounds.
- **Focus Outlines & Interactive States**: Visible focus-visible rings for keyboard-only accessibility.
- **Semantic Buttons & Links**: All interactive elements use native `<button>` and `<a>` elements with appropriate ARIA attributes.
- **Reduced Motion Friendly**: Native mobile touch detection automatically scales down or bypasses the custom cursor.

---

## License & Credits

- **Design & Concept**: Tushar Visuals
- **Code & Implementation**: Crafted with React, TypeScript, and Three.js
- **Open Source Assets**: Icons provided by [Lucide](https://lucide.dev/), 3D engine powered by [Three.js](https://threejs.org/).

---

*For inquiries or collaboration, contact **hello@tusharvisuals.com**.*
