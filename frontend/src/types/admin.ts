import type { BookingFormData } from "./booking";

export type BookingStatus = "pending" | "approved" | "rejected" | "completed";

export interface Booking extends BookingFormData {
  id: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  approvedAt?: string;
  completedAt?: string;
  rejectionReason?: string;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
}

export interface BlockedDate {
  id: string;
  date: string; // YYYY-MM-DD format
  reason?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  bookings: string[]; // Array of booking IDs
  createdAt: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  hours: number;
  rate: number;
  status: "pending" | "paid";
  createdAt: string;
  paidAt?: string;
}

