import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingForm } from '../components/BookingForm';
import { SuccessModal } from '../components/SuccessModal';
import { SEO } from '../components/SEO';
import { 
  ShieldAlert, 
  Bug, 
  BugOff, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageCircle,
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import type { ServiceRequest } from '../types/booking';

const IconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Bug,
  BugOff,
  Target,
  ShieldCheck,
  Sparkles
};

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const service = PEST_SERVICES.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Service Not Found</h1>
        <p className="text-neutral-600 mb-8">The pest control or cleaning service you requested does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-[#E8871E] text-white font-bold rounded-full">
          Browse All Services
        </Link>
      </div>
    );
  }

  const IconComponent = IconMap[service.iconName] || ShieldCheck;

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.fullDesc,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'RIDOUT Pest Control & Cleaning Services UAE',
      'telephone': '+971554720124',
      'url': 'https://ridoutpestcontrol.ae'
    },
    'areaServed': ['Dubai', 'Sharjah', 'Ajman'],
    'offers': {
      '@type': 'Offer',
      'price': service.startingPrice.replace(/[^0-9]/g, '') || '99',
      'priceCurrency': 'AED'
    }
  };

  const handleBookingSuccess = (req: ServiceRequest, waLink?: string) => {
    setSubmittedRequest(req);
    if (waLink) setWhatsappUrl(waLink);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2D2D2D] font-sans selection:bg-[#0A0A0A] selection:text-white">
      <SEO 
        title={service.name + ' | RIDOUT Dubai UAE'} 
        description={service.fullDesc} 
        canonicalUrl={'/services/' + service.slug}
        schemaMarkup={schemaMarkup}
      />

      <Navbar onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} onEmergencyClick={() => {}} />

      <main>
        {/* Service Hero */}
        <section className="bg-[#0A0A0A] text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            {service.imageUrl && (
              <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover opacity-15" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#E8871E] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <Link to="/#services" className="hover:text-[#E8871E] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-neutral-200 font-semibold">{service.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 max-w-3xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8871E]/20 text-[#E8871E] mb-6 border border-[#E8871E]/30">
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Price & Compliance Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#E8871E]/20 border border-[#E8871E]/40 text-[#E8871E] text-xs font-mono font-bold uppercase tracking-wider">
                    {service.startingPrice}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dubai Municipality Section Approved</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Montserrat'] mb-4 leading-tight">
                  {service.name}
                </h1>
                
                {service.subtitle && (
                  <p className="text-sm sm:text-base font-mono text-[#E8871E] font-bold mb-4">
                    {service.subtitle}
                  </p>
                )}

                <p className="text-base sm:text-lg text-neutral-300 mb-8 leading-relaxed">
                  {service.fullDesc}
                </p>
                
                {/* 1-Tap WhatsApp + Booking CTA Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={'https://wa.me/971554720124?text=' + encodeURIComponent('Hi RIDOUT Team! 👋 I would like to book a 1-tap consultation for *' + service.name + '* (' + service.startingPrice + '). Please confirm earliest available dispatch.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-full font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer font-mono"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp 1-Tap Booking</span>
                  </a>

                  <button 
                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#E8871E] hover:bg-[#d47817] text-white px-7 py-4 rounded-full font-extrabold uppercase tracking-wide text-xs transition-colors cursor-pointer font-mono"
                  >
                    Book Online Form
                  </button>
                </div>
              </div>

              {/* Hero Visual Card */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative bg-[#171717] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl space-y-0 group">
                  <div className="relative h-60 overflow-hidden border-b border-[#2A2A2A]">
                    <img
                      src="/pest-technician.jpg"
                      alt="Certified Pest Control Technician Spraying Treatment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0A]/90 border border-neutral-700 backdrop-blur-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E8871E] animate-ping" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        60-Min Dispatch Ready
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-sm font-extrabold text-white font-['Montserrat'] tracking-wide">
                        Municipality-Registered Chemistry
                      </div>
                      <div className="text-xs text-neutral-300">
                        100% Non-Hazardous for Infants, Kids &amp; Pets
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 bg-[#171717] text-xs">
                    <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded-xl border border-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-[#7A9E7E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">Full Eradication Guarantee</div>
                        <div className="text-neutral-400">{service.warrantyDetails || '4-Month Free Re-Treatment Protection'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded-xl border border-neutral-800">
                      <Clock className="w-4 h-4 text-[#E8871E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">Treatment Duration</div>
                        <div className="text-neutral-400">{service.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded-xl border border-neutral-800">
                      <MapPin className="w-4 h-4 text-[#7A9E7E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">Service Zones</div>
                        <div className="text-neutral-400">Dubai • Sharjah • Ajman</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Treat & Targeted Species */}
        {service.whatWeTreat && service.whatWeTreat.length > 0 && (
          <section className="py-16 bg-white border-b border-[#E2DFD7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider mb-2">Scope of Eradication</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A0A0A] mb-8">
                What We Treat Under This Service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.whatWeTreat.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#F7F5F0] p-4 rounded-2xl border border-[#E2DFD7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why They Appear in Dubai (Architectural & Climate Mechanisms) */}
        {service.whyTheyAppearInDubai && service.whyTheyAppearInDubai.length > 0 && (
          <section className="py-16 bg-[#F7F5F0] border-b border-[#E2DFD7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <div className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider mb-2">Dubai Climate &amp; Architecture</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
                  Why These Pests Appear in Dubai Properties
                </h2>
                {service.dubaiClimateObservation && (
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                    {service.dubaiClimateObservation}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.whyTheyAppearInDubai.map((mech, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-[#E8871E] flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold font-['Montserrat'] text-[#0A0A0A]">
                      {mech.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {mech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5-Step Process Methodology */}
        {service.processSteps && service.processSteps.length > 0 && (
          <section className="py-16 bg-white border-b border-[#E2DFD7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider mb-2">Scientific IPM Process</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
                  How RIDOUT Treats This Issue
                </h2>
                <p className="text-xs text-neutral-500 mt-2">
                  Professional pest control is an engineering process of source identification, targeted baiting, and monitoring—not a generic spray bottle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {service.processSteps.map((step) => (
                  <div key={step.stepNumber} className="bg-[#F7F5F0] p-6 rounded-3xl border border-[#E2DFD7] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A] text-[#E8871E] flex items-center justify-center font-mono font-black text-sm mb-4">
                        {step.stepNumber}
                      </div>
                      <h3 className="text-base font-bold font-['Montserrat'] text-[#0A0A0A] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Preparation Checklist & Post-Treatment Care (2 Columns) */}
        <section className="py-16 bg-[#F7F5F0] border-b border-[#E2DFD7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Preparation Checklist */}
              <div className="bg-white p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#E8871E]" />
                  <span>Before Technician Arrival</span>
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A0A0A]">
                  Preparation Checklist
                </h3>
                <ul className="space-y-3">
                  {service.preparationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E2DFD7]">
                      <span className="w-2 h-2 rounded-full bg-[#E8871E] shrink-0 mt-2"></span>
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Happens After Treatment */}
              <div className="bg-white p-8 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Post-Treatment Care &amp; Timeline</span>
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A0A0A]">
                  What Happens After Treatment
                </h3>
                
                {service.postTreatmentWhatHappens && service.postTreatmentWhatHappens.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {service.postTreatmentWhatHappens.map((timeline, idx) => (
                      <div key={idx} className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-600/20 text-xs text-emerald-950 leading-relaxed">
                        {timeline}
                      </div>
                    ))}
                  </div>
                )}

                {service.aftercareSteps && service.aftercareSteps.length > 0 && (
                  <ul className="space-y-3">
                    {service.aftercareSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E2DFD7]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Dedicated FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-16 bg-[#0A0A0A] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E8871E] font-bold uppercase tracking-widest mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Expert Q&amp;A</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] mb-8 text-white">
                Frequently Asked Questions about {service.name}
              </h3>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#171717] border border-[#2A2A2A] rounded-2xl p-6 space-y-2">
                    <h4 className="text-base font-bold text-neutral-100 flex items-start gap-2">
                      <span className="text-[#E8871E] font-mono">Q:</span>
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking Form Section */}
        <section id="booking-section" className="py-20 bg-white border-t border-[#E2DFD7]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8871E]">Immediate 60-Min Dispatch</span>
              <h3 className="text-3xl font-extrabold font-['Montserrat'] text-[#0A0A0A] mt-1">
                Schedule {service.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-2">Zero advance deposit. Instant WhatsApp confirmation available.</p>
            </div>

            <BookingForm 
              preselectedServiceId={service.id} 
              onRequestSubmitted={handleBookingSuccess} 
            />
          </div>
        </section>

      </main>

      <Footer onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} />

      {submittedRequest && (
        <SuccessModal 
          request={submittedRequest} 
          whatsappUrl={whatsappUrl} 
          onClose={() => setSubmittedRequest(null)} 
        />
      )}
    </div>
  );
};
