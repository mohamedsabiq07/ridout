import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTY_PAGES } from '../data/propertyPages';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BookingForm } from '../components/BookingForm';
import { SuccessModal } from '../components/SuccessModal';
import { 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { generateQuickServiceWhatsAppLink } from '../lib/whatsapp';
import type { ServiceRequest } from '../types/booking';

export const PropertyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const property = PROPERTY_PAGES.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Property Solution Not Found</h1>
        <p className="text-neutral-600 mb-8">The requested property pest control solution does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-[#E8871E] text-white font-bold rounded-full">
          Return Home
        </Link>
      </div>
    );
  }

  const matchedServices = PEST_SERVICES.filter(s => property.popularServices.includes(s.slug) || property.popularServices.includes(s.id));
  const waLink = generateQuickServiceWhatsAppLink('Pest Control for ' + property.propertyType);

  const propertySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': property.title,
    'description': property.metaDescription,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'RIDOUT Pest Control & Cleaning UAE',
      'telephone': '+971554720124',
      'url': 'https://ridoutpestcontrol.ae'
    },
    'areaServed': ['Dubai', 'Sharjah', 'Ajman']
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2D2D2D] font-sans selection:bg-[#0A0A0A] selection:text-white">
      <SEO
        title={property.metaTitle}
        description={property.metaDescription}
        canonicalUrl={'/property/' + property.slug}
        schemaMarkup={propertySchema}
      />

      <Navbar onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} onEmergencyClick={() => {}} />

      <main className="pt-28 pb-20">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#E8871E] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-500">Property Solutions</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 font-semibold">{property.propertyType}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#0A0A0A] text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-2xl border border-[#2A2A2A]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8871E]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#E8871E]/20 text-[#E8871E] border border-[#E8871E]/30 text-xs font-mono font-bold uppercase tracking-wider">
                  {property.heroBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-400 text-xs font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dubai Municipality Approved</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Montserrat'] text-white leading-tight">
                {property.title}
              </h1>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                {property.summary}
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-7 py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40 cursor-pointer uppercase font-mono"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 1-Tap Booking</span>
                </a>
                <button
                  onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#E8871E] hover:bg-[#d47817] text-white font-bold text-xs px-7 py-4 rounded-full flex items-center justify-center gap-2 transition-colors uppercase font-mono cursor-pointer"
                >
                  <span>Request Inspection</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column: Key Challenges vs Tailored Protocol */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Architectural & Operational Challenges */}
            <div className="bg-white border border-[#E2DFD7] rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Environmental &amp; Infrastructure Challenges</span>
              </div>
              <h2 className="text-2xl font-bold font-['Montserrat'] text-[#0A0A0A]">
                Why Pests Thrive in Dubai {property.propertyType} Properties
              </h2>
              <ul className="space-y-4">
                {property.keyChallenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#F7F5F0] p-4 rounded-2xl border border-[#E2DFD7]">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2"></span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIDOUT Certified Protocol */}
            <div className="bg-white border border-[#E2DFD7] rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certified Engineering Methodology</span>
              </div>
              <h2 className="text-2xl font-bold font-['Montserrat'] text-[#0A0A0A]">
                RIDOUT's Tailored Eradication Protocol
              </h2>
              <ul className="space-y-4">
                {property.tailoredApproach.map((approach, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#F7F5F0] p-4 rounded-2xl border border-[#E2DFD7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{approach}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* Recommended Services Grid */}
        {matchedServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="bg-white border border-[#E2DFD7] rounded-3xl p-8 sm:p-10 shadow-sm">
              <div className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider mb-2">Targeted Services</div>
              <h3 className="text-2xl font-bold font-['Montserrat'] text-[#0A0A0A] mb-8">
                Recommended Treatments for {property.propertyType} Properties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-6 rounded-2xl border border-[#E2DFD7] hover:border-[#E8871E] bg-[#F7F5F0] hover:bg-white transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#E8871E] mb-2">{svc.startingPrice}</div>
                      <h4 className="text-base font-bold font-['Montserrat'] text-[#0A0A0A] group-hover:text-[#E8871E] transition-colors mb-2">
                        {svc.name}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                        {svc.shortDesc}
                      </p>
                    </div>
                    <Link
                      to={'/services/' + svc.slug}
                      className="text-xs font-mono font-bold text-[#0A0A0A] hover:text-[#E8871E] flex items-center gap-1 pt-3 border-t border-[#E2DFD7]"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {property.faqs && property.faqs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-12 border border-[#2A2A2A] shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E8871E] font-bold uppercase tracking-widest mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Property FAQs</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] mb-8 text-white">
                Frequently Asked Questions for {property.propertyType}s
              </h3>
              <div className="space-y-4">
                {property.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-6 space-y-2">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-100 flex items-start gap-2">
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

        {/* Direct Booking Section Form */}
        <section id="booking-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E2DFD7] rounded-3xl p-8 sm:p-12 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8871E]">Immediate Dispatch</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-[#0A0A0A] mt-1">
                Book {property.propertyType} Pest Control
              </h3>
              <p className="text-xs text-neutral-500 mt-2">Zero advance deposit required. Pay only upon 100% satisfactory completion.</p>
            </div>

            <BookingForm 
              preselectedServiceId={property.popularServices[0]} 
              onRequestSubmitted={(req, wa) => {
                setSubmittedRequest(req);
                setWhatsappUrl(wa);
              }} 
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
