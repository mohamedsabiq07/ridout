import { ENABLE_COMMERCIAL } from '../config/features';
import { COMMERCIAL_PROPERTY_PAGES } from './commercialArchive';

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

export const RESIDENTIAL_PROPERTY_PAGES: PropertyPageData[] = [
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
  }
];

export const PROPERTY_PAGES: PropertyPageData[] = ENABLE_COMMERCIAL
  ? [...RESIDENTIAL_PROPERTY_PAGES, ...COMMERCIAL_PROPERTY_PAGES]
  : RESIDENTIAL_PROPERTY_PAGES;

