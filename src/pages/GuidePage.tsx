import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PEST_GUIDES } from '../data/guides';
import { PEST_SERVICES } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { 
  Clock, 
  Calendar, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { generateQuickServiceWhatsAppLink } from '../lib/whatsapp';

export const GuidePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const guide = PEST_GUIDES.find(g => g.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Guide Not Found</h1>
        <p className="text-neutral-600 mb-8">The pest control guide you are looking for does not exist or has moved.</p>
        <Link to="/guides" className="px-6 py-3 bg-[#E8871E] text-white font-bold rounded-full">
          Browse All Guides
        </Link>
      </div>
    );
  }

  const guideSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://ridoutpestcontrol.ae/guide/' + guide.slug + '#article',
        'headline': guide.title,
        'description': guide.metaDescription,
        'datePublished': guide.publishedDate,
        'dateModified': guide.publishedDate,
        'image': 'https://ridoutpestcontrol.ae/favicon-512x512.png',
        'author': {
          '@type': 'Organization',
          'name': 'RIDOUT Pest Control UAE'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'RIDOUT Pest Control & Cleaning Services',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://ridoutpestcontrol.ae/favicon-512x512.png'
          }
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://ridoutpestcontrol.ae/guide/' + guide.slug + '#faq',
        'mainEntity': guide.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  const matchedServices = PEST_SERVICES.filter(s => guide.relatedServices.includes(s.slug) || guide.relatedServices.includes(s.id));
  const waConsultationLink = generateQuickServiceWhatsAppLink(guide.targetTopic);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2D2D2D] font-sans selection:bg-[#0A0A0A] selection:text-white">
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalUrl={'/guide/' + guide.slug}
        schemaMarkup={guideSchema}
      />

      <Navbar onBookClick={() => navigate('/#booking-section')} onEmergencyClick={() => navigate('/#booking-section')} />

      <main className="pt-28 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-mono" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#E8871E] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <Link to="/guides" className="hover:text-[#E8871E] transition-colors">Pest Guides</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-800 font-semibold truncate max-w-[200px] sm:max-w-none">{guide.category}</span>
          </nav>
        </div>

        {/* Guide Header Banner */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <header className="bg-[#0A0A0A] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-2xl mb-12 border border-[#2A2A2A]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8871E]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#E8871E]/20 text-[#E8871E] border border-[#E8871E]/30 text-xs font-mono font-bold uppercase tracking-wider">
                  {guide.heroBadge}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{guide.readTime}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Updated {guide.publishedDate}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Montserrat'] text-white leading-tight">
                {guide.title}
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed pt-2">
                {guide.summary}
              </p>

              {/* 1-Tap WhatsApp Consultation Bar */}
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-3 border-t border-neutral-800">
                <a
                  href={waConsultationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/40 cursor-pointer uppercase font-mono"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 1-Tap Consultation</span>
                </a>
                <a
                  href="tel:+971554720124"
                  className="w-full sm:w-auto bg-[#171717] hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-xs px-5 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E8871E]" />
                  <span>Call: +971 554720124</span>
                </a>
              </div>
            </div>
          </header>

          {/* Key Takeaways Card */}
          <div className="bg-white border border-[#E2DFD7] rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
            <h3 className="text-lg font-bold font-['Montserrat'] text-[#0A0A0A] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8871E]" />
              <span>Core Takeaways &amp; Value Summary</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E2DFD7]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700 leading-snug">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Sections */}
          <div className="space-y-12 mb-16">
            {guide.sections.map((section, sIdx) => (
              <section key={sIdx} className="bg-white border border-[#E2DFD7] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <p className="text-xs font-mono text-[#E8871E] font-bold uppercase tracking-wider mt-1">
                      {section.subheading}
                    </p>
                  )}
                </div>

                <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-3 pt-2">
                    {section.bulletPoints.map((bullet, bIdx) => {
                      const parts = bullet.split(':');
                      const bTitle = parts[0];
                      const bRest = parts.slice(1).join(':');
                      return (
                        <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E2DFD7]">
                          <span className="w-2 h-2 rounded-full bg-[#E8871E] shrink-0 mt-2"></span>
                          <div>
                            {bRest.length > 0 ? (
                              <>
                                <strong className="text-neutral-900 font-bold">{bTitle}:</strong>
                                <span>{bRest}</span>
                              </>
                            ) : (
                              <span>{bullet}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Callouts */}
                {section.callout && (
                  <div className={'p-5 rounded-2xl border flex items-start gap-3 ' + (
                    section.callout.type === 'municipality'
                      ? 'bg-emerald-500/10 border-emerald-600/30 text-emerald-950'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-600/30 text-amber-950'
                      : 'bg-[#F7F5F0] border-[#E8871E]/30 text-neutral-800'
                  )}>
                    {section.callout.type === 'municipality' ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : section.callout.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-[#E8871E] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-1">
                        {section.callout.title}
                      </h4>
                      <p className="text-xs leading-relaxed opacity-90">{section.callout.text}</p>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Dedicated FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div className="bg-[#0A0A0A] text-white rounded-3xl p-6 sm:p-10 mb-16 border border-[#2A2A2A] shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E8871E] font-bold uppercase tracking-widest mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Expert Q&amp;A</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-['Montserrat'] mb-6 text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {guide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-5 space-y-2">
                    <h4 className="text-sm font-bold text-neutral-100 flex items-start gap-2">
                      <span className="text-[#E8871E] font-mono">Q:</span>
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services Links */}
          {matchedServices.length > 0 && (
            <div className="bg-white border border-[#E2DFD7] rounded-3xl p-8 mb-16 shadow-sm">
              <div className="text-xs font-mono font-bold text-[#E8871E] uppercase tracking-wider mb-2">Targeted Solutions</div>
              <h3 className="text-xl font-bold font-['Montserrat'] text-[#0A0A0A] mb-6">
                Recommended Services for This Issue
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {matchedServices.map((svc) => (
                  <Link
                    key={svc.id}
                    to={'/services/' + svc.slug}
                    className="p-4 rounded-xl border border-[#E2DFD7] hover:border-[#E8871E] transition-all bg-[#F7F5F0] hover:bg-white group"
                  >
                    <div className="text-xs font-bold font-['Montserrat'] text-[#0A0A0A] group-hover:text-[#E8871E] transition-colors mb-1">
                      {svc.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-2 mb-3">{svc.shortDesc}</div>
                    <div className="text-[11px] font-mono text-[#E8871E] font-semibold flex items-center gap-1">
                      <span>View Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Fast Action Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0A0A0A] to-[#141414] text-white border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8871E]">Immediate Assistance</span>
              <h4 className="text-2xl font-extrabold font-['Montserrat'] text-white mt-1">Need Live Pest Inspection in UAE?</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">Our certified technicians are on call 24/7 across Dubai, Sharjah, and Ajman with 60-minute emergency dispatch.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <a
                href={waConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 uppercase font-mono shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>
              <button
                onClick={() => navigate('/#booking-section')}
                className="px-6 py-3.5 bg-[#E8871E] hover:bg-[#d47817] text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 uppercase font-mono shadow-md cursor-pointer"
              >
                <span>Book Service</span>
              </button>
            </div>
          </div>

        </article>
      </main>

      <Footer onBookClick={() => navigate('/#booking-section')} />
    </div>
  );
};
