# BlueWave Tech Help - Frontend

A modern, professional tech support service website built with React and Tailwind CSS. This frontend application provides an easy way for customers to book tech assistance appointments and learn about available services.

## 🚀 Features

- **Customer-Facing Pages**: Home, About, Services, and Contact pages
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Modern UI**: Clean, professional design using the BlueWave brand colors
- **React Router**: Client-side routing for seamless navigation
- **TypeScript**: Type-safe development for better code quality

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v6** - Client-side routing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🏃 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # Reusable React components
│   │   └── Navigation.tsx
│   ├── pages/       # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   ├── App.tsx      # Main app component with routing
│   ├── main.tsx     # Application entry point
│   └── index.css    # Global styles and design system
├── index.html       # HTML template
└── package.json     # Dependencies and scripts
```

## 🎨 Design System

The application uses the BlueWave brand colors:

- **BlueWave Blue**: `#007BFF` - Primary brand color
- **White**: `#FFFFFF` - Background and contrast
- **Accent Gray**: `#F3F4F6` - Secondary background

Typography uses the Inter font family (with system font fallbacks).

## 📄 Documentation

For complete project requirements and specifications, see the [Product Requirements Document](../docs/PRD.md).

## 🔜 Coming Soon

- Booking form with calendar integration
- Admin dashboard for managing appointments
- Email notification system
- Customer portal

## 📝 License

Private project - All rights reserved

---

**BlueWave Tech Help** - Making technology simple and accessible.
