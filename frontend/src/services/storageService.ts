import type {
  Booking,
  WeeklyAvailability,
  BlockedDate,
  Customer,
  Invoice,
} from "../types/admin";
import type { BookingFormData } from "../types/booking";

const STORAGE_KEYS = {
  BOOKINGS: "bluewave_bookings",
  AVAILABILITY: "bluewave_availability",
  BLOCKED_DATES: "bluewave_blocked_dates",
  CUSTOMERS: "bluewave_customers",
  INVOICES: "bluewave_invoices",
} as const;

// Helper to get/set from localStorage with error handling
const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage: ${key}`, error);
  }
};

// Bookings
export const getBookings = (): Booking[] => {
  return getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
};

export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === booking.id);
  if (index >= 0) {
    bookings[index] = { ...booking, updatedAt: new Date().toISOString() };
  } else {
    bookings.push(booking);
  }
  setStorage(STORAGE_KEYS.BOOKINGS, bookings);
};

export const createBookingFromForm = (
  formData: BookingFormData,
): Booking => {
  const booking: Booking = {
    ...formData,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  saveBooking(booking);
  return booking;
};

export const updateBookingStatus = (
  bookingId: string,
  status: Booking["status"],
  rejectionReason?: string,
): Booking | null => {
  const bookings = getBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  const updated: Booking = {
    ...booking,
    status,
    updatedAt: new Date().toISOString(),
    ...(status === "approved" && { approvedAt: new Date().toISOString() }),
    ...(status === "rejected" && { rejectionReason }),
    ...(status === "completed" && { completedAt: new Date().toISOString() }),
  };

  saveBooking(updated);
  return updated;
};

// Availability
export const getWeeklyAvailability = (): WeeklyAvailability => {
  const defaultAvailability: WeeklyAvailability = {
    monday: [{ start: "09:00", end: "17:00" }],
    tuesday: [{ start: "09:00", end: "17:00" }],
    wednesday: [{ start: "09:00", end: "17:00" }],
    thursday: [{ start: "09:00", end: "17:00" }],
    friday: [{ start: "09:00", end: "17:00" }],
    saturday: [],
    sunday: [],
  };
  return getStorage<WeeklyAvailability>(
    STORAGE_KEYS.AVAILABILITY,
    defaultAvailability,
  );
};

export const saveWeeklyAvailability = (
  availability: WeeklyAvailability,
): void => {
  setStorage(STORAGE_KEYS.AVAILABILITY, availability);
};

// Blocked Dates
export const getBlockedDates = (): BlockedDate[] => {
  return getStorage<BlockedDate[]>(STORAGE_KEYS.BLOCKED_DATES, []);
};

export const addBlockedDate = (date: string, reason?: string): BlockedDate => {
  const blockedDates = getBlockedDates();
  const blocked: BlockedDate = {
    id: crypto.randomUUID(),
    date,
    reason,
  };
  blockedDates.push(blocked);
  setStorage(STORAGE_KEYS.BLOCKED_DATES, blockedDates);
  return blocked;
};

export const removeBlockedDate = (id: string): void => {
  const blockedDates = getBlockedDates();
  const filtered = blockedDates.filter((bd) => bd.id !== id);
  setStorage(STORAGE_KEYS.BLOCKED_DATES, filtered);
};

// Customers
export const getCustomers = (): Customer[] => {
  return getStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
};

export const getOrCreateCustomer = (
  contactInfo: BookingFormData["contactInfo"],
): Customer => {
  const customers = getCustomers();
  let customer = customers.find((c) => c.email === contactInfo.email);

  if (!customer) {
    customer = {
      id: crypto.randomUUID(),
      fullName: contactInfo.fullName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      address: contactInfo.address,
      bookings: [],
      createdAt: new Date().toISOString(),
    };
    customers.push(customer);
    setStorage(STORAGE_KEYS.CUSTOMERS, customers);
  }

  return customer;
};

export const addBookingToCustomer = (
  customerId: string,
  bookingId: string,
): void => {
  const customers = getCustomers();
  const customer = customers.find((c) => c.id === customerId);
  if (customer && !customer.bookings.includes(bookingId)) {
    customer.bookings.push(bookingId);
    setStorage(STORAGE_KEYS.CUSTOMERS, customers);
  }
};

export const deleteBooking = (bookingId: string): void => {
  const bookings = getBookings().filter((b) => b.id !== bookingId);
  setStorage(STORAGE_KEYS.BOOKINGS, bookings);

  const customers = getCustomers().map((customer) => ({
    ...customer,
    bookings: customer.bookings.filter((id) => id !== bookingId),
  }));
  setStorage(STORAGE_KEYS.CUSTOMERS, customers);
};

// Invoices
export const getInvoices = (): Invoice[] => {
  return getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, []);
};

export const createInvoice = (
  bookingId: string,
  customerId: string,
  hours: number,
  rate: number,
): Invoice => {
  const invoice: Invoice = {
    id: crypto.randomUUID(),
    bookingId,
    customerId,
    amount: hours * rate,
    hours,
    rate,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const invoices = getInvoices();
  invoices.push(invoice);
  setStorage(STORAGE_KEYS.INVOICES, invoices);
  return invoice;
};

export const markInvoicePaid = (invoiceId: string): Invoice | null => {
  const invoices = getInvoices();
  const invoice = invoices.find((i) => i.id === invoiceId);
  if (!invoice) return null;

  invoice.status = "paid";
  invoice.paidAt = new Date().toISOString();
  setStorage(STORAGE_KEYS.INVOICES, invoices);
  return invoice;
};

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

