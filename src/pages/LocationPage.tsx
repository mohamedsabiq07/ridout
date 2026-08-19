import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingForm } from '../components/BookingForm';
import { SEO } from '../components/SEO';
import { MapPin, ShieldCheck, Clock, PhoneCall, Sparkles } from 'lucide-react';

const LOCATION_SLUG_MAP: Record<string, { name: string; emirate: string; landmarks: string[] }> = {
  'dubai': { name: 'Dubai', emirate: 'Dubai', landmarks: ['Dubai Marina', 'Downtown', 'Palm Jumeirah', 'JVC'] },
  'sharjah': { name: 'Sharjah', emirate: 'Sharjah', landmarks: ['Al Majaz', 'Al Nahda', 'Al Khan', 'Muwaileh'] },
  'ajman': { name: 'Ajman', emirate: 'Ajman', landmarks: ['Ajman Downtown', 'Al Nuaimiya', 'Al Rashidiya', 'Al Jurf'] },
  'dubai-marina': { name: 'Dubai Marina', emirate: 'Dubai', landmarks: ['Marina Promenade', 'JBR', 'Marina Walk'] },
  'downtown-dubai': { name: 'Downtown Dubai', emirate: 'Dubai', landmarks: ['Burj Khalifa area', 'Business Bay', 'DIFC'] },
  'palm-jumeirah': { name: 'Palm Jumeirah', emirate: 'Dubai', landmarks: ['The Palm Crescents', 'Shoreline', 'Fronds Villas'] },
  'business-bay': { name: 'Business Bay', emirate: 'Dubai', landmarks: ['Executive Towers', 'Marasi Drive', 'Bay Square'] },
  'jvc': { name: 'Jumeirah Village Circle (JVC)', emirate: 'Dubai', landmarks: ['District 10-18', 'Circle Mall', 'JVC Villas'] },
  'jlt': { name: 'Jumeirah Lakes Towers (JLT)', emirate: 'Dubai', landmarks: ['Clusters A-Z', 'JLT Parks', 'DMCC area'] },
  'al-barsha': { name: 'Al Barsha & Barsha Heights', emirate: 'Dubai', landmarks: ['Barsha 1-3', 'Barsha South', 'TECOM'] },
  'arabian-ranches': { name: 'Arabian Ranches', emirate: 'Dubai', landmarks: ['Ranches 1 & 2', 'Mudon', 'Damac Hills'] },
  'mirdif': { name: 'Mirdif', emirate: 'Dubai', landmarks: ['Uptown Mirdif', 'Ghoroob', 'Shorooq'] },
  'al-nahda-sharjah': { name: 'Al Nahda Sharjah', emirate: 'Sharjah', landmarks: ['Sahara Centre area', 'Al Nahda Park', 'Dubai Border'] },
  'al-majaz': { name: 'Al Majaz & Waterfront', emirate: 'Sharjah', landmarks: ['Al Majaz 1-3', 'Corniche Street', 'Buheirah'] },
  'ajman-downtown': { name: 'Ajman Downtown', emirate: 'Ajman', landmarks: ['Grand Mall area', 'Al Nuaimiya', 'Corniche Ajman'] }
};

