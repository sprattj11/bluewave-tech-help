# BlueWave Tech Help

A full-stack web application for managing tech support service appointments, built with modern web technologies. This project demonstrates professional software development practices including requirements documentation, component-based architecture, and responsive design.

## 🎯 Project Overview

BlueWave Tech Help is a professional tech support service platform that enables customers to book appointments online while providing administrators with tools to manage bookings, availability, and customer relationships. The application emphasizes user-friendly design and accessibility, targeting adults and seniors who need tech assistance.

## ✨ Key Features

### Customer-Facing Features
- **Responsive Website**: Home, About, Services, and Contact pages
- **Booking System**: Calendar-based appointment scheduling (planned)
- **Multi-step Booking Form**: Intuitive flow for date/time selection and service details (planned)
- **Email Notifications**: Automated confirmations and reminders (planned)

### Admin Features (Planned)
- **Magic Link Authentication**: Secure, passwordless admin login
- **Dashboard**: Comprehensive view of bookings, customers, and invoices
- **Availability Management**: Weekly schedule configuration with exception handling
- **Invoice Generation**: Automated billing for completed services

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first styling with design system
- **React Router v6** - Client-side routing

### Backend (Planned)
- **Bolt Database** or alternative API solution
- **Email Service Integration** - For notifications and confirmations

## 📁 Project Structure

```
bluewave-tech-help/
├── docs/
│   └── PRD.md              # Product Requirements Document
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components (Home, About, Services, Contact)
│   │   ├── App.tsx         # Main application with routing
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   └── README.md           # Frontend-specific documentation
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

For detailed frontend setup instructions, see [frontend/README.md](./frontend/README.md)

## 🎨 Design System

The application follows a cohesive design system:

- **Primary Color**: BlueWave Blue (`#007BFF`)
- **Background**: White (`#FFFFFF`) and Accent Gray (`#F3F4F6`)
- **Typography**: Inter font family with system fallbacks
- **Accessibility**: WCAG AA compliance target

## 📋 Development Status

### ✅ Completed
- [x] Project initialization with React + TypeScript + Vite
- [x] Tailwind CSS v4 integration
- [x] React Router configuration
- [x] Navigation component with responsive design
- [x] Customer-facing pages (Home, About, Services, Contact)
- [x] Design system implementation
- [x] Professional documentation

### 🚧 In Progress
- Booking form with calendar integration
- Backend API development

### 📅 Planned
- Admin dashboard with authentication
- Email notification system
- Availability management system
- Invoice generation
- Customer portal

## 📄 Documentation

- [Product Requirements Document (PRD)](./docs/PRD.md) - Complete project specifications
- [Frontend README](./frontend/README.md) - Frontend setup and development guide

## 🎓 Skills Demonstrated

This project showcases:
- **Frontend Development**: React, TypeScript, modern JavaScript (ES6+)
- **UI/UX Design**: Responsive design, accessibility considerations, design systems
- **Build Tools**: Vite, modern development workflow
- **Version Control**: Git, professional commit practices
- **Documentation**: PRD creation, technical documentation
- **Project Planning**: Requirements gathering, feature prioritization

## 📝 License

Private project - All rights reserved

---

**Built by Jason Spratt** | BlueWave Tech Help - Making technology simple and accessible.
