# Verdaura • Herbal Wellness & Handcrafted Botanical Remedies

A modern, high-performance luxury botanical e-commerce and wellness storefront built with **Vite**, **React 18**, **TypeScript**, and **Tailwind CSS**.

Featuring handcrafted essential oils, concentrated herbal remedies, Bach flower essences, and personalized consultation appointments from Littleton, Colorado.

---

## 🌿 Brand & Aesthetic

- **Brand Name**: Verdaura (Herbal Wellness)
- **Visual Identity**: Clean botanical green line-art leaf & caring hand emblem, Cormorant Garamond serif headings, DM Sans body typography, and warm ivory/cream background palette (`#FAF7F2`).
- **Heritage**: Formulated in Littleton, Colorado with pure, concentrated whole-plant extracts.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates an optimized static production bundle in `dist/`.

---

## 📁 Key Directories

```
Verdaura/
├── public/
│   ├── images/              # High-resolution botanical photography & Verdaura logo
│   └── videos/              # Gentle ambient hero videos
├── src/
│   ├── components/
│   │   ├── home/            # HeroSection, HolisticComfort, PhilosophyStory, etc.
│   │   └── layout/          # Navbar, Footer, AnnouncementBar
│   ├── data/
│   │   └── verdauraData.ts  # Catalog data, services, reviews, and business info
│   ├── pages/
│   │   ├── HomePage.tsx     # Editorial luxury storefront homepage
│   │   ├── ProductsPage.tsx # Dynamic filtering, category browsing & search
│   │   └── ProductDetailPage.tsx # Rich botanical details, reviews, cart selection
│   ├── types/
│   │   └── verdaura.ts      # TypeScript interfaces for products and offerings
│   ├── App.tsx              # React router configuration
│   └── main.tsx             # Application entrypoint
└── tailwind.config.js       # Curated botanical & earth-tone design tokens
```
