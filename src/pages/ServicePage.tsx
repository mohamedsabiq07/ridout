import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingForm } from '../components/BookingForm';
import { SuccessModal } from '../components/SuccessModal';
import { SEO } from '../components/SEO';
import { ShieldAlert, Bug, BugOff, Target, ShieldCheck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import type { ServiceRequest } from '../types/booking';

const IconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Bug,
  BugOff,
  Target,
  ShieldCheck,
};

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const service = PEST_SERVICES.find(s => s.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Service Not Found</h1>
        <p className="text-neutral-600 mb-8">We couldn't find the pest control service you're looking for.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#E8871E] text-white font-bold rounded">
          Return Home
        </button>
      </div>
    );
  }

  const handleRequestSubmitted = (request: ServiceRequest, waUrl: string) => {
    setSubmittedRequest(request);
    setWhatsappUrl(waUrl);
  };

  const IconComponent = IconMap[service.iconName] || ShieldAlert;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} in Dubai, Sharjah, and Ajman`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "RIDOUT Pest Control & Cleaning Services UAE",
      "telephone": "+971554720124",
      "url": "https://ridoutpestcontrol.ae",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Dubai, Sharjah, Ajman",
        "addressCountry": "AE"
      }
    },
    "areaServed": ["Dubai", "Sharjah", "Ajman"],
    "description": service.fullDesc
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A] font-sans">
      <SEO 
        title={`${service.name} in Dubai & Sharjah`} 
        description={service.fullDesc} 
        canonicalUrl={`/services/${service.slug}`}
        schemaMarkup={schemaMarkup}
      />

      <Navbar onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} onEmergencyClick={() => {}} />

      <main>
        {/* Service Hero */}
        <section className="bg-[#0A0A0A] text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 max-w-3xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8871E]/20 text-[#E8871E] mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Price & Compliance Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#E8871E]/20 border border-[#E8871E]/40 text-[#E8871E] text-xs font-mono font-bold uppercase tracking-wider">
                    {service.startingPrice || 'Starting from AED 99'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dubai Municipality Section Approved</span>
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Montserrat'] mb-6 leading-tight">
                  Professional {service.name} <br />
                  <span className="text-[#E8871E]">in Dubai, Sharjah &amp; Ajman</span>
                </h1>
                <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                  {service.fullDesc}
                </p>
                
                {/* 1-Tap WhatsApp + Booking CTA Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={`https://wa.me/971554720124?text=${encodeURIComponent(`Hi RIDOUT Team! 👋 I would like to book a 1-tap consultation for *${service.name}* (${service.startingPrice || 'Starting Price'}). Please share earliest available dispatch slots.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer font-mono"
                  >
                    <span>WhatsApp 1-Tap Booking</span>
                  </a>

                  <button 
                    onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#E8871E] hover:bg-[#d47817] text-white px-7 py-4 rounded font-extrabold uppercase tracking-wide text-xs transition-colors cursor-pointer"
                  >
                    Book Online Form
                  </button>
                </div>
              </div>

              {/* Hero Visual Card with Real Technician Photo */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative bg-[#171717] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl space-y-0 group">
                  
                  {/* Feature Image Header */}
                  <div className="relative h-64 sm:h-72 overflow-hidden border-b border-[#2A2A2A]">
                    <img
                      src="/pest-technician.jpg"
                      alt="Certified Pest Control Technician Spraying Treatment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />
                    
                    {/* Live Badge Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0A]/90 border border-neutral-700 backdrop-blur-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E8871E] animate-ping" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        Live Dispatch Ready
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/90 border border-neutral-800 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
                      Dubai, Sharjah, and Ajman
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-sm font-extrabold text-white font-['Montserrat'] tracking-wide">
                        Certified Eco-Safe Treatment
                      </div>
                      <div className="text-xs text-neutral-300 font-medium">
                        Targeted spray & odorless micro-encapsulated gel protection
                      </div>
                    </div>
                  </div>

                  {/* Service Inspection Checklist Graphic */}
                  <div className="p-6 space-y-4 bg-[#171717]">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#7A9E7E]/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">Guaranteed Pest Elimination</div>
                          <div className="text-xs text-neutral-400">Cockroaches, Ants, Bed Bugs & Rodents</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#E8871E]/50 transition-colors">
                        <Clock className="w-5 h-5 text-[#E8871E] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">Same-Day Rapid Dispatch</div>
                          <div className="text-xs text-neutral-400">Morning, Afternoon & Evening booking slots</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-[#0A0A0A] p-3 rounded border border-neutral-800 hover:border-[#7A9E7E]/50 transition-colors">
                        <MapPin className="w-5 h-5 text-[#7A9E7E] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">Serving Dubai, Sharjah, and Ajman</div>
                          <div className="text-xs text-neutral-400">Fast arrival across all residential & commercial zones</div>
                        </div>
                      </div>
                    </div>

                    {/* Hero Callout */}
                    <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded text-center space-y-2">
                      <p className="text-xs text-[#E8871E] uppercase tracking-widest font-mono font-bold">Instant Quote & Scheduling</p>
                      <p className="text-sm font-semibold text-white">No mandatory registration required.</p>
                      <button
                        onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full mt-2 bg-[#E8871E] hover:bg-[#d47817] text-white py-2.5 rounded text-xs font-extrabold transition-colors cursor-pointer uppercase tracking-wider shadow-lg font-['Montserrat']"
                      >
                        Get a Free Quote (60 Sec)
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6 font-['Montserrat']">What We Target</h2>
                  <ul className="space-y-3">
                    {service.problems.map((prob, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#E8871E] shrink-0 mt-0.5" />
                        <span className="text-lg text-neutral-700">{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6 font-['Montserrat']">
                    {service.category === 'cleaning' ? 'Before Cleaning' : (service.id === 'disinfection-sanitization' ? 'Before Service' : 'Before Treatment')}
                  </h2>
                  <ul className="space-y-4">
                    {service.preparationSteps.map((step, i) => (
                      <li key={i} className="flex gap-4 p-4 bg-[#F7F7F7] rounded border border-neutral-200">
                        <span className="font-bold text-[#E8871E]">0{i + 1}</span>
                        <span className="text-neutral-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.aftercareSteps && service.aftercareSteps.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 font-['Montserrat'] mt-12">
                      {service.category === 'cleaning' ? 'After Cleaning' : (service.id === 'disinfection-sanitization' ? 'After Service' : 'After Treatment')}
                    </h2>
                    <ul className="space-y-4">
                      {service.aftercareSteps.map((step, i) => (
                        <li key={i} className="flex gap-4 p-4 bg-[#F7F7F7] rounded border border-neutral-200">
                          <span className="font-bold text-[#1C2C54]">0{i + 1}</span>
                          <span className="text-neutral-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.importantNote && (
                  <div className="bg-[#FEFCE8] p-6 rounded-lg border border-[#E8871E] mt-12">
                    <h3 className="font-bold text-lg mb-2 text-[#E8871E]">
                      {service.category === 'cleaning' ? 'Service Scope / Special Note' : 'Important'}
                    </h3>
                    <p className="text-neutral-800">{service.importantNote}</p>
                  </div>
                )}
              </div>

              <div className="bg-[#F7F7F7] p-8 rounded-xl border border-neutral-200 h-fit space-y-6">
                <h3 className="text-xl font-bold font-['Montserrat'] border-b border-neutral-300 pb-4">Service Overview</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-500 uppercase tracking-wider font-bold">Treatment Method</span>
                    <span className="font-medium text-right max-w-[200px]">{service.method}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-500 uppercase tracking-wider font-bold">Duration</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-500 uppercase tracking-wider font-bold">Suitable For</span>
                    <span className="font-medium text-right max-w-[200px]">{service.suitableFor.join(', ')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-section" className="py-20 bg-[#F7F7F7]">
          <BookingForm preselectedServiceId={service.id} onRequestSubmitted={handleRequestSubmitted} />
        </section>
      </main>

      <Footer onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} />

      <SuccessModal
        request={submittedRequest}
        whatsappUrl={whatsappUrl}
        onClose={() => setSubmittedRequest(null)}
      />
    </div>
  );
};
