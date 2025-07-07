# Product Listing Application

## Overview

This is a full-stack product listing application that displays a collection of products along with dynamically calculated prices based on real-time gold prices. The entire project is implemented using **Next.js**, including both API routes and frontend UI components.

---

## Features

### ✅ Backend (Mock API)

- Serves product data from a local JSON file via Next.js API routes

- Calculates product price using the formula:

  ```
  Price = (popularityScore + 1) * weight * goldPrice
  ```

- Fetches real-time gold price (USD/gram) from an external API

- To handle the third-party API's strict request limit (only 100 requests allowed), gold prices are cached in-memory. This prevents frequent external calls and ensures the app remains within usage limits.

- Optional filtering support (price range, popularity score)

### ✅ Frontend (Product Display)

- Built with **Next.js** for full-stack functionality
- Fetches and displays product data from internal API routes
- Responsive design matching the provided mockup
- Displays:

  - Product name
  - Dynamically calculated price (USD)
  - Weight
  - Popularity score (converted to a 5-point scale)

- Color picker: changes displayed product image based on selected color
- Carousel: Swipable & arrow-navigable on both mobile and desktop

---

## Technologies Used

### Stack

- Framework: **Next.js** (API + UI)
- Language: TypeScript
- CSS: Tailwind CSS
- External API: [MetalPriceAPI](https://metalpriceapi.com/)
- Hosting: Vercel

---

## Setup & Installation

```bash
cd my-app
npm install
npm run dev
```

---

## API Endpoints (via Next.js API Routes)

### `GET /api/products`

Returns all products with calculated prices.

### `GET /api/products?minPrice=100&maxPrice=500&minScore=3`

(Optional) Filters products based on price range and popularity score.

---

## Future Improvements

- **Admin Panel with Authentication**: Implement login-protected admin features to allow product addition, deletion, and updates.
- **Database Integration**: Move from static JSON to a real database like PostgreSQL or MongoDB.
- **E-commerce Capabilities**: Add shopping cart functionality, checkout flow, and payment gateway integration (e.g., Stripe, PayPal).
- **Secure Payments**: Integrate secure and scalable payment methods for real transactions.
- **Order Management**: Add order history, user profiles, and admin dashboards for managing orders and users.

---
