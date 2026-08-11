import { createClient } from '@supabase/supabase-js';
import type { ServiceRequest, BookingFormData, BookingStatus } from '../types/booking';
import { PEST_SERVICES } from '../data/services';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY = 'ridout_pest_service_requests_v1';

// Initial pre-populated realistic UAE service requests for Demo Mode
const INITIAL_DEMO_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-1024',
    request_number: 'PC-1024',
    customer_name: 'Mohamed Al-Maktoum',
    mobile: '+971 50 492 8123',
    email: 'mohamed.m@example.ae',
    service_id: ['general-pest-control'],
    service_name: ['General Pest Control'],
    property_type: 'Apartment',
    location: 'Dubai Marina',
    preferred_date: '2026-08-15',
    preferred_time: '10:00 AM',
    notes: 'Ant infestation in kitchen and balcony area.',
    status: 'Pending',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    is_urgent: false
  },
  {
    id: 'req-1025',
    request_number: 'PC-1025',
    customer_name: 'Sarah Jenkins',
    mobile: '+971 55 318 9012',
    email: 's.jenkins@dubaihills.ae',
    service_id: ['cockroach-control'],
    service_name: ['Cockroach Control'],
    property_type: 'Villa',
    location: 'Dubai Hills Estate',
    preferred_date: '2026-08-10',
    preferred_time: '02:00 PM',
    notes: 'German cockroaches seen near dishwasher.',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    internal_notes: 'Called customer at 11:30 AM. Waiting for villa security gate approval code.',
    is_urgent: false
  },
  {
    id: 'req-1026',
    request_number: 'PC-1026',
    customer_name: 'Tariq Mansoor',
    mobile: '+971 52 876 4321',
    email: 'tariq@baytower.com',
    service_id: ['bed-bug-treatment'],
    service_name: ['Bed Bug Treatment'],
    property_type: 'Apartment',
    location: 'Business Bay',
    preferred_date: '2026-08-09',
    preferred_time: '09:00 AM',
    notes: 'Urgent bed bug treatment needed in master bedroom.',
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    internal_notes: 'Technician Rashid assigned. Thermal steam machine prepared.',
    is_urgent: true
  },
  {
    id: 'req-1027',
    request_number: 'PC-1027',
    customer_name: 'Elena Rostova',
    mobile: '+971 56 123 9876',
    email: 'elena@palmvilla.ae',
    service_id: ['termite-treatment'],
    service_name: ['Termite Treatment'],
    property_type: 'Villa',
    location: 'Palm Jumeirah',
    preferred_date: '2026-08-08',
    preferred_time: '11:00 AM',
    notes: 'Subterranean termite mud tubes spotted on garden boundary wall.',
    status: 'Completed',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    internal_notes: 'Sub-slab drill injection completed. 5-year warranty certificate issued.',
    is_urgent: false
  }
];

function getStoredRequests(): ServiceRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
      return INITIAL_DEMO_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('LocalStorage parse error:', err);
    return INITIAL_DEMO_REQUESTS;
  }
}

function saveStoredRequests(requests: ServiceRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
}

function generateNextRequestNumber(existing: ServiceRequest[]): string {
  const nums = existing.map(r => {
    const match = r.request_number.match(/PC-(\d+)/);
    return match ? parseInt(match[1], 10) : 1024;
  });
  const max = nums.length > 0 ? Math.max(...nums) : 1023;
  return `PC-${max + 1}`;
}

export async function fetchAllServiceRequests(): Promise<ServiceRequest[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        return data as ServiceRequest[];
      }
    } catch (e) {
      console.warn('Supabase fetch error, fallback to local database:', e);
    }
  }
  return getStoredRequests();
}

export async function createServiceRequest(formData: BookingFormData): Promise<ServiceRequest> {
  const currentLocal = getStoredRequests();
  const requestNumber = generateNextRequestNumber(currentLocal);
  const serviceNames = formData.service_id.map(id => {
    const matchedService = PEST_SERVICES.find(s => s.id === id);
    return matchedService ? matchedService.name : id;
  });

  const newRecord: ServiceRequest = {
    id: `req-${Date.now()}`,
    request_number: requestNumber,
    customer_name: formData.customer_name,
    mobile: formData.mobile,
    email: formData.email,
    service_id: formData.service_id,
    service_name: serviceNames,
    property_type: formData.property_type,
    location: formData.location,
    preferred_date: formData.preferred_date,
    preferred_time: formData.preferred_time,
    notes: formData.notes,
    status: 'Pending',
    created_at: new Date().toISOString(),
    is_urgent: Boolean(formData.is_urgent),
    photo_name: formData.photo_name,
    photo_data: formData.photo_data
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([newRecord])
        .select()
        .single();
      
      if (!error && data) {
        // Also update local cache
        saveStoredRequests([data as ServiceRequest, ...currentLocal]);
        return data as ServiceRequest;
      }
    } catch (e) {
      console.warn('Supabase insert error, saving locally:', e);
    }
  }

  // Local state persistence fallback
  const updated = [newRecord, ...currentLocal];
  saveStoredRequests(updated);
  return newRecord;
}

export async function updateRequestStatus(
  id: string,
  newStatus: BookingStatus,
  internalNotes?: string
): Promise<ServiceRequest | null> {
  if (supabase) {
    try {
      const payload: Partial<ServiceRequest> = { status: newStatus };
      if (internalNotes !== undefined) payload.internal_notes = internalNotes;

      const { data, error } = await supabase
        .from('service_requests')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const local = getStoredRequests().map(r => r.id === id ? (data as ServiceRequest) : r);
        saveStoredRequests(local);
        return data as ServiceRequest;
      }
    } catch (e) {
      console.warn('Supabase update status failed, writing to local storage:', e);
    }
  }

  const list = getStoredRequests();
  const targetIndex = list.findIndex(r => r.id === id);
  if (targetIndex !== -1) {
    list[targetIndex].status = newStatus;
    if (internalNotes !== undefined) {
      list[targetIndex].internal_notes = internalNotes;
    }
    saveStoredRequests([...list]);
    return list[targetIndex];
  }
  return null;
}
