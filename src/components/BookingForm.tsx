import React, { useState, useEffect } from 'react';
import { PEST_SERVICES } from '../data/services';
import { UAE_LOCATIONS, POPULAR_LOCATIONS } from '../data/locations';
import type { BookingFormData, ServiceRequest } from '../types/booking';
import { createServiceRequest } from '../lib/supabase';
import { generateWhatsAppLink } from '../lib/whatsapp';
import { ShieldCheck, Calendar, Clock, MapPin, Building, User, Phone, Mail, AlertCircle, Loader2, Upload, Camera, X } from 'lucide-react';

interface BookingFormProps {
  preselectedServiceId?: string;
  onRequestSubmitted: (request: ServiceRequest, whatsappUrl: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedServiceId,
  onRequestSubmitted,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: '',
    mobile: '+971 ',
    email: '',
    service_id: preselectedServiceId ? [preselectedServiceId] : [],
    property_type: 'Apartment',
    location: '',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '10:00 AM',
    notes: '',
    is_urgent: false,
    photo_name: '',
    photo_data: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, service_id: [preselectedServiceId] }));
    }
  }, [preselectedServiceId]);

  const handleServiceToggle = (id: string) => {
    setFormData((prev) => {
      const isSelected = prev.service_id.includes(id);
      const updatedServices = isSelected 
        ? prev.service_id.filter(s => s !== id)
        : [...prev.service_id, id];
        
      if (errors.service_id && updatedServices.length > 0) {
        setErrors((errs) => {
          const next = { ...errs };
          delete next.service_id;
          return next;
        });
      }
      return { ...prev, service_id: updatedServices };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo file size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        photo_name: file.name,
        photo_data: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo_name: '', photo_data: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Please enter your name.';
    }

    const cleanMobile = formData.mobile.replace(/\s+/g, '');
    if (!formData.mobile.trim() || cleanMobile === '+971' || cleanMobile.length < 8) {
      newErrors.mobile = 'Please enter a valid UAE mobile number (+971 XX XXX XXXX).';
    }

    if (!formData.service_id || formData.service_id.length === 0) {
      newErrors.service_id = 'Please select at least one service.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please select or type your area / location in UAE.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Write request to Database (Supabase + localStorage fallback)
      const createdRequest = await createServiceRequest(formData);

      // 2. Format WhatsApp link payload
      const whatsappUrl = generateWhatsAppLink(createdRequest, createdRequest.request_number);

      // 3. Trigger callback to display SuccessModal with Request ID
      onRequestSubmitted(createdRequest, whatsappUrl);
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrors({ general: 'Submission failed. Please check your internet connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pestServices = PEST_SERVICES.filter(s => s.category !== 'cleaning');
  const cleaningServices = PEST_SERVICES.filter(s => s.category === 'cleaning');

  return (
    <section id="booking-section" className="py-20 bg-[#F7F5F0] text-[#2D2D2D] border-b border-[#E2DFD7] relative">
      
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2DFD7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/10 border border-[#7A9E7E]/30 text-xs font-mono font-semibold text-[#0A0A0A]">
            <ShieldCheck className="w-4 h-4 text-[#E8871E]" />
            <span>Fast 60-Second Service Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
            Get a Free Quote & Schedule
          </h2>
          <p className="text-[#5A5A5A] text-base max-w-xl mx-auto">
            Fill in your property details below for Pest Control or Home Cleaning. Our certified team will contact you immediately to confirm arrival.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-lg shadow-2xl overflow-hidden">
          
          {/* Header Banner inside form */}
          <div className="bg-[#0A0A0A] text-white p-6 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-['Montserrat']">Instant Service Request</h3>
              <p className="text-xs text-neutral-300">Serving Dubai, Sharjah, and Ajman • 4-Month Guarantee</p>
            </div>
            <span className="text-xs font-mono font-bold bg-[#E8871E] text-white px-3 py-1 rounded uppercase">
              No Deposit Needed
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-6">

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Name & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="e.g. Mohamed Al-Sayed"
                    className={`w-full bg-[#F7F5F0] border ${
                      errors.customer_name ? 'border-red-500' : 'border-[#E2DFD7] focus:border-[#0A0A0A]'
                    } text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors`}
                  />
                </div>
                {errors.customer_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.customer_name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  UAE Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+971 0502364014"
                    className={`w-full bg-[#F7F5F0] border ${
                      errors.mobile ? 'border-red-500' : 'border-[#E2DFD7] focus:border-[#0A0A0A]'
                    } text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors font-mono`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

            </div>

            {/* Grid 2: Email & Select Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Email Address <span className="text-[#5A5A5A] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mohamed@example.com"
                    className="w-full bg-[#F7F5F0] border border-[#E2DFD7] focus:border-[#0A0A0A] text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection (Pest & Cleaning Grouped - Names Only) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Select Service(s) <span className="text-red-500">*</span>
                </label>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-[#F7F5F0] border p-3 rounded max-h-60 overflow-y-auto ${
                  errors.service_id ? 'border-red-500' : 'border-[#E2DFD7]'
                }`}>
                  <div className="col-span-full mb-1">
                    <span className="text-xs font-bold text-[#5A5A5A]">🧹 Home Cleaning</span>
                  </div>
                  {cleaningServices.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        formData.service_id.includes(s.id) ? 'bg-[#0A0A0A] border-[#0A0A0A]' : 'border-[#C2BFB7] group-hover:border-[#0A0A0A]'
                      }`}>
                        {formData.service_id.includes(s.id) && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <span className="text-sm text-[#2D2D2D] truncate">{s.name}</span>
                      <input 
                        type="checkbox"
                        className="hidden"
                        checked={formData.service_id.includes(s.id)}
                        onChange={() => handleServiceToggle(s.id)}
                      />
                    </label>
                  ))}
                  
                  <div className="col-span-full mt-2 mb-1">
                    <span className="text-xs font-bold text-[#5A5A5A]">🐜 Pest Control</span>
                  </div>
                  {pestServices.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        formData.service_id.includes(s.id) ? 'bg-[#0A0A0A] border-[#0A0A0A]' : 'border-[#C2BFB7] group-hover:border-[#0A0A0A]'
                      }`}>
                        {formData.service_id.includes(s.id) && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <span className="text-sm text-[#2D2D2D] truncate">{s.name}</span>
                      <input 
                        type="checkbox"
                        className="hidden"
                        checked={formData.service_id.includes(s.id)}
                        onChange={() => handleServiceToggle(s.id)}
                      />
                    </label>
                  ))}
                </div>
                {errors.service_id && (
                  <p className="text-xs text-red-500 mt-1">{errors.service_id}</p>
                )}
              </div>

            </div>

            {/* Grid 3: Property Type & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Property Type */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className="w-full bg-[#F7F5F0] border border-[#E2DFD7] focus:border-[#0A0A0A] text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors cursor-pointer"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Office">Office</option>
                    <option value="Shop">Shop</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Partition">Partition</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location / Area */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Location / Area in UAE <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    list="uae-areas-list"
                    placeholder="e.g. Dubai Marina, Business Bay, etc."
                    className={`w-full bg-[#F7F5F0] border ${
                      errors.location ? 'border-red-500' : 'border-[#E2DFD7] focus:border-[#0A0A0A]'
                    } text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors`}
                  />
                  <datalist id="uae-areas-list">
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                    {UAE_LOCATIONS.flatMap((e) => e.areas).map((area) => (
                      <option key={area} value={area} />
                    ))}
                  </datalist>
                </div>
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                )}
              </div>

            </div>

            {/* Grid 4: Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Date */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full bg-[#F7F5F0] border border-[#E2DFD7] focus:border-[#0A0A0A] text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#7A9E7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    className="w-full bg-[#F7F5F0] border border-[#E2DFD7] focus:border-[#0A0A0A] text-[#2D2D2D] text-sm rounded pl-10 pr-4 py-3 outline-none transition-colors cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                    <option value="11:00 AM">11:00 AM (Late Morning)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                    <option value="05:00 PM">05:00 PM (Evening Slot)</option>
                    <option value="08:00 PM">08:00 PM (Night Urgent)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2">
                Additional Notes / Cleaning Instructions
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Focus on stove degreasing, bathroom tiles limescale removal, or specific pest location..."
                className="w-full bg-[#F7F5F0] border border-[#E2DFD7] focus:border-[#0A0A0A] text-[#2D2D2D] text-sm rounded p-4 outline-none transition-colors"
              />
            </div>

            {/* Optional Photo Upload */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 flex items-center justify-between">
                <span>Upload Inspection Photos <span className="text-[#5A5A5A] font-normal">(Optional)</span></span>
                <span className="text-[10px] text-[#5A5A5A] font-normal">JPG, PNG up to 5MB</span>
              </label>

              {formData.photo_name ? (
                <div className="flex items-center justify-between bg-[#F7F5F0] border border-[#E2DFD7] p-3 rounded text-xs">
                  <div className="flex items-center gap-2 text-[#2D2D2D] truncate">
                    <Camera className="w-4 h-4 text-[#7A9E7E] shrink-0" />
                    <span className="truncate">{formData.photo_name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="text-[#5A5A5A] hover:text-[#0A0A0A] p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 w-full bg-[#F7F5F0] hover:bg-[#E2DFD7]/40 border border-dashed border-[#E2DFD7] hover:border-[#7A9E7E] rounded p-4 text-xs text-[#5A5A5A] hover:text-[#0A0A0A] cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#7A9E7E]" />
                  <span>Click to attach photos of kitchen, bathroom or pest area</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold text-base py-4 rounded transition-all shadow-xl hover:shadow-2xl active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase font-['Montserrat']"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Get a Free Quote & Submit</span>
                )}
              </button>
              <p className="text-center text-xs text-[#5A5A5A] mt-3 font-mono">
                🔒 Safe & Confidential • No Credit Card Required • Instant WhatsApp Dispatch
              </p>
            </div>

          </form>

          </div>

        </div>
      </div>
    </section>
  );
};
