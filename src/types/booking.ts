export type BookingStatus =
  | 'Pending'
  | 'Contacted'
  | 'Confirmed'
  | 'Technician Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Office'
  | 'Shop'
  | 'Warehouse'
  | 'Partition'
  | 'Other';

export interface PestService {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  imageUrl?: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  problems: string[];
  method: string;
  suitableFor: string[];
  duration: string;
  preparationSteps: string[];
  category?: 'pest' | 'cleaning';
}

export interface ServiceRequest {
  id: string;
  request_number: string; // e.g. "PC-1024"
  customer_name: string;
  mobile: string;
  email?: string;
  service_id: string[];
  service_name: string[];
  property_type: PropertyType;
  apartment_size?: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: BookingStatus;
  created_at: string;
  internal_notes?: string;
  is_urgent?: boolean;
  photo_name?: string;
  photo_data?: string;
}

export interface BookingFormData {
  customer_name: string;
  mobile: string;
  email: string;
  service_id: string[];
  property_type: PropertyType;
  apartment_size?: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  is_urgent?: boolean;
  photo_name?: string;
  photo_data?: string;
}
