import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    category: 'Safety & Regulations',
    question: 'Are your pest control chemicals approved by UAE Municipalities?',
    answer: 'Yes, 100%. All chemicals, gels, and misting solutions utilized by Rid Out are strictly licensed and approved by Dubai Municipality, Sharjah Municipality, and the UAE Ministry of Climate Change and Environment (MOCCAE). They are odorless and safe for households with kids and pets.'
  },
  {
    category: 'Preparation & Safety',
    question: 'Do I need to leave my apartment or villa during the treatment?',
    answer: 'For standard gel-based Cockroach & Ant treatments, you do not need to vacate at all. For general chemical sprays or bed bug thermal misting, we recommend stepping out for 2 to 3 hours to allow proper aeration. Our certified technician will provide precise guidance before commencing.'
  },
  {
    category: 'Warranty & Guarantee',
    question: 'What warranty do you offer on pest control services?',
    answer: 'We provide a comprehensive 4-Month Free Re-Treatment Guarantee on our standard residential pest control packages. If you notice persistent pest activity within the warranty period, our technicians will return and re-treat your property free of charge.'
  },
  {
    category: 'Bed Bugs',
    question: 'How many sessions are required to completely eradicate bed bugs?',
    answer: 'Our professional bed bug protocol typically achieves complete eradication within 1 to 2 targeted sessions. We combine deep thermal steam extraction to destroy hidden eggs with residual chemical flush along baseboards, bed frames, and mattress piping.'
  },
  {
    category: 'Home Cleaning',
    question: 'What is included in your Kitchen and Bathroom Deep Cleaning service?',
    answer: 'Deep cleaning covers heavy stove and range hood degreasing, exterior/interior cabinet wipedowns, tile grout scrubbing, limescale descaling on glass shower panels, toilet/sink sanitization, and high-temperature steam disinfection of all accessible surfaces.'
  },
  {
    category: 'Timing & Emergency',
    question: 'How fast can a technician arrive at my property in Dubai, Sharjah, or Ajman?',
    answer: 'We offer guaranteed 60-minute emergency dispatch across key UAE districts including Dubai Marina, Downtown, Business Bay, JVC, Palm Jumeirah, Al Nahda Sharjah, and Ajman Downtown. Standard slots can be booked for your exact preferred morning or evening time.'
  },
  {
    category: 'Payment',
    question: 'Do I need to pay any advance deposit before the service?',
    answer: 'No advance deposit is ever required for residential services. You only pay after the treatment or cleaning is completely finished to your satisfaction. We accept cash, card, and online payment transfers.'
  },
  {
    category: 'Commercial',
    question: 'Do you provide municipality compliance certificates for commercial restaurants and offices?',
    answer: 'Yes! We issue official Municipality-Compliant Pest Control Service Certificates and detailed bait station inspection logs for commercial kitchens, cafes, warehouses, and offices across Dubai, Sharjah, and Ajman.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-[#2A2A2A] relative">
      {/* Embed FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] text-xs font-mono font-semibold text-[#E8871E]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Montserrat'] tracking-tight">
            Got Questions? We Have Answers.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our municipality-certified treatments, safety standards, and service warranties.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#171717] border border-[#2A2A2A] hover:border-neutral-700 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base font-['Montserrat'] text-neutral-100 flex items-center gap-3">
                    <span className="text-[#E8871E] font-mono text-xs">0{idx + 1}</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#E8871E]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-4 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Banner */}
        <div className="mt-12 p-6 bg-[#171717] border border-[#2A2A2A] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold font-['Montserrat'] text-white text-base">Still have questions?</h4>
            <p className="text-xs text-neutral-400 mt-1">Our dispatch team is on call 24/7 in UAE.</p>
          </div>
          <a
            href="tel:+971554720124"
            className="px-5 py-2.5 bg-[#E8871E] hover:bg-[#d47817] text-white rounded-lg text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer uppercase shrink-0"
          >
            Call: +971 554720124
          </a>
        </div>

      </div>
    </section>
  );
};
