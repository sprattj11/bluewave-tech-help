# BlueWave Tech Help - Frontend

A modern, professional tech support service website built with React, TypeScript, and Tailwind CSS. This frontend application provides an intuitive way for customers to book tech assistance appointments and learn about available services.

## 🚀 Features

### Customer-Facing
- **Responsive Website**: Home, About, Services, and Contact pages
- **Visual Design**: Icons, logos, and modern UI components
- **Booking System**: Multi-step booking form with calendar integration
- **Dynamic Time Slots**: 30-minute intervals based on admin availability
- **Mobile-Responsive**: Hamburger menu, touch-optimized buttons, mobile-friendly forms
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt

### Admin Dashboard
- **Magic Link Authentication**: Passwordless email-based login
- **Admin Dashboard**: Statistics overview with booking counts
- **Booking Management**: View, approve, reject, complete, delete bookings
- **Customer Management**: Track customer info and booking history
- **Availability Management**: Configure weekly hours and blocked dates
- **Calendar View**: Visual calendar for upcoming appointments
- **Email Notifications**: Real-time badge indicators for new bookings

## 🛠️ Tech Stack

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **react-calendar** - Calendar component for date selection
- **date-fns** - Date manipulation utilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (for email and authentication features)

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

### Build for Production

```bash
# Build for production
npm run build
```

The production build will be in the `dist/` directory.

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
├── public/
│   ├── favicon.svg              # Custom favicon
│   ├── logo.svg                 # Logo file
│   ├── robots.txt               # Search engine crawler instructions
│   └── sitemap.xml              # Site structure for SEO
├── src/
│   ├── assets/                  # Images and other assets
│   ├── components/              # Reusable React components
│   │   ├── admin/               # Admin dashboard components
│   │   │   ├── AdminLayout.tsx  # Admin layout wrapper
│   │   │   ├── AdminNav.tsx     # Admin navigation with badges
│   │   │   └── ProtectedRoute.tsx # Authentication guard
│   │   ├── booking/             # Booking form components
│   │   │   ├── BookingCalendar.tsx      # Date picker
│   │   │   ├── TimeSlotPicker.tsx       # Time slot selection
│   │   │   ├── ContactInfoStep.tsx      # Contact information form
│   │   │   ├── IssueDetailsStep.tsx     # Service type and description
│   │   │   ├── BookingSummary.tsx       # Review step
│   │   │   ├── BookingConfirmation.tsx  # Success page
│   │   │   └── StepIndicator.tsx        # Progress indicator
│   │   └── Navigation.tsx       # Main site navigation
│   ├── pages/                   # Page components
│   │   ├── Home.tsx             # Homepage with hero and features
│   │   ├── About.tsx            # About page
│   │   ├── Services.tsx         # Services listing with icons
│   │   ├── Contact.tsx          # Contact page with icons
│   │   ├── Booking.tsx          # Booking page
│   │   └── admin/               # Admin dashboard pages
│   │       ├── Login.tsx        # Magic link login
│   │       ├── Dashboard.tsx    # Admin dashboard
│   │       ├── Bookings.tsx     # Booking management
│   │       ├── Customers.tsx    # Customer management
│   │       ├── Availability.tsx # Availability configuration
│   │       └── Calendar.tsx     # Calendar view
│   ├── services/                # API and business logic
│   │   ├── authService.ts       # Authentication logic
│   │   ├── magicLinkService.ts  # Magic link API calls
│   │   ├── bookingService.ts    # Booking submission
│   │   ├── emailService.ts      # Email notifications
│   │   ├── notificationService.ts # Notification system
│   │   └── storageService.ts    # localStorage persistence
│   ├── types/                   # TypeScript type definitions
│   │   ├── booking.ts           # Booking form types
│   │   └── admin.ts             # Admin dashboard types
│   ├── utils/                   # Utility functions
│   │   └── dateUtils.ts         # Date manipulation and time slot generation
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and design system
├── index.html                   # HTML template with SEO meta tags
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎨 Design System

The application uses the BlueWave brand colors:

- **BlueWave Blue**: `#007BFF` - Primary brand color
- **Dark Blue**: `#0056B3` - Darker shade for hover states
- **Light Blue**: `#5FB4FF` - Light accent color
- **White**: `#FFFFFF` - Background and contrast
- **Accent Gray**: `#F3F4F6` - Secondary background
- **Accent Light Blue**: `#E5F0FF` - Very light accent

Typography uses the Inter font family (with system font fallbacks).

## 🎯 Key Components

### Booking Form
- **4-step process**: Date/Time → Contact Info → Issue Details → Review
- **Calendar integration**: react-calendar with disabled dates
- **Dynamic time slots**: 30-minute intervals based on availability
- **Form validation**: Real-time validation with clear error messages
- **Mobile-optimized**: Touch-friendly, scrollable time slots

### Admin Dashboard
- **Magic link login**: Passwordless authentication via email
- **Real-time updates**: Auto-refreshes every 10 seconds
- **Visual indicators**: Badge showing count of new bookings
- **Comprehensive management**: Full CRUD operations for bookings

### Mobile Responsiveness
- **Hamburger menu**: Mobile-friendly navigation
- **Touch targets**: Minimum 44px for accessibility
- **Responsive grid**: Adapts to all screen sizes
- **Scrollable containers**: For long lists of time slots

## 🔧 Configuration

### Environment Variables

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3001
```

This is optional - defaults to `http://localhost:3001` if not set.

## 📱 Mobile Testing

See [Mobile Testing Guide](../docs/MOBILE_TESTING.md) for comprehensive testing instructions.

Quick test:
1. Open browser DevTools (F12)
2. Toggle device mode (Ctrl+Shift+M)
3. Select a device preset
4. Test the booking form and navigation

## 🎨 Customization

### Logo and Favicon

Place custom logo files in `/public/`:
- `favicon.svg` - Browser tab icon
- `logo-icon.svg` - Navigation logo (40-60px)
- `logo-full.svg` - Full logo with text

See [Logo Specifications](../docs/LOGO_SPECIFICATIONS.md) for detailed specs.

### Colors

Update colors in `src/index.css`:
```css
:root {
  --bluewave-blue: #007BFF;
  /* Update other colors as needed */
}
```

## 🐛 Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify environment variables are set correctly

### Mobile Issues
- Test in browser DevTools device mode
- Check touch target sizes (minimum 44px)
- Verify viewport meta tag in `index.html`

### Booking Form Issues
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify date/time slot availability in admin panel

## 📄 Documentation

- [Main README](../README.md) - Project overview
- [Product Requirements Document](../docs/PRD.md) - Complete specifications
- [Magic Link Authentication](../docs/MAGIC_LINK_AUTH.md) - Authentication guide
- [Mobile Testing Guide](../docs/MOBILE_TESTING.md) - Testing instructions
- [Logo Specifications](../docs/LOGO_SPECIFICATIONS.md) - Logo design guide

## 📝 License

Private project - All rights reserved

---

**BlueWave Tech Help** - Making technology simple and accessible.
