# BlueWave Tech Help

A full-stack web application for managing tech support service appointments, built with modern web technologies. This project demonstrates professional software development practices including requirements documentation, component-based architecture, responsive design, and email automation.

## 🎯 Project Overview

BlueWave Tech Help is a professional tech support service platform that enables customers to book appointments online while providing administrators with comprehensive tools to manage bookings, availability, customers, and invoices. The application emphasizes user-friendly design and accessibility, targeting adults and seniors who need tech assistance.

## ✨ Key Features

### Customer-Facing Features
- **Responsive Website**: Home, About, Services, and Contact pages with modern UI and icons
- **Booking System**: Calendar-based appointment scheduling with date and time selection
- **Multi-step Booking Form**: Intuitive 4-step flow (Date/Time → Contact Info → Issue Details → Review)
- **Dynamic Time Slots**: 30-minute intervals based on admin availability settings
- **Email Notifications**: Automated booking confirmations sent to customers

### Admin Features
- **Magic Link Authentication**: Secure, passwordless email-based login
- **Admin Dashboard**: Comprehensive overview with booking statistics
- **Booking Management**: View, approve, reject, complete, and delete bookings
- **Customer Management**: Track customer info and booking history
- **Availability Management**: Configure weekly hours and block specific dates
- **Calendar View**: Visual calendar for upcoming appointments
- **Email Notifications**: Instant email alerts when new bookings are created
- **New Booking Badges**: Visual indicators for pending bookings

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first styling with design system
- **React Router v6** - Client-side routing
- **react-calendar** - Calendar component for date selection
- **date-fns** - Date manipulation utilities

### Backend
- **Node.js + Express** - REST API server
- **Resend** - Email service for notifications and magic links
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Data Storage
- **localStorage** - Client-side data persistence (bookings, customers, availability)

## 📁 Project Structure

```
bluewave-tech-help/
├── docs/
│   ├── PRD.md                    # Product Requirements Document
│   ├── NEXT_STEPS.md             # Development roadmap
│   ├── EMAIL_SMS_SETUP.md        # Email/SMS configuration guide
│   ├── MAGIC_LINK_AUTH.md        # Authentication guide
│   ├── MOBILE_TESTING.md         # Mobile testing guide
│   └── LOGO_SPECIFICATIONS.md    # Logo design specifications
├── frontend/
│   ├── public/                   # Static assets (logos, favicons)
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── admin/            # Admin components
│   │   │   └── booking/          # Booking form components
│   │   ├── pages/                # Page components
│   │   │   ├── admin/            # Admin dashboard pages
│   │   │   └── ...               # Customer-facing pages
│   │   ├── services/             # API and business logic
│   │   ├── types/                # TypeScript type definitions
│   │   └── utils/                # Utility functions
│   ├── package.json
│   └── README.md                 # Frontend-specific documentation
├── backend/
│   ├── server.js                 # Express API server
│   ├── auth.js                   # Magic link authentication
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── README.md                 # Backend-specific documentation
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Resend API key (for email functionality)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bluewave-tech-help
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with RESEND_API_KEY
   npm run dev
   ```
   Backend runs on `http://localhost:3001`

3. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Access the Application**
   - Customer site: `http://localhost:5173`
   - Admin login: `http://localhost:5173/admin/login`

For detailed setup instructions, see:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🎨 Design System

The application follows a cohesive design system:

- **Primary Color**: BlueWave Blue (`#007BFF`)
- **Background**: White (`#FFFFFF`) and Accent Gray (`#F3F4F6`)
- **Typography**: Inter font family with system fallbacks
- **Accessibility**: WCAG AA compliance target, mobile-optimized touch targets (44px minimum)
- **Visual Elements**: Icons, logos, and modern UI components

## 📋 Development Status

### ✅ Completed Features

#### Customer-Facing
- [x] Responsive website with navigation
- [x] Home, About, Services, Contact pages with icons
- [x] Multi-step booking form with calendar integration
- [x] Dynamic time slot selection (30-minute intervals)
- [x] Form validation and user feedback
- [x] Booking confirmation page
- [x] Mobile-responsive design with hamburger menu
- [x] SEO optimization (meta tags, structured data, sitemap)

#### Admin-Facing
- [x] Magic link authentication (passwordless login)
- [x] Admin dashboard with statistics
- [x] Booking management (view, approve, reject, complete, delete)
- [x] Customer management and history
- [x] Availability management (weekly schedule, blocked dates)
- [x] Calendar view for upcoming appointments
- [x] Email notifications for new bookings
- [x] Email confirmations for approved bookings
- [x] Visual badges for new bookings

#### Backend
- [x] Express API server
- [x] Email service integration (Resend)
- [x] Magic link authentication endpoints
- [x] Email notification system
- [x] CORS configuration

### 📅 Planned Features

- [ ] Invoice generation system
- [ ] Reminder emails (24 hours before appointment)
- [ ] Customer booking cancellation
- [ ] Integration with Google Calendar
- [ ] Customer portal for service history
- [ ] SMS notifications (Twilio integration ready)

## 📄 Documentation

- [Product Requirements Document (PRD)](./docs/PRD.md) - Complete project specifications
- [Frontend README](./frontend/README.md) - Frontend setup and development guide
- [Backend README](./backend/README.md) - Backend API documentation
- [Magic Link Authentication Guide](./docs/MAGIC_LINK_AUTH.md) - How to use magic link login
- [Email/SMS Setup Guide](./docs/EMAIL_SMS_SETUP.md) - Email and SMS configuration
- [Mobile Testing Guide](./docs/MOBILE_TESTING.md) - Mobile testing instructions
- [Logo Specifications](./docs/LOGO_SPECIFICATIONS.md) - Logo design guidelines

## 🎓 Skills Demonstrated

This project showcases:
- **Full-Stack Development**: React frontend, Node.js/Express backend
- **TypeScript**: Type-safe development throughout
- **UI/UX Design**: Responsive design, accessibility, mobile-first approach
- **Email Integration**: Automated email notifications with Resend
- **Authentication**: Passwordless magic link authentication
- **State Management**: React hooks, localStorage persistence
- **Build Tools**: Vite, modern development workflow
- **Version Control**: Git, professional commit practices
- **Documentation**: PRD creation, comprehensive technical documentation
- **Project Planning**: Requirements gathering, feature prioritization
- **API Design**: RESTful API endpoints
- **SEO Optimization**: Meta tags, structured data, sitemap

## 🔐 Admin Access

**Magic Link Login:**
1. Visit `/admin/login`
2. Enter admin email (`sprattsj@gmail.com`)
3. Click "Send Login Link"
4. Check email and click the login link
5. Access admin dashboard

**Features:**
- Secure passwordless authentication
- 15-minute link expiration
- 24-hour session duration

## 📱 Mobile Support

The application is fully mobile-responsive:
- Hamburger menu navigation
- Touch-optimized buttons (44px minimum)
- Mobile-friendly booking form
- Responsive admin dashboard
- Tested on iOS and Android devices

## 📞 Contact & Ownership

- **Business Name:** BlueWave Tech Help  
- **Owner:** Jason Spratt  
- **Email:** sprattsj@gmail.com
- **Phone:** 702-994-0967  
- **Location:** Bluffton, SC

## 📝 License

Private project - All rights reserved

---

**Built by Jason Spratt** | BlueWave Tech Help - Making technology simple and accessible.
