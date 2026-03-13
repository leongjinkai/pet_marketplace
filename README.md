# Pet Marketplace

A basic marketplace application for listing and discovering pets, built with **Next.js**.

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node) or another package manager

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` – Next.js App Router entrypoints (layouts, pages, etc.)
- `public/` – Static assets
- `next.config.ts` – Next.js configuration
- `tsconfig.json` – TypeScript configuration

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Create an optimized production build
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI**: React
- **Components**: Shadcn

## Roadmap / TODO

### Pet Listing Page

- [x] Fetch Pets
- [x] Render each pet as a card/row
- [ ] Unavailable pets should be visually distinguishable

### Filters (Support species, size and availability query parameters)

- [ ] Filters update display results
- [ ] UI handle loading and error states

### Pet Detail View

- [ ] When user select a pet from listing page, show a detail view (Image, Details, Inquire CTA)
- [ ] If pet unavailable, inquiry action should be disabled

### Inquiry Form

- [ ] Submit Inquiry Form
- [ ] Form Validation
- [ ] Handle Form submission Success with inquiryId, receivedAt, Pet name and image
- [ ] Handle Form submission Error
- [ ] Prevent Duplicate Submissions when request is in flight

## Assumptions Made

1. Options for the filters are called and received separately from another endpoint. (Currently the types in listing-types are assumed to be all the size, species and availability options)
2. Since I am routing to a dedicated webpage for each pet detail and there is no unique pet_listing_id for me to set as the route parameter, I will assume the hash I have created from the pet details will be its unique identifier

## Key Tradeoffs/Possible Further improvements
