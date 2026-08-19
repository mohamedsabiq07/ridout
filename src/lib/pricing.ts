import { supabase } from './supabase';

export type PropertyTypeKey = 'Studio' | '1 BHK' | '2 BHK' | '3+ BHK' | 'Villa' | 'Commercial';

export interface ServicePricingOption {
  id: string;
  name: string;
  category: 'pest' | 'cleaning';
  rates: Record<PropertyTypeKey, { min: number; max: number }>;
  duration: string;
  guarantee: string;
}

export const DEFAULT_PRICING_OPTIONS: ServicePricingOption[] = [
  {
    id: 'general-pest-control',
    name: 'General Pest Control',
    category: 'pest',
    rates: {
      Studio: { min: 149, max: 199 },
      '1 BHK': { min: 179, max: 249 },
      '2 BHK': { min: 219, max: 299 },
      '3+ BHK': { min: 289, max: 379 },
      Villa: { min: 449, max: 649 },
      Commercial: { min: 349, max: 599 }
    },
    duration: '45 - 60 mins',
    guarantee: '4-Month Warranty Included'
  },
  {
    id: 'cockroach-control',
    name: 'Cockroach Gel & Spray Treatment',
    category: 'pest',
    rates: {
      Studio: { min: 169, max: 219 },
      '1 BHK': { min: 199, max: 269 },
      '2 BHK': { min: 239, max: 329 },
      '3+ BHK': { min: 319, max: 419 },
      Villa: { min: 499, max: 699 },
      Commercial: { min: 399, max: 649 }
    },
    duration: '45 - 75 mins',
    guarantee: '100% Odorless Gel + 4-Month Guarantee'
  },
  {
    id: 'bed-bug-treatment',
    name: 'Bed Bug Thermal Steam & Chemical Treatment',
    category: 'pest',
    rates: {
      Studio: { min: 249, max: 349 },
      '1 BHK': { min: 319, max: 449 },
      '2 BHK': { min: 429, max: 599 },
      '3+ BHK': { min: 549, max: 749 },
      Villa: { min: 799, max: 1199 },
      Commercial: { min: 599, max: 949 }
    },
    duration: '2 - 3 hours',
    guarantee: '2-Session Protocol + 4-Month Warranty'
  },
  {
    id: 'deep-cleaning',
    name: 'Full Deep Cleaning (Kitchen + Bathrooms)',
    category: 'cleaning',
    rates: {
      Studio: { min: 249, max: 329 },
      '1 BHK': { min: 329, max: 429 },
      '2 BHK': { min: 449, max: 589 },
      '3+ BHK': { min: 599, max: 799 },
      Villa: { min: 899, max: 1399 },
      Commercial: { min: 699, max: 1199 }
    },
    duration: '3 - 6 hours',
    guarantee: 'Industrial Equipment & Eco-Safe Chemicals'
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Deep Degreasing & Descaling',
    category: 'cleaning',
    rates: {
      Studio: { min: 149, max: 199 },
      '1 BHK': { min: 179, max: 239 },
      '2 BHK': { min: 199, max: 269 },
      '3+ BHK': { min: 249, max: 329 },
      Villa: { min: 349, max: 499 },
      Commercial: { min: 449, max: 699 }
    },
    duration: '60 - 90 mins',
    guarantee: 'Food-Grade Sanitizers Used'
  },
  {
    id: 'bathroom-cleaning',
    name: 'Bathroom Deep Tile & Grout Sanitization',
    category: 'cleaning',
    rates: {
      Studio: { min: 129, max: 179 },
      '1 BHK': { min: 149, max: 199 },
      '2 BHK': { min: 219, max: 289 },
      '3+ BHK': { min: 289, max: 379 },
      Villa: { min: 399, max: 549 },
      Commercial: { min: 349, max: 549 }
    },
    duration: '45 - 75 mins',
    guarantee: 'High-Pressure Steam & Anti-Mold Scrub'
  }
];

const LOCAL_STORAGE_KEY = 'ridout_pricing_config_v1';

export async function fetchPricingConfig(): Promise<ServicePricingOption[]> {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('pricing_config')
        .select('data')
        .eq('id', 'default_pricing')
        .maybeSingle();

      if (!error && data && data.data && Array.isArray(data.data)) {
        // Cache in localStorage
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        } catch (_) {}
        return data.data as ServicePricingOption[];
      }
    } catch (err) {
      console.warn('Could not fetch pricing from Supabase:', err);
    }
  }

  // 2. Try LocalStorage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ServicePricingOption[];
      }
    }
  } catch (_) {}

  // 3. Fallback to Default Constants
  return DEFAULT_PRICING_OPTIONS;
}

export async function savePricingConfig(pricing: ServicePricingOption[]): Promise<boolean> {
  let supabaseSuccess = false;

  // 1. Save to Supabase
  if (supabase) {
    try {
      const { error } = await supabase
        .from('pricing_config')
        .upsert({
          id: 'default_pricing',
          data: pricing,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        supabaseSuccess = true;
      } else {
        console.error('Supabase pricing save error:', error);
      }
    } catch (err) {
      console.error('Failed to save pricing to Supabase:', err);
    }
  }

  // 2. Always persist locally
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pricing));
  } catch (err) {
    console.error('Failed to save pricing locally:', err);
  }

  return supabaseSuccess || true;
}
