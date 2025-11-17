# Next Steps: Booking & Calendar System

## Overview
Implement the customer booking system with calendar and time selection, following the multi-step booking flow outlined in the PRD.

## User Flow (from PRD)
1. Customer clicks "Book Now" button
2. Picks available date/time from calendar
3. Fills in contact information
4. Describes the issue/service needed
5. Submits booking request
6. Receives confirmation (initially just UI, email later)

## Implementation Plan

### Phase 1: Calendar Component & Date Selection
**Goal**: Create a calendar component for date selection

**Tasks**:
1. Research and choose a calendar library (options: `react-calendar`, `react-datepicker`, or custom with date-fns)
2. Create `BookingCalendar` component
3. Implement date selection with:
   - Current month view
   - Navigation (prev/next month)
   - Disable past dates
   - Highlight today's date
   - Visual feedback for selected date
4. Style with BlueWave design system
5. Make mobile-responsive

**Files to Create**:
- `frontend/src/components/BookingCalendar.tsx`
- `frontend/src/utils/dateUtils.ts` (helper functions)

**Mock Data Needed**:
- Mock available dates (for now, just disable weekends or specific dates)
- Later: Connect to availability API

---

### Phase 2: Time Slot Selection
**Goal**: Allow users to select available time slots for chosen date

**Tasks**:
1. Create `TimeSlotPicker` component
2. Display available time slots (e.g., 9 AM - 5 PM, hourly slots)
3. Handle time slot selection
4. Show selected time slot clearly
5. Disable unavailable slots (for now, just show all slots)
6. Mobile-friendly grid/list layout

**Files to Create**:
- `frontend/src/components/TimeSlotPicker.tsx`

**Mock Data Needed**:
- Default availability: 9 AM - 5 PM, hourly slots
- Later: Connect to weekly_availability table

---

### Phase 3: Multi-Step Form Structure
**Goal**: Create the multi-step booking form container

**Tasks**:
1. Create `BookingForm` component with step management
2. Implement step navigation (Step 1: Date/Time, Step 2: Contact Info, Step 3: Issue Description)
3. Add progress indicator (shows current step)
4. Add "Back" and "Next" buttons
5. Form validation per step
6. Store form state as user progresses

**Files to Create**:
- `frontend/src/pages/Booking.tsx` (main booking page)
- `frontend/src/components/BookingForm.tsx`
- `frontend/src/components/StepIndicator.tsx`

**Route to Add**:
- `/booking` route in App.tsx

---

### Phase 4: Contact Information Step
**Goal**: Collect customer contact details

**Tasks**:
1. Create contact form fields:
   - Full Name (required)
   - Email (required, validated)
   - Phone (required, formatted)
   - Address (optional, for in-home visits)
2. Form validation with clear error messages
3. Accessible form labels and inputs
4. Large, readable inputs (targeting seniors)
5. Save to form state

**Files to Create/Modify**:
- `frontend/src/components/ContactInfoStep.tsx`

---

### Phase 5: Issue Description Step
**Goal**: Collect service details and issue description

**Tasks**:
1. Create form fields:
   - Service Type (dropdown: Device Setup, Wi-Fi & Network, Software Assistance, Data Backup & Cleanup)
   - Issue Description (textarea, required)
   - Preferred Contact Method (radio: Email, Phone)
2. Character counter for description
3. Form validation
4. Save to form state

**Files to Create**:
- `frontend/src/components/IssueDescriptionStep.tsx`

---

### Phase 6: Form Submission & Confirmation
**Goal**: Submit booking and show confirmation

**Tasks**:
1. Create submission handler (initially to mock API)
2. Combine all form data into booking object
3. Show loading state during submission
4. Create confirmation page/component:
   - Thank you message
   - Booking reference number (mock)
   - Summary of booking details
   - "Back to Home" button
5. Handle submission errors gracefully

**Files to Create**:
- `frontend/src/components/BookingConfirmation.tsx`
- `frontend/src/services/bookingService.ts` (mock API calls)

**Mock Data Structure**:
```typescript
interface Booking {
  id: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
  address?: string;
  serviceType: string;
  issueDescription: string;
  preferredContact: string;
  status: 'pending';
  createdAt: string;
}
```

---

### Phase 7: Connect "Book Now" Buttons
**Goal**: Link all "Book Now" buttons to booking page

**Tasks**:
1. Update Navigation component "Book Now" button to link to `/booking`
2. Update Home page "Book Now" button to link to `/booking`
3. Update Services page to link to booking with pre-selected service type (optional enhancement)

**Files to Modify**:
- `frontend/src/components/Navigation.tsx`
- `frontend/src/pages/Home.tsx`
- `frontend/src/pages/Services.tsx` (optional)

---

## Technical Considerations

### Calendar Library Options
1. **react-calendar** - Lightweight, customizable, good for simple date picking
2. **react-datepicker** - More features, better styled out of the box
3. **Custom with date-fns** - Full control, but more work

**Recommendation**: Start with `react-calendar` for simplicity, can upgrade later if needed.

### Form State Management
- Use React `useState` for form state (simple for now)
- Consider `useReducer` if form becomes complex
- Later: Can integrate with form library like `react-hook-form` if needed

### Accessibility Requirements
- Keyboard navigation for calendar
- ARIA labels for form fields
- Clear error messages
- Large touch targets for mobile
- High contrast (WCAG AA)

### Mobile Responsiveness
- Calendar should work well on mobile (consider month view vs. list view)
- Time slots should be easy to tap
- Form should be single-column on mobile
- Progress indicator should be clear on small screens

---

## Success Criteria

✅ User can click "Book Now" and navigate to booking page
✅ User can select a date from calendar
✅ User can select a time slot
✅ User can fill out contact information
✅ User can describe their issue
✅ User can submit booking and see confirmation
✅ All steps are mobile-friendly
✅ Form validation works correctly
✅ Booking data is stored (initially in mock service, later in database)

---

## Future Enhancements (After Basic Flow Works)

- Connect to real backend API
- Real availability checking (block unavailable dates/times)
- Email notifications
- Booking edit/cancel functionality
- Recurring appointment option
- Service type affects available time slots
- Address validation for in-home visits

---

## Estimated Time
- Phase 1: 2-3 hours
- Phase 2: 1-2 hours
- Phase 3: 2-3 hours
- Phase 4: 1-2 hours
- Phase 5: 1-2 hours
- Phase 6: 2-3 hours
- Phase 7: 30 minutes

**Total**: ~10-16 hours of focused work

---

## Notes
- Start with mock data - don't worry about backend integration yet
- Focus on UX and accessibility (target audience is adults/seniors)
- Test on mobile devices early and often
- Keep it simple - can add complexity later
- Follow BlueWave design system colors and typography

