import type { BookingFormData } from "../types/booking";
import type { Booking } from "../types/admin";
import {
  createBookingFromForm,
  getOrCreateCustomer,
  addBookingToCustomer,
} from "./storageService";
import { notifyNewBooking } from "./notificationService";

export const submitBooking = async (
  formData: BookingFormData,
): Promise<Booking> => {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Create booking
  const booking = createBookingFromForm(formData);

  // Create or get customer and link booking
  const customer = getOrCreateCustomer(formData.contactInfo);
  addBookingToCustomer(customer.id, booking.id);

  // Send notification about new booking
  await notifyNewBooking(booking);

  return booking;
};

