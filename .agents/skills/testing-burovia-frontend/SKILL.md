---
name: testing-burovia-frontend
description: Test the Burovia e-commerce frontend end-to-end. Use when verifying UI cosmetic changes, cart interactions, or responsive design.
---

# Testing Burovia Frontend

## Prerequisites

- Node.js installed
- Frontend dependencies installed: `cd frontend && npm install`
- Backend dependencies installed: `cd backend && npm install` (needed for mock server)

## Devin Secrets Needed

No secrets required for frontend visual testing. Stripe test keys are only needed for checkout flow testing.

## Setup

### 1. Start Frontend Dev Server

```bash
cd frontend && npm run dev
```

Runs on `http://localhost:5173`.

### 2. Mock API Server (when MySQL is unavailable)

The real backend requires MySQL. When unavailable, start a mock API from the `backend/` directory (which has express/cors installed):

```bash
cd backend && node -e "
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/api/products', (req, res) => res.json({ success: true, products: [
  {id:1,name:'Repose-poignet ergonomique',slug:'repose-poignet',short_description:'Description.',price_cents:2490,is_featured:true,delivery_estimate:'Livraison 5-10 jours',category_name:'Confort & posture',image_url:null,image_alt:null},
  {id:2,name:'Support PC portable',slug:'support-pc',short_description:'Description.',price_cents:1990,is_featured:true,delivery_estimate:'Livraison 5-10 jours',category_name:'Confort & posture',image_url:null,image_alt:null},
  {id:3,name:'Support gobelet casque',slug:'support-gobelet',short_description:'Description.',price_cents:1490,is_featured:false,delivery_estimate:'Livraison 5-10 jours',category_name:'Organisation du bureau',image_url:null,image_alt:null},
  {id:4,name:'Organisateur cables',slug:'organisateur-cables',short_description:'Description.',price_cents:990,is_featured:false,delivery_estimate:'Livraison 5-10 jours',category_name:'Organisation du bureau',image_url:null,image_alt:null}
]}));
app.listen(5000, () => console.log('Mock API on 5000'));
"
```

The frontend fetches from `http://localhost:5000/api/products` via the Vite proxy or CORS.

## What to Test

### Visual Sections (scroll through the single-page app)

1. **Header** — Logo "Buro**via**" with amber accent, nav links (Catalogue, Confort, Organisation, Foot 2026), cart badge, sticky on scroll
2. **Hero** — Gradient text title, sparkle badge, 2 CTA buttons, 3 stats (FR·BE·LU, Stripe, 5-10 jours)
3. **Promo Foot 2026** — Dark gradient background, gold badge, title and description
4. **Product Cards** — Grid layout, POPULAIRE badges on featured, category labels, prices in euros, Ajouter buttons
5. **Cart** — Items with name/price/quantity, +/- buttons, Retirer link, Total, Vider/Commander buttons
6. **Trust Section** — 3 cards: Livraison suivie, Paiement sécurisé, Boutique française
7. **Newsletter** — Warm gradient background, email input, S'inscrire button
8. **Footer** — 4 columns (brand, boutique, informations, légal), copyright, Web RG Est link

### Cart Interactions

1. Click "Ajouter" on a product → cart badge increments, button briefly shows "Ajouté" in green
2. Click "+" → quantity increases, subtotal and total update
3. Click "-" → quantity decreases; at 1, clicking "-" removes the item
4. Click "Retirer" → removes item from cart
5. Click "Vider" → empties entire cart, shows "Votre panier est vide" with catalogue link

### Responsive Design

Use Chrome DevTools device toggle (F12 → device icon) to test at 400px width:
- Navigation links hidden, hamburger menu icon visible
- Product cards in single column
- Trust cards stacked vertically
- Footer columns stacked
- Hero title font reduces

## Limitations

- **Stripe checkout** requires real backend + MySQL + Stripe CLI (`stripe listen --forward-to http://localhost:5000/webhook`). Cannot be tested with mock API alone.
- **Product images** may not exist in `frontend/public/images` — placeholder text will show instead.
- **Newsletter submit** is visual only (no backend handler).
- **Legal page links** in footer may point to non-existent pages.

## Lint & Build Checks

```bash
cd frontend && npx eslint src/
cd frontend && npx vite build
```

Both must pass with no errors before merging.
