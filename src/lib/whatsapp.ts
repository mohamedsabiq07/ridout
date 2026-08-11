import type { ServiceRequest, BookingFormData } from '../types/booking';

// UAE Dispatch WhatsApp Number
export const DEFAULT_WHATSAPP_NUMBER = '+971 0502364014';
export const DISPLAY_PHONE_NUMBER = '+971 0502364014';

/**
 * Formats WhatsApp alert text according to business specification:
 * NEW SERVICE REQUEST
 * 
 * Customer: [Name]
 * Mobile: [Mobile]
 * Service: [Service]
 * Property Type: [Property Type]
 * Location: [Location]
 * Preferred Date: [Date]
 * Preferred Time: [Time]
 * Notes: [Notes]
 */
export function formatWhatsAppMessage(request: Partial<ServiceRequest> | BookingFormData, requestNumber?: string): string {
  const name = request.customer_name || 'N/A';
  const mobile = request.mobile || 'N/A';
  const service = 'service_name' in request && request.service_name ? request.service_name : (request.service_id || 'Service Request');
  const baseProperty = request.property_type || 'Apartment';
  const property = baseProperty === 'Apartment' && request.apartment_size
    ? `${baseProperty} (${request.apartment_size})`
    : baseProperty;
  const location = request.location || 'N/A';
  const date = request.preferred_date || 'As soon as possible';
  const time = request.preferred_time || 'Morning';
  const notes = request.notes ? request.notes.trim() : 'None provided';
  const photoAttached = request.photo_name ? `\nPhoto Attached: ${request.photo_name}` : '';
  const isUrgent = request.is_urgent ? ' 🚨 [URGENT EMERGENCY ALERT]' : '';
  const reqNum = requestNumber || ('request_number' in request ? request.request_number : '');
  const reqNumLine = reqNum ? `\nRequest ID: ${reqNum}` : '';

  return `NEW SERVICE REQUEST${isUrgent}${reqNumLine}

Customer:
${name}

Mobile:
${mobile}

Service:
${service}

Property Type:
${property}

Location:
${location}

Preferred Date:
${date}

Preferred Time:
${time}

Notes:
${notes}${photoAttached}`;
}

/**
 * Generates direct wa.me link with encoded message text
 */
export function generateWhatsAppLink(
  request: Partial<ServiceRequest> | BookingFormData,
  requestNumber?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Strip non-digits and handle UAE country code properly
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('9710')) {
    cleanPhone = '971' + cleanPhone.substring(4);
  } else if (cleanPhone.startsWith('050')) {
    cleanPhone = '971' + cleanPhone.substring(1);
  }
  const message = formatWhatsAppMessage(request, requestNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
