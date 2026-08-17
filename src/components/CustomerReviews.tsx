import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Ahmed S.',
      location: 'Jumeirah Village Circle',
      service: 'General Pest Control',
      rating: 5,
      comment: 'Very happy with the service. The technician arrived on time, explained everything clearly, and did a thorough job. We’ve had no issues since.',
      date: 'Aug 2026'
    },
    {
      name: 'Fatima M.',
      location: 'Al Barsha (Villa)',
      service: 'Cockroach Control',
      rating: 5,
      comment: 'Good service and very professional team. They checked the whole house properly and treated the problem without making a mess. Would definitely recommend.',
      date: 'Aug 2026'
    },
    {
      name: 'Sarah L.',
      location: 'Dubai Marina',
      service: 'Cockroach Control',
      rating: 4,
      comment: 'I was having a problem with cockroaches in the kitchen and decided to call Ridout. The technician was professional and explained what needed to be done. So far, everything looks good.',
      date: 'Jul 2026'
    },
    {
      name: 'Tariq K.',
      location: 'Sharjah (Apartment)',
      service: 'Ant Control',
      rating: 5,
      comment: 'Really good experience from start to finish. Booking was easy, the technician was friendly, and the pest problem was handled quickly.',
      date: 'Jul 2026'
    },
    {
      name: 'Elena P.',
      location: 'Downtown Dubai',
      service: 'General Pest Control',
      rating: 5,
      comment: 'Excellent service. The technician was polite, knowledgeable, and very careful while treating the house. The whole process was much easier than I expected.',
      date: 'Aug 2026'
    },
    {
      name: 'Omar F.',
      location: 'Ajman Downtown',
      service: 'Rodent Control',
      rating: 5,
      comment: 'Very professional service. They arrived on time and took their time to inspect the areas properly. I liked that they didn’t rush the job.',
      date: 'Jul 2026'
    },
    {
      name: 'Aisha R.',
      location: 'Al Nahda, Sharjah',
      service: 'Ant & Cockroach Treatment',
      rating: 5,
      comment: 'Called them for ants and cockroaches at home. The response was quick and the technician was very helpful. Happy with the service.',
      date: 'Aug 2026'
    },
    {
      name: 'John D.',
      location: 'Jumeirah Lakes Towers (JLT)',
      service: 'Bed Bug Treatment',
      rating: 4,
      comment: 'Good experience with the team. They were punctual, professional, and explained the treatment before starting. I would use their service again.',
      date: 'Jun 2026'
    },
    {
      name: 'Mariam H.',
      location: 'Business Bay',
      service: 'Termite Inspection',
      rating: 5,
      comment: 'Very satisfied with the pest control service. The technician came prepared and checked the problem areas carefully. Everything was handled professionally.',
      date: 'Aug 2026'
    },
    {
      name: 'Hassan B.',
      location: 'Palm Jumeirah (Villa)',
      service: 'General Pest Control',
      rating: 5,
      comment: 'Honestly, a very smooth experience. From booking the appointment to completing the treatment, everything was handled properly. Good customer service.',
      date: 'Jul 2026'
    },
    {
      name: 'Rachel C.',
      location: 'Dubai Hills Estate',
      service: 'Rodent Control',
      rating: 5,
      comment: 'We had a pest issue that was becoming quite annoying. Ridout responded quickly and sent someone who knew exactly what to check. The service was neat and professional.',
      date: 'Aug 2026'
    },
    {
      name: 'Khaled A.',
      location: 'Al Qusais, Dubai',
      service: 'Cockroach Control',
      rating: 5,
      comment: 'Really happy with the service. The technician was friendly and answered all my questions without rushing. The treatment was done properly and the house was left clean.',
      date: 'Jul 2026'
    },
    {
      name: 'Nabeel M.',
      location: 'Mirdif (Villa)',
      service: 'General Pest Control',
      rating: 5,
      comment: 'Professional team and good service. They arrived on time, inspected the place and explained the treatment clearly. Definitely recommended.',
      date: 'Jun 2026'
    },
    {
      name: 'Priya S.',
      location: 'Discovery Gardens',
      service: 'Bed Bug Treatment',
      rating: 4,
      comment: 'I contacted them for a pest problem in my apartment. The technician was very polite and professional, and the treatment was completed quickly. Overall, a good experience.',
      date: 'Aug 2026'
    },
    {
      name: 'Youssef E.',
      location: 'Muwaileh, Sharjah',
      service: 'Ant Control',
      rating: 5,
      comment: 'Good service at a reasonable price. The team was responsive and professional throughout the process. I’m happy with the results and would call them again if needed.',
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

        {/* Horizontal Scroll Layout */}
        <div className="relative overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F7F5F0] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F7F5F0] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max gap-6 pb-8 pt-4 px-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
          >
            {[...reviews, ...reviews].map((rev, idx) => (
              <div 
                key={idx} 
                className="w-[85vw] sm:w-[380px] shrink-0 bg-white/60 bg-noise backdrop-blur-md border border-[#E2DFD7] hover:border-[#0A0A0A] p-6 rounded-lg space-y-4 shadow-sm flex flex-col transition-all hover:shadow-md h-[280px]"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#E8871E]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E8871E] text-[#E8871E]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#2D2D2D] leading-relaxed italic line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-auto border-t border-[#E2DFD7] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0A0A0A] font-['Montserrat'] flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9E7E]" />
                    </div>
                    <div className="text-[10px] text-[#5A5A5A] font-mono mt-0.5">
                      {rev.location} <br/> <span className="text-[#7A9E7E]">{rev.service}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#F7F5F0] text-[#0A0A0A] border border-[#E2DFD7] px-2 py-0.5 rounded font-mono shrink-0 ml-2">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
