import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesCatalog } from '../components/ServicesCatalog';
import { HomeCleaningSection } from '../components/HomeCleaningSection';
import { ServiceModal } from '../components/ServiceModal';
import { WhyUs } from '../components/WhyUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { CustomerReviews } from '../components/CustomerReviews';
import { BookingForm } from '../components/BookingForm';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { SuccessModal } from '../components/SuccessModal';
import { EmergencyPestAlert } from '../components/EmergencyPestAlert';
import { InsectAnimations } from '../components/InsectAnimations';
import { FloatingContact } from '../components/FloatingContact';
import type { PestService, ServiceRequest } from '../types/booking';

export const PublicHome = () => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<PestService | null>(null);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string>('general-pest-control');
  
  // Submission & Success state
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Emergency Modal states
  const [emergencyOpen, setEmergencyOpen] = useState(false);

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
      <FloatingContact />
      
      {/* 3 Micro Insect Animations Easter Egg */}
      <InsectAnimations onInsectClick={handleInsectClick} />

      {/* Navigation - No admin specific counts passed anymore */}
      <Navbar
        onBookClick={() => scrollToBooking()}
        onEmergencyClick={() => setEmergencyOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onBookClick={() => scrollToBooking()}
          onViewServicesClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServicesCatalog
          onRequestService={(serviceId) => scrollToBooking(serviceId)}
        />

        <HomeCleaningSection
          onBookCleaning={(serviceId) => scrollToBooking(serviceId)}
        />

        <WhyUs />
        <ProcessTimeline />
        <CustomerReviews />

        <BookingForm
          preselectedServiceId={preselectedBookingServiceId}
          onRequestSubmitted={handleRequestSubmitted}
        />

        <ContactSection onBookClick={() => scrollToBooking()} />
      </main>

      <Footer onBookClick={() => scrollToBooking()} />

      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onRequestThisService={(serviceId) => scrollToBooking(serviceId)}
      />

      <SuccessModal
        request={submittedRequest}
        whatsappUrl={whatsappUrl}
        onClose={() => setSubmittedRequest(null)}
      />

      <EmergencyPestAlert
        isOpenExternal={emergencyOpen}
        onCloseExternal={() => setEmergencyOpen(false)}
        onQuickUrgentBook={(serviceId) => scrollToBooking(serviceId)}
      />
    </div>
  );
};
