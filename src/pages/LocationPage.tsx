import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingForm } from '../components/BookingForm';
import { SEO } from '../components/SEO';
import { MapPin, ShieldCheck, Clock } from 'lucide-react';

const validLocations = ['dubai', 'sharjah', 'ajman'];

export const LocationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !validLocations.includes(slug.toLowerCase())) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Location Not Found</h1>
        <p className="text-neutral-600 mb-8">We couldn't find the location page you're looking for.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#E8871E] text-white font-bold rounded">
          Return Home
        </button>
      </div>
    );
  }

  const locationName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Ridout Pest Control ${locationName}`,
    "image": "https://ridoutpest.com/hero-bg.jpg",
    "telephone": "+9710502364014",
    "areaServed": locationName,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationName,
      "addressCountry": "AE"
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A] font-sans">
      <SEO 
        title={`Pest Control in ${locationName} | Fast & Reliable Service`} 
        description={`Professional, eco-friendly pest control and home cleaning services in ${locationName}. Safe for families and pets. Get a free quote today!`} 
        canonicalUrl={`/locations/${slug}`}
        schemaMarkup={schemaMarkup}
      />

      <Navbar onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} onEmergencyClick={() => {}} />

      <main>
        {/* Location Hero */}
        <section className="bg-[#0A0A0A] text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8871E]/20 text-[#E8871E] mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Montserrat'] mb-6 leading-tight">
              Expert Pest Control in <br />
              <span className="text-[#E8871E]">{locationName}</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Serving {locationName} with fast, eco-safe, and highly effective pest elimination. Whether it's cockroaches, bed bugs, or general home cleaning, we dispatch our certified technicians directly to you.
            </p>
            <button 
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#E8871E] hover:bg-[#d47817] text-white px-8 py-4 rounded font-extrabold uppercase tracking-wide transition-colors"
            >
              Book Service in {locationName}
            </button>
          </div>
        </section>

        {/* Benefits specific to location */}
        <section className="py-12 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <Clock className="w-10 h-10 text-[#E8871E] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Fast {locationName} Dispatch</h3>
                <p className="text-neutral-600 text-sm">We have teams actively operating in {locationName} for quick response times.</p>
              </div>
              <div className="p-6">
                <ShieldCheck className="w-10 h-10 text-[#7A9E7E] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Municipality Approved</h3>
                <p className="text-neutral-600 text-sm">Our treatments are fully certified and safe for apartments and villas in {locationName}.</p>
              </div>
              <div className="p-6">
                <MapPin className="w-10 h-10 text-[#E8871E] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Local Expertise</h3>
                <p className="text-neutral-600 text-sm">We know the exact pest challenges specific to {locationName}'s climate and architecture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List for this location */}
        <section className="py-20 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-center mb-12 font-['Montserrat']">Services Available in {locationName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PEST_SERVICES.map(service => (
                <Link to={`/services/${service.slug}`} key={service.id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 hover:border-[#E8871E] transition-colors block group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#E8871E] transition-colors">{service.name}</h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">{service.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-section" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-center mb-8 font-['Montserrat']">Request a Quote for {locationName}</h2>
            <BookingForm onRequestSubmitted={() => {}} />
          </div>
        </section>
      </main>

      <Footer onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} />
    </div>
  );
};
