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
- [x] Unavailable pets should be visually distinguishable

### Filters (Support species, size and availability query parameters)

- [x] Filters update display results
- [x] UI handle loading and error states

### Pet Detail View

- [x] When user select a pet from listing page, show a detail view (Image, Details, Inquire CTA)
- [x] If pet unavailable, inquiry action should be disabled

### Inquiry Form

- [x] Submit Inquiry Form
- [x] Form Validation
- [x] Handle Form submission Success with inquiryId, receivedAt, Pet name and image - popup dialog
- [x] Handle Form submission Error - throw browser error
- [x] Prevent Duplicate Submissions when request is in flight - Button is in loading state

## Assumptions Made

1. Options for the filters are called and received separately from another endpoint. (Currently the types in listing-types are assumed to be all the size, species and availability options)

## Key Tradeoffs/Possible Further improvements
