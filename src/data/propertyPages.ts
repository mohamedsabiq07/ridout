export interface PropertyPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  propertyType: string;
  heroBadge: string;
  summary: string;
  keyChallenges: string[];
  tailoredApproach: string[];
  popularServices: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const PROPERTY_PAGES: PropertyPageData[] = [
  {
    "slug": "apartments",
    "title": "Pest Control for Dubai Apartments: High-Rise Towers, Chutes & Risers",
    "metaTitle": "Pest Control for Dubai Apartments | Marina, JLT, Downtown & JVC",
    "metaDescription": "Specialized odorless pest control for Dubai high-rise apartments. Target garbage chutes, AC duct condensation, plumbing shafts, and cockroach/bed bug elimination.",
    "propertyType": "Apartment",
    "heroBadge": "Residential High-Rise Specialist",
    "summary": "High-rise living in Dubai Marina, JLT, Downtown, and JVC involves interconnected vertical garbage chutes, AC fan coil risers, and plumbing shafts that require specialized non-evacuation gel baiting and barrier sealing.",
    "keyChallenges": [
      "Shared refuse chutes serving 40+ floors act as continuous pest breeding corridors.",
      "AC condensation in FCU trays provides steady indoor moisture.",
      "Plumbing penetrations under kitchen sinks allow inter-unit cockroach transit.",
      "Balcony sliding door tracks allow seasonal ant and silverfish entry."
    ],
    "tailoredApproach": [
      "Food-grade odorless gel bait micro-dots inside kitchen cabinet hinges (zero evacuation needed).",
      "Residual barrier spraying along utility riser collars and skirting boards.",
      "Drain bio-enzymatic flushes to dissolve organic grease films in plumbing pipes.",
      "4-Month Free Re-Treatment Guarantee covering entire apartment unit."
    ],
    "popularServices": [
      "cockroach-control",
      "bed-bug-treatment",
      "general-pest-control",
      "kitchen-cleaning"
    ],
    "faqs": [
      {
        "question": "Do I need to leave my apartment during cockroach gel treatment?",
        "answer": "No. Our odorless gel baiting allows you to stay comfortably inside without vacating."
      },
      {
        "question": "Can pests enter from neighboring apartments in high-rise towers?",
        "answer": "Yes. Unsealed pipe penetrations under sinks and shared garbage chutes allow migration. Our perimeter barrier spray seals these entry routes."
      }
    ]
  },
  {
    "slug": "villas",
    "title": "Pest Control for Dubai Villas: Garden Misting, Termite Barriers & AC Drip Trays",
    "metaTitle": "Pest Control for Dubai Villas | Arabian Ranches, Palm, Dubai Hills",
    "metaDescription": "Complete villa pest control in Dubai: Garden mosquito fogging, subterranean anti-termite drill-and-inject barriers, rodent exclusion, and perimeter shields.",
    "propertyType": "Villa",
    "heroBadge": "Luxury Villa & Compound Specialist",
    "summary": "Dubai villas in communities like Arabian Ranches, Palm Jumeirah, Dubai Hills, and Mirdif require comprehensive indoor-outdoor defense covering landscaped gardens, AC chillers, and sub-slab foundations.",
    "keyChallenges": [
      "Subterranean termites attacking wooden door frames from moist garden soil.",
      "Aedes mosquitoes breeding in AC condensate drain trays and plant saucers.",
      "Roof rats entering through unsealed rooftop chiller pipe penetration points.",
      "Black crazy ants trailing across patio paving and kitchen backsplashes."
    ],
    "tailoredApproach": [
      "Sub-slab diamond core drill-and-inject chemical barriers with 5-Year Warranty.",
      "Ultra-Low Volume (ULV) cold misting and biological Bti larvicides for gardens.",
      "Rodent entry proofing with galvanized steel mesh around AC conduits.",
      "Comprehensive perimeter foundation barrier spraying."
    ],
    "popularServices": [
      "termite-treatment",
      "mosquito-control",
      "rodent-control",
      "general-pest-control"
    ],
    "faqs": [
      {
        "question": "Is outdoor mosquito misting safe for pets and ornamental gardens?",
        "answer": "Yes. We use eco-friendly, non-staining biological larvicides and water-based pyrethroid mists safe for plants and pets."
      },
      {
        "question": "How do I know if my villa has termites?",
        "answer": "Warning signs include hollow-sounding door jambs, pencil-thick mud tubes on foundation walls, and winged alates near windows."
      }
    ]
  },
  {
    "slug": "shared-accommodation",
    "title": "Pest Control for Shared & Staff Accommodation in Dubai: B2B Protocols & Worker Camps",
    "metaTitle": "Pest Control for Shared & Staff Accommodation Dubai | B2B Housing",
    "metaDescription": "Institutional pest management for worker accommodations and staff housing in Sonapur, Al Quoz, and Sharjah. Thermal steam bed bug eradication & AMCs.",
    "propertyType": "Shared Accommodation",
    "heroBadge": "B2B Accommodation Compliance",
    "summary": "High-density staff accommodations, worker camps (Sonapur, Al Quoz, JAFZA), and shared partitioned villas require systematic rotational IPM protocols and mandatory thermal steam bed bug eradication.",
    "keyChallenges": [
      "High occupant density accelerates mechanical bed bug transmission across beds.",
      "Shared kitchen pantries experience heavy German cockroach populations.",
      "Luggage transit from international travels introduces persistent egg clusters.",
      "Over-the-counter supermarket sprays scatter pests across partition walls."
    ],
    "tailoredApproach": [
      "180°C superheated dry steam blasting for bunk beds and mattresses.",
      "Heavy-duty Insect Growth Regulators (IGR) injected into electrical trunking.",
      "Systematic quarterly rotational barrier misting for common areas.",
      "Full compliance documentation and official certification for audits."
    ],
    "popularServices": [
      "bed-bug-treatment",
      "cockroach-control",
      "disinfection-sanitization",
      "general-pest-control"
    ],
    "faqs": [
      {
        "question": "Do you offer monthly or quarterly contracts (AMC) for staff accommodations?",
        "answer": "Yes. We offer customized Annual Maintenance Contracts with scheduled preventative rotations and emergency response."
      }
    ]
  },
  {
    "slug": "restaurants",
    "title": "Restaurant & Commercial Pest Control in Dubai: Municipality Food Safety Compliance & IPM",
    "metaTitle": "Restaurant Pest Control Dubai | Municipality Compliance & IPM Logbooks",
    "metaDescription": "Dubai Municipality Food Safety audit compliance for restaurants, cafes, and commercial kitchens. Integrated Pest Management (IPM), electronic logs, and fly killers.",
    "propertyType": "Restaurant",
    "heroBadge": "Food Safety & Municipality Approved",
    "summary": "Food establishments in Dubai must maintain strict Dubai Municipality Food Code standards with active pest control contracts, on-site IPM logbooks, tamper-proof bait mapping, and non-chemical proofing.",
    "keyChallenges": [
      "Zero tolerance policy for live pest sightings during municipal food safety audits.",
      "Night-time moisture and cooking grease around commercial fryers and floor traps.",
      "Continuous food delivery deliveries introducing cardboard cockroach nymphs.",
      "Drain flies and fruit flies breeding in commercial bar floor drains."
    ],
    "tailoredApproach": [
      "After-hours discreet night service to eliminate operational disruption.",
      "Barcoded tamper-proof rodent bait stations and insect light trap (EFK) maintenance.",
      "Bio-enzymatic drain maintenance to digest organic kitchen grease buildup.",
      "Instant electronic service reports delivered within 15 minutes for inspector review."
    ],
    "popularServices": [
      "cockroach-control",
      "rodent-control",
      "disinfection-sanitization",
      "kitchen-cleaning"
    ],
    "faqs": [
      {
        "question": "How often does Dubai Municipality require restaurant pest control?",
        "answer": "A minimum of monthly pest control service with an official certified logbook is mandatory for all commercial food premises in Dubai."
      }
    ]
  },
  {
    "slug": "warehouses",
    "title": "Pest Control for Warehouses & Logistics Hubs in Dubai: Rodent Exclusion & Pallet Protection",
    "metaTitle": "Warehouse Pest Control Dubai | Logistics & Industrial Storage IPM",
    "metaDescription": "Industrial pest control for logistics warehouses, cold storage, and pallet facilities in JAFZA, Dubai South, and Al Quoz. Rodent exclusion and bird control.",
    "propertyType": "Warehouse",
    "heroBadge": "Industrial Logistics Specialist",
    "summary": "Industrial facilities in JAFZA, Dubai Industrial City, and Al Quoz face unique challenges with high roller shutter doors, wooden pallet wood-boring pests, and nocturnal roof rat ingress.",
    "keyChallenges": [
      "Large open loading bays allow easy ingress for rodents and birds.",
      "Wooden cargo pallets harbor drywood termites and beetle larvae.",
      "High ceiling trusses provide secluded nesting zones for feral pigeons."
    ],
    "tailoredApproach": [
      "Perimeter tamper-resistant rodent monitoring stations along external fences.",
      "Dock door brush seal installation and architectural hole proofing (>0.5cm).",
      "Ultra-Low Volume (ULV) cold misting for large-volume indoor cubic footage.",
      "Scheduled electronic trend analysis reports for international ISO audits."
    ],
    "popularServices": [
      "rodent-control",
      "termite-treatment",
      "disinfection-sanitization",
      "general-pest-control"
    ],
    "faqs": [
      {
        "question": "Can you provide pest control for food-grade logistics facilities?",
        "answer": "Yes. We follow strict HACCP and ISO 22000 compliant Integrated Pest Management protocols."
      }
    ]
  },
  {
    "slug": "hotels",
    "title": "Pest Control for Hotels & Holiday Homes in Dubai: 24/7 Discreet 60-Min Dispatch",
    "metaTitle": "Hotel & Holiday Home Pest Control Dubai | Fast Discreet Dispatch",
    "metaDescription": "Discreet 24/7 pest control for Dubai luxury hotels, boutique resorts, and Airbnb holiday homes. Rapid 60-minute emergency response and thermal bed bug sanitization.",
    "propertyType": "Hotel",
    "heroBadge": "Hospitality & Luxury Rentals",
    "summary": "Guest reputation in Dubai hospitality demands zero guest disruption and rapid 60-minute emergency dispatch for guest suites, lobby lounges, and resort grounds.",
    "keyChallenges": [
      "Immediate reputation risk from single guest bed bug or cockroach sightings.",
      "High luggage turnover in short-term Airbnb and holiday home rentals.",
      "Discreet service execution required without guest awareness."
    ],
    "tailoredApproach": [
      "24/7 unbranded rapid response for emergency guest room calls within 60 mins.",
      "180°C chemical-free dry steam sanitization for rapid same-day room turnover.",
      "Preventative room-by-room quarterly inspection rotations.",
      "Discreet digital reporting direct to hotel executive housekeeping managers."
    ],
    "popularServices": [
      "bed-bug-treatment",
      "cockroach-control",
      "disinfection-sanitization",
      "deep-cleaning"
    ],
    "faqs": [
      {
        "question": "How fast can technicians arrive for an urgent hotel guest room alert?",
        "answer": "We provide guaranteed 60-minute emergency dispatch across major Dubai hotel clusters including Downtown, Marina, Palm Jumeirah, and DIFC."
      }
    ]
  }
];