export const LocationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const normalizedSlug = (slug || '').toLowerCase();
  const locationInfo = LOCATION_SLUG_MAP[normalizedSlug] || {
    name: (slug || '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    emirate: 'UAE',
    landmarks: ['Residential Towers', 'Villas', 'Commercial Areas']
  };

  const locationName = locationInfo.name;

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Ridout Pest Control & Cleaning ${locationName}`,
    image: 'https://ridoutpest.com/hero-bg.jpg',
    telephone: '+971554720124',
    priceRange: 'AED 129 - AED 999',
    areaServed: locationName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationName,
      addressRegion: locationInfo.emirate,
      addressCountry: 'AE'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '348'
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A] font-sans">
      <SEO 
        title={`Pest Control & Cleaning in ${locationName} | 24/7 Fast Dispatch`} 
        description={`Municipality-approved pest control, cockroach eradication, bed bug treatment, and deep cleaning in ${locationName}, ${locationInfo.emirate}. 4-Month guarantee. Call +971 554720124.`} 
        canonicalUrl={`/locations/${slug}`}
        schemaMarkup={schemaMarkup}
      />

      <Navbar
        onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
        onEmergencyClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <main>
        {/* Location Hero */}
        <section className="bg-[#0A0A0A] text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8871E]/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-mono font-semibold text-[#E8871E]">
              <MapPin className="w-4 h-4" />
              <span>Dedicated Dispatch Hub • {locationInfo.emirate}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Montserrat'] tracking-tight leading-tight">
              Certified Pest Control & Deep Cleaning in <br />
              <span className="text-[#E8871E]">{locationName}</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Fast, odorless, and eco-safe pest elimination serving apartments, villas, and commercial properties across {locationName}. Safe for children and pets with a 4-Month warranty.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-[#E8871E] hover:bg-[#d47817] text-white font-extrabold rounded-lg uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl cursor-pointer font-['Montserrat']"
              >
                Book Service in {locationName}
              </button>

              <a
                href="tel:+971554720124"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-[#171717] hover:bg-neutral-800 border border-neutral-700 text-white font-bold rounded-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#E8871E]" />
                <span>Call +971 554720124</span>
              </a>
            </div>

            {/* Landmarks Tag Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
              <span className="font-mono text-neutral-500">Key Areas Covered:</span>
              {locationInfo.landmarks.map((landmark, idx) => (
                <span key={idx} className="bg-[#171717] border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits specific to location */}
        <section className="py-16 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-[#F7F7F7] rounded-xl border border-neutral-200">
                <Clock className="w-8 h-8 text-[#E8871E] mb-4" />
                <h3 className="text-lg font-bold font-['Montserrat'] mb-2">60-Min {locationName} Dispatch</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Our mobile vans operate directly in {locationName}, allowing fast emergency arrival for severe cockroach, bed bug, or rodent infestations.
                </p>
              </div>
              <div className="p-6 bg-[#F7F7F7] rounded-xl border border-neutral-200">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-bold font-['Montserrat'] mb-2">Municipality Approved & Odorless</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Every treatment strictly complies with {locationInfo.emirate} Municipality standards. 100% safe for households with toddlers and pets.
                </p>
              </div>
              <div className="p-6 bg-[#F7F7F7] rounded-xl border border-neutral-200">
                <Sparkles className="w-8 h-8 text-[#E8871E] mb-4" />
                <h3 className="text-lg font-bold font-['Montserrat'] mb-2">4-Month Free Guarantee</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Complete peace of mind. If pests return during the 4-month warranty window, our certified team re-treats your property at zero charge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List for this location */}
        <section className="py-20 bg-[#F7F5F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider">Available Treatments</span>
              <h2 className="text-3xl font-black font-['Montserrat'] mt-1">Services in {locationName}</h2>
              <p className="text-neutral-600 text-sm mt-2">All treatments include on-site inspection and a warranty certificate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PEST_SERVICES.map((service) => (
                <Link
                  to={`/services/${service.slug}`}
                  key={service.id}
                  className="bg-white p-6 rounded-xl border border-[#E2DFD7] hover:border-[#E8871E] shadow-sm hover:shadow-lg transition-all block group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F7F5F0] text-neutral-600">
                      {service.category === 'cleaning' ? 'Cleaning' : 'Pest Control'}
                    </span>
                    <span className="text-xs font-mono text-[#E8871E] font-bold">{service.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-2 group-hover:text-[#E8871E] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-section" className="py-20 bg-white border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black font-['Montserrat'] text-[#0A0A0A]">
                Schedule Service in {locationName}
              </h2>
              <p className="text-neutral-600 text-sm mt-2">No advance deposit needed. Free instant quote.</p>
            </div>
            <BookingForm onRequestSubmitted={() => {}} />
          </div>
        </section>
      </main>

      <Footer onBookClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })} />
    </div>
  );
};
