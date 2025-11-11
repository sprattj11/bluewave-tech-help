# BlueWave Tech Help – Product Requirements Document (PRD)

**Project Type:** Professional Tech Support Service Website  
**Platform:** Web (React + Tailwind CSS + Bolt/Cursor backend)  
**Repository:** `bluewave-tech-help`  
**Author:** Jason Spratt  
**Last Updated:** 11/10/2025

---

## 1. Overview

**BlueWave Tech Help** is a professional, approachable tech support service designed to help customers book, manage, and track tech assistance sessions.  

The platform allows:
- Customers to book appointments online.
- Admin to manage bookings, customers, and availability.
- Automatic email notifications for confirmations and reminders.

---

## 2. Goals

- Provide an easy, trustworthy way for customers to request help.
- Automate scheduling and availability management.
- Streamline communication between admin and customers.
- Keep the experience mobile-friendly and accessible to all users.

---

## 3. Target Audience

- Primary: Adults and seniors needing tech assistance at home or remotely.
- Secondary: Small local businesses looking for basic IT help.

---

## 4. Core Features

### **Customer-Facing**
- Home, About, Services, and Contact pages.
- Booking system with calendar and time selection.
- Multi-step booking form (date/time → contact info → issue description).
- Confirmation and reminder emails.

### **Admin-Facing**
- Magic link authentication.
- Dashboard for managing bookings, customers, and invoices.
- Weekly availability scheduling with exceptions (vacations/holidays).
- Email notifications for new booking requests.
- Invoicing system for completed appointments.

---

## 5. Technical Overview

**Frontend:** React (with Tailwind CSS for styling)  
**Backend:** Bolt Database or alternative API (via Cursor)  
**Authentication:** Magic link email login  
**Deployment:** [Your Hosting Provider Placeholder]  
**Version Control:** GitHub (`bluewave-tech-help` repo)

---

## 6. Database Schema

### **Tables**
- `bookings` – appointment info, status (pending/approved/rejected/completed)
- `customers` – name, contact info, service history
- `weekly_availability` – office hours per weekday
- `blocked_dates` – vacation or exception days
- `services` – service names, descriptions, hourly rate

---

## 7. User Flows

### **Customer Booking**
1. Customer visits site → selects "Book Now."
2. Picks available date/time.
3. Fills in details and submits booking request.
4. Receives “pending review” email.
5. Admin reviews and approves/rejects.
6. Confirmation or rejection email sent automatically.

### **Admin Flow**
1. Logs in via magic link.
2. Views all bookings in dashboard.
3. Approves/rejects new requests.
4. Updates availability and blocked dates.
5. Generates invoices for completed jobs.

---

## 8. Admin Dashboard Modules

- **Bookings:** View/manage all appointments.
- **Customers:** Track contact info and visit history.
- **Availability:** Edit weekly hours and blocked dates.
- **Calendar:** Visual calendar for upcoming jobs.
- **Invoices:** Create, view, and mark invoices as paid.

---

## 9. Design System

**Palette:**
- BlueWave Blue (`#007BFF`)
- White (`#FFFFFF`)
- Accent Gray (`#F3F4F6`)

**Typography:** Inter or similar sans-serif font  
**Accessibility:** WCAG AA contrast compliance, large readable text, keyboard navigation support  
**Tone:** Friendly, calm, professional  

---

## 10. Future Enhancements

- Chat or video support options.
- Customer portal for service history.
- Automatic recurring appointments.
- Integration with Google Calendar.

---

## 11. Deployment Checklist

- [ ] Project initialized with React + Tailwind CSS  
- [ ] Basic routing structure (Home, About, Services, Contact)  
- [ ] Booking form prototype connected to mock data  
- [ ] Admin dashboard scaffolded with auth  
- [ ] Email templates for booking updates  
- [ ] Mobile and tablet responsiveness testing  
- [ ] SEO optimization (meta tags, structured data)  
- [ ] Final hosting and domain setup  

---

## 12. Contact & Ownership

- **Business Name:** BlueWave Tech Help  
- **Owner:** Jason Spratt  
- **Email:** sprattsj@gmail.com
- **Phone:** 702-994-0967  
- **Location:** Bluffton, SC

---
