# Soothers • Fullstack Engineering & Agent Skills Hub

An interactive, high-performance web application built with **Vite**, **React 18**, **TypeScript**, and **Tailwind CSS**. It serves as an executive command center, interactive explorer, and directive generator for the **87 agent playbooks and engineering standards** in this repository.

---

## 🌟 Architecture & Features

1. **87 Categorized Engineering Playbooks**:
   - **Core Foundations** (3 standards): Fullstack Backend Engineering, Responsive Design Mastery, Website Creation & Design.
   - **Frontend Engineering & UI/UX** (21 playbooks): Design systems, brand assets, Vercel React patterns, view transitions, responsive standards.
   - **Backend Systems & Cloud** (63 playbooks): Cloudflare Edge (Workers, Durable Objects, Turnstile, KV/D1), Better-Auth (2FA, Org, Identity), Sentry observability, automated debugging, and security auditing.

2. **Real-Time Live Search & Multi-Token Filtering**:
   - Instant filtering across titles, subdomains, trigger phrases, markdown contents, and tags.
   - Subcategory pill selectors and multi-criteria sorting (A-Z, Category, Tag depth).

3. **Interactive Skill Detail & Markdown Modal**:
   - Strictly conforms to modal UX guidelines: keyboard navigation (`Esc` to close, `ArrowLeft` / `ArrowRight` to step through playbooks).
   - Scroll-locked background with mobile-friendly viewports (`h-[92dvh]`).
   - Native code syntax styling with one-click copy buttons for prompt directives and file paths.

4. **Layered Architecture Matrix**:
   - Visual 5-layer system overview organizing playbooks from UI Presentation down through Edge Compute, Auth/Identity, and Sentry Observability.

5. **Interactive Agent Prompt Generator**:
   - Compose tailored task directives for any skill playbook with a single click.

6. **Local Persistence**:
   - Bookmarks and saved playbooks persist seamlessly across sessions via `localStorage`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Vite Dev Server
```bash
npm run dev
```
Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken static bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
Soothers/
├── Backend/                         # 63 backend skills & policies
├── Frontend/                        # 20 frontend skills & UI guidelines
├── fullstack-backend-engineering/   # Core fullstack skill
├── responsive-design-mastery/       # Responsive design skill
├── website-creation-design/         # Website creation skill
├── src/
│   ├── components/
│   │   ├── ArchitectureMatrix.tsx   # 5-layer system architecture overview
│   │   ├── CategoryFilter.tsx       # Tab bar & subcategory filters
│   │   ├── FavoritesDrawer.tsx      # Saved playbooks drawer
│   │   ├── Footer.tsx               # Footer with quick links
│   │   ├── HeroSection.tsx          # Stat counters & instant search
│   │   ├── InteractivePromptBuilder.tsx # Prompt composition tool
│   │   ├── MarkdownViewer.tsx       # Custom high-performance markdown parser
│   │   ├── Navbar.tsx               # Header bar & view switcher
│   │   ├── SkillCard.tsx            # Playbook preview cards
│   │   └── SkillDetailModal.tsx     # Full modal with keyboard navigation
│   ├── data/
│   │   └── skillsData.ts            # Parsed & structured skill database (87 skills)
│   ├── App.tsx                      # Root application logic & state
│   ├── index.css                    # Tailwind CSS directives & theme styles
│   └── main.tsx                     # React DOM entry
├── index.html                       # HTML5 template with Google Fonts (Outfit & JetBrains Mono)
├── tailwind.config.js               # Tailwind design tokens & animations
├── vite.config.ts                   # Vite bundler configuration
└── package.json                     # NPM project scripts & dependencies
```
