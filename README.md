# Order Tracking Page

An order teacking page, that opens the order based on on the ID of the order, the LINK wil be send to the customer via sms it will, once opeig in the browser user can track his order

## 🚀 What Was Built

### Core Application Features

**Order Tracking System and Why I Thought Its needed**
- Real-time order status tracking with visual progress indicators => Helps reduce customer anxiety by clearly showing where the order is in the process.
- Dynamic delivery time calculations with countdown timers => Keeps users informed of ETA, improving transparency and trust.
- Comprehensive order details including items, pricing, and delivery information => Allows customers to verify their order and delivery details.
- Driver information display with contact options and ratings => Builds trust by showing who is delivering the orde
- Responsive design optimized for mobile, tablet, and desktop devices => Ensures a smooth user experience on any device, especially phones (via SMS link).


### Architecture Decisions

**Component Structure**
```
src/
├── components/
│   ├── OrderTracking/     # Main tracking component
│   ├── navbar/            # Navigation with mobile support
│   └── footer/           # Site footer
├── data/
│   └── orderData.ts      # Type definitions and mock data
├── hooks/
│   └── useFolderSize.ts  # Responsive sizing hook
└── assets/
    └── images/           # Static assets
```


## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Usage

1. Navigate to the home page to see example order IDs
2. Use URLs like `/order-tracking/ORD-2024-001234` to track specific orders
3. View real-time status updates and delivery information
4. Contact drivers or track live delivery (UI ready for backend integration)

