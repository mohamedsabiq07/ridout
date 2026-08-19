import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PropertySelector } from '../components/PropertySelector';
import { ServicesCatalog } from '../components/ServicesCatalog';
import { HomeCleaningSection } from '../components/HomeCleaningSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { WhyUs } from '../components/WhyUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { PriceEstimator } from '../components/PriceEstimator';
import { CustomerReviews } from '../components/CustomerReviews';
import { FAQSection } from '../components/FAQSection';
import { BookingForm } from '../components/BookingForm';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ServiceModal } from '../components/ServiceModal';
import { SuccessModal } from '../components/SuccessModal';
import { EmergencyPestAlert } from '../components/EmergencyPestAlert';
import { InsectAnimations } from '../components/InsectAnimations';
import { FloatingContact } from '../components/FloatingContact';
import { LiveSocialProof } from '../components/LiveSocialProof';
import { MobileActionDock } from '../components/MobileActionDock';
import { SEO } from '../components/SEO';
import type { PestService, ServiceRequest } from '../types/booking';

export const PublicHome = () => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<PestService | null>(null);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string>('general-pest-control');
  const [preselectedPropertyType, setPreselectedPropertyType] = useState<string>('2 BHK');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  
  // Submission & Success state
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Emergency Modal states
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [isEmergencyBooking, setIsEmergencyBooking] = useState(false);

  const scrollToBooking = (serviceId?: string, isEmergency: boolean = false) => {
    if (serviceId) {
      setPreselectedBookingServiceId(serviceId);
    }
    setIsEmergencyBooking(isEmergency);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePriceEstimateBook = (
    serviceId: string,
    propertyType: string,
    rate: { min: number; max: number },
    serviceName: string
  ) => {
    setPreselectedBookingServiceId(serviceId);
    setPreselectedPropertyType(propertyType);

    // Apart from general pest, auto-populate the chosen service details in the notes section
    if (serviceId !== 'general-pest-control') {
      setPrefilledNotes(`[Rate Calculator Selected: ${serviceName} | Size: ${propertyType} | Estimated: AED ${rate.min} - ${rate.max}]`);
    } else {
      setPrefilledNotes('');
    }

    scrollToBooking(serviceId);
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
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white relative pb-16 md:pb-0">
      {/* Rich Homepage SEO & 4.9 Star Aggregate Rating Schema */}
      <SEO
        title="Best Pest Control & Deep Cleaning Dubai, Sharjah, Ajman"
        description="Municipality-approved pest control and professional deep cleaning services in Dubai, Sharjah, and Ajman. Odorless, family-safe, 4-month guarantee. Get a free quote now!"
        canonicalUrl="/"
      />

      {/* Floating UI Elements */}
      <FloatingContact />
      <LiveSocialProof />
      <MobileActionDock onBookClick={() => scrollToBooking()} />
      
      {/* 3 Micro Insect Animations Easter Egg */}
      <InsectAnimations onInsectClick={handleInsectClick} />

      {/* Navigation */}
      <Navbar
        onBookClick={() => scrollToBooking()}
        onEmergencyClick={() => setEmergencyOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onBookClick={() => scrollToBooking()}
          onEmergencyClick={() => setEmergencyOpen(true)}
        />

        <PropertySelector 
          onSelect={(type) => {
            setServiceFilter(type);
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        <ServicesCatalog
          onRequestService={(serviceId) => scrollToBooking(serviceId)}
        />

        <HomeCleaningSection
          onBookCleaning={(serviceId) => scrollToBooking(serviceId)}
        />

        {/* Option A: Interactive Visual Transformation Slider */}
        <BeforeAfterSlider
          onBookClick={(serviceId) => scrollToBooking(serviceId)}
        />

        <WhyUs />
        
        {/* Option C: Instant Rate Calculator with Live Sync */}
        <PriceEstimator
          onSelectAndBook={handlePriceEstimateBook}
        />

        <ProcessTimeline />
        <CustomerReviews />

        {/* Option C: High-Ranking FAQ Accordion with Schema */}
        <FAQSection />

        <BookingForm
          preselectedServiceId={preselectedBookingServiceId}
          preselectedPropertyCategory={serviceFilter === 'all' ? null : serviceFilter}
          preselectedPropertyType={preselectedPropertyType}
          prefilledNotes={prefilledNotes}
          isEmergency={isEmergencyBooking}
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
        onQuickUrgentBook={(serviceId) => scrollToBooking(serviceId, true)}
      />
    </div>
  );
};
