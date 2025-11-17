export type ServiceType =
  | "Device Setup"
  | "Wi-Fi & Network"
  | "Software Assistance"
  | "Data Backup & Cleanup";

export type PreferredContactMethod = "Email" | "Phone";

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface BookingFormData {
  date: Date | null;
  timeSlot: string;
  contactInfo: ContactInfo;
  serviceType: ServiceType;
  issueDescription: string;
  preferredContact: PreferredContactMethod;
}

export interface BookingPayload extends BookingFormData {
  id: string;
  status: "pending";
  createdAt: string;
}

