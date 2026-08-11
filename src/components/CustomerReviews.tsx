import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Mohamed A.',
      location: 'Dubai Marina (Apartment)',
      service: 'General Pest Control & Cockroaches',
      rating: 5,
      comment: 'Super fast response! Technician arrived within 45 minutes of booking request. Complete gel treatment with zero smell. Haven’t seen a single bug since.',
      date: 'Aug 2026'
    },
    {
      name: 'Claire D.',
      location: 'Arabian Ranches (Villa)',
      service: 'Ant & Termite Protection',
      rating: 5,
      comment: 'Very professional UAE company. They gave clear instructions on prep before arriving and answered all my questions about pet safety.',
      date: 'Aug 2026'
    },
    {
      name: 'Kahlil M.',
      location: 'Business Bay (Office)',
      service: 'Commercial Disinfection & Rodent Control',
      rating: 5,
      comment: 'We booked them for our 3-floor office in Business Bay. The admin dashboard status tracking and WhatsApp updates made communication seamless.',
      date: 'Jul 2026'
    }
  ];

  return (
    <section className="py-20 bg-[#F7F5F0] border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-2"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#7A9E7E] uppercase">
            Verified Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[#0A0A0A]">
            What Our Customers Say
          </h2>
          <p className="text-[#5A5A5A] text-sm">
            Trusted by over 1,000+ homeowners, property managers, and businesses across Dubai, Sharjah, and Ajman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 bg-noise backdrop-blur-md border border-[#E2DFD7] hover:border-[#0A0A0A] p-6 rounded-lg space-y-4 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#E8871E]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E8871E] text-[#E8871E]" />
                  ))}
                </div>
                <p className="text-xs text-[#2D2D2D] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DFD7] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0A0A0A] font-['Montserrat'] flex items-center gap-1">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E]" />
                  </div>
                  <div className="text-[10px] text-[#5A5A5A] font-mono">
                    {rev.location}
                  </div>
                </div>
                <span className="text-[10px] bg-[#F7F5F0] text-[#0A0A0A] border border-[#E2DFD7] px-2 py-0.5 rounded font-mono">
                  {rev.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
