# JobAI V2 — Future-Tech Design Direction & Visual Contract

## 1. Vision & Identity
JobAI V2 is a **Career Intelligence Operating System**. Its UI communicates intelligence not through sci-fi decor (neon, glassmorphism, WebGL, particle storms, or emojis), but through:
- **Relationships**: `IDENTITY (Profile) → UNDERSTANDING (Skills) → MATCHING (Roles) → INSIGHT (Gaps) → ACTION (Opportunities)`
- **Behavior & Context**: Embedded Attio-style signal cards showing explicit evidence chains.
- **Precision**: Linear/Cursor-level typographic hierarchy, tight tracking, crisp borders, and calm whitespace.

---

## 2. Color System & Signal Palette

### Base Surfaces (Light-First Primary)
- **Background**: `#F8FAFC` (Slate 50 cool neutral)
- **Surface Cards**: `#FFFFFF` (Crisp White)
- **Hover Surfaces**: `#F1F5F9` (Slate 100)
- **Primary Borders**: `#E2E8F0` (Slate 200) / `#CBD5E1` (Slate 300)
- **Text Hierarchy**: `#0F172A` (Slate 900 Primary), `#64748B` (Slate 500 Muted)

### Intelligence Signals (Restrained Accents)
- **Primary Enterprise**: `#1E40AF` / `#2563EB` (Electric Enterprise Blue)
- **AI Active Signal**: `#06B6D4` (Cyan Intelligence)
- **System Logic Signal**: `#4F46E5` (Indigo Logic)
- **Trajectory Signal**: `#7C3AED` (Deep Violet Trajectory)
- **Success Match**: `#059669` (Emerald Match)
- **Growth Gap**: `#D97706` (Amber Growth Signal)

---

## 3. Typography Scale
- **Display Headings**: `Outfit` (font-heading), tight tracking (`-0.02em`), bold weights (600, 700, 800).
- **Body & Controls**: `Inter` (font-sans), crisp legibility (400, 500, 600).
- **Technical & Metrics**: `JetBrains Mono` (font-mono) for system status, vector scores, and node markers.
- **Rule**: NO EMOJIS. All iconography must use clean, professional `lucide-react` vector graphics.

---

## 4. Motion & Performance Guidelines
1. **CSS & SVG Only**: Zero external animation frameworks (no Framer Motion).
2. **Keyframes**: Native CSS `@keyframes` for pulse, node highlight, and scanline effects.
3. **SVG Beams**: Animated `stroke-dasharray` and `stroke-dashoffset` for connection data flows.
4. **Accessibility**: Full compliance with `@media (prefers-reduced-motion: reduce)`.

---

## 5. Responsive Visualization Grammar
- **Desktop (1024px +)**: Spatial radial node system (`IntelligenceCore`).
- **Tablet (768px - 1023px)**: Condensed spatial radial layout.
- **Mobile (360px - 767px)**: **Sequential Vertical Intelligence Pipeline**:
  `PROFILE` ↓ `UNDERSTANDING` ↓ `ROLE FIT` ↓ `OPPORTUNITIES` ↓ `ACTION`.
