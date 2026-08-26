import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PEST_GUIDES } from '../data/guides';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const GuidesHubPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2D2D2D] font-sans selection:bg-[#0A0A0A] selection:text-white">
      <SEO
        title="Dubai Pest Control Guides & Knowledge Base | RIDOUT UAE"
        description="Comprehensive guides on cockroach control in Dubai apartments, transparent pest control pricing, bed bug eradication, villa mosquito misting, and municipality food safety compliance."
        canonicalUrl="/guides"
      />

      <Navbar onBookClick={() => navigate('/#booking-section')} onEmergencyClick={() => navigate('/#booking-section')} />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-600/20 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Municipality Certified Expert Knowledge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
              Dubai Pest Control <span className="text-[#E8871E]">Guides &amp; Advice</span>
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              In-depth research, architectural diagnosis, transparent pricing breakdowns, and municipality compliance rules tailored for UAE properties.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PEST_GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white border border-[#E2DFD7] hover:border-[#E8871E] rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-[#0A0A0A] text-[#E8871E] font-mono font-bold uppercase tracking-wider text-[10px]">
                      {guide.category}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A] group-hover:text-[#E8871E] transition-colors leading-snug">
                    <Link to={'/guide/' + guide.slug} className="focus:outline-none">
                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                      {guide.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E2DFD7] flex items-center justify-between text-xs font-mono font-bold text-[#E8871E] mt-6">
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer onBookClick={() => navigate('/#booking-section')} />
    </div>
  );
};
