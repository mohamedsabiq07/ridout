import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCatalog } from './components/ServicesCatalog';
import { HomeCleaningSection } from './components/HomeCleaningSection';
import { ServiceModal } from './components/ServiceModal';
import { WhyUs } from './components/WhyUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ServiceAreas } from './components/ServiceAreas';
import { CustomerReviews } from './components/CustomerReviews';
import { BookingForm } from './components/BookingForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import { EmergencyPestAlert } from './components/EmergencyPestAlert';
import { AdminDashboard } from './components/AdminDashboard';
import { InsectAnimations } from './components/InsectAnimations';

import type { PestService, ServiceRequest } from './types/booking';
import { fetchAllServiceRequests } from './lib/supabase';

export function App() {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<PestService | null>(null);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string>('general-pest-control');
  
  // Submission & Success state
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Admin & Emergency Modal states
  const [adminOpen, setAdminOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  // Fetch pending count for Navbar badge
  const updatePendingCount = async () => {
    try {
      const all = await fetchAllServiceRequests();
      const pending = all.filter((r) => r.status === 'Pending').length;
      setPendingRequestsCount(pending);
    } catch (e) {
      console.warn('Error checking pending count:', e);
    }
  };

  useEffect(() => {
    updatePendingCount();
  }, []);

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedBookingServiceId(serviceId);
    }
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSubmitted = (request: ServiceRequest, waUrl: string) => {
    setSubmittedRequest(request);
    setWhatsappUrl(waUrl);
    updatePendingCount();
  };

  const handleInsectClick = (type: string) => {
    let serviceId = 'general-pest-control';
    if (type === 'cockroach') serviceId = 'cockroach-control';
    if (type === 'ant') serviceId = 'ant-control';
    if (type === 'mosquito') serviceId = 'mosquito-control';
    
    scrollToBooking(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white relative">
      
      {/* 3 Micro Insect Animations Easter Egg */}
      <InsectAnimations onInsectClick={handleInsectClick} />

      {/* Navigation */}
      <Navbar
        onBookClick={() => scrollToBooking()}
        onAdminClick={() => setAdminOpen(true)}
        onEmergencyClick={() => setEmergencyOpen(true)}
        pendingCount={pendingRequestsCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero */}
        <Hero
          onBookClick={() => scrollToBooking()}
          onViewServicesClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Pest Control Services Catalog */}
        <ServicesCatalog
          onSelectService={(service) => setSelectedServiceForModal(service)}
          onRequestService={(serviceId) => scrollToBooking(serviceId)}
        />

        {/* 3. Home Cleaning Services (Kitchen Cleaning & Bathroom Cleaning) */}
        <HomeCleaningSection
          onBookCleaning={(serviceId) => scrollToBooking(serviceId)}
          onSelectService={(service) => setSelectedServiceForModal(service)}
        />

        {/* 4. Why Choose Us */}
        <WhyUs />

        {/* 5. Process Timeline */}
        <ProcessTimeline />

        {/* 6. Service Areas */}
        <ServiceAreas />

        {/* 7. Customer Reviews */}
        <CustomerReviews />

        {/* 8. Booking / Service Request Engine */}
        <BookingForm
          preselectedServiceId={preselectedBookingServiceId}
          onRequestSubmitted={handleRequestSubmitted}
        />

        {/* 9. Contact Section */}
        <ContactSection onBookClick={() => scrollToBooking()} />
      </main>

      {/* Footer */}
      <Footer
        onBookClick={() => scrollToBooking()}
        onAdminClick={() => setAdminOpen(true)}
      />

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onRequestThisService={(serviceId) => scrollToBooking(serviceId)}
      />

      {/* Success Modal upon Form Submission */}
      <SuccessModal
        request={submittedRequest}
        whatsappUrl={whatsappUrl}
        onClose={() => setSubmittedRequest(null)}
      />

      {/* Emergency Pest Alert Floating Trigger & Modal */}
      <EmergencyPestAlert
        isOpenExternal={emergencyOpen}
        onCloseExternal={() => setEmergencyOpen(false)}
        onQuickUrgentBook={(serviceId) => scrollToBooking(serviceId)}
      />

      {/* Full Admin Dashboard Portal */}
      {adminOpen && (
        <AdminDashboard
          onClose={() => setAdminOpen(false)}
          onRequestStatusUpdated={updatePendingCount}
        />
      )}

    </div>
  );
}

export default App;
