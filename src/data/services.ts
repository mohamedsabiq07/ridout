import type { PestService } from '../types/booking';

export const PEST_SERVICES: PestService[] = [
  {
    id: 'general-pest-control',
    name: 'General Pest Control',
    slug: 'general-pest-control',
    iconName: 'ShieldAlert',
    imageUrl: '/general-pest-control-new.jpg',
    category: 'pest',
    shortDesc: 'Comprehensive preventative and curative perimeter treatment for crawling insects.',
    fullDesc: 'Targeted eco-friendly barrier treatment engineered to eradicate common pests including silverfish, spider mites, centipedes, and seasonal insects across residential and commercial premises.',
    startingPrice: 'Starting from AED 149',
    problems: ['Crawling Insects', 'Silverfish', 'Spiders', 'Centipedes', 'Seasonal Bugs'],
    method: 'Low-toxicity residual spray treatment combined with micro-encapsulated barrier protection.',
    suitableFor: ['Residential', 'Commercial', 'Offices'],
    duration: '45 - 60 mins',
    preparationSteps: [
      'Store open food containers in airtight bags or refrigerator.',
      'Clear kitchen counter surfaces and move small appliances away from walls.',
      'Vacate treated areas for 2 hours post-treatment.'
    ]
  },
  {
    id: 'cockroach-control',
    name: 'Cockroach Control',
    slug: 'cockroach-control',
    iconName: 'Bug',
    imageUrl: '/cockroaches.jpg',
    category: 'pest',
    shortDesc: 'Multi-stage baiting and gel micro-dots targeting German and American cockroaches.',
    fullDesc: 'High-potency gel baiting system designed to eliminate German and American cockroach nests at the source without messy chemical odors or evacuation.',
    startingPrice: 'AED 99',
    problems: ['German Cockroaches', 'American Cockroaches', 'Kitchen Nests', 'Drain Infestations'],
    method: 'Precision gel baiting, crack-and-crevice dusting, and drain bio-cleansing.',
    suitableFor: ['Apartments', 'Villas', 'Restaurants', 'Bakeries'],
    duration: '30 - 45 mins',
    preparationSteps: [
      'Clean grease and food crumbs from under stove and microwave.',
      'Ensure kitchen sinks and drain covers are dry.',
      'No evacuation required for gel bait treatment.'
    ]
  },
  {
    id: 'ant-control',
    name: 'Ant Control',
    slug: 'ant-control',
    iconName: 'BugOff',
    imageUrl: '/ants.jpg',
    category: 'pest',
    shortDesc: 'Colony elimination using non-repellent transfer technology for black and sugar ants.',
    fullDesc: 'Subtle domino-effect colony baiting that worker ants carry back to the queen, ensuring total destruction of underground or wall-cavity ant nests.',
    startingPrice: 'AED 149',
    problems: ['Black House Ants', 'Crazy Ants', 'Sugar Ants', 'Wall Cavity Nests'],
    method: 'Non-repellent transfer liquid spray and protein-rich gel matrix.',
    suitableFor: ['Residential', 'Gardens', 'Food Service'],
    duration: '30 - 60 mins',
    preparationSteps: [
      'Do not spray household aerosol insecticides prior to technician arrival.',
      'Identify main ant trailing lines for technician inspection.'
    ]
  },
  {
    id: 'bed-bug-treatment',
    name: 'Bed Bug Treatment',
    slug: 'bed-bug-treatment',
    iconName: 'Bed',
    imageUrl: '/bedbug.jpg',
    category: 'pest',
    shortDesc: 'Thermal steam injection and residual chemical treatment for total bed bug eradication.',
    fullDesc: 'Intensive two-phase eradication combining high-temperature dry steam (180°C) to neutralize eggs with long-lasting residual insect growth regulators (IGRs).',
    startingPrice: 'AED 299',
    problems: ['Bed Bug Bites', 'Mattress Nests', 'Frame Infestation', 'Egg Clusters'],
    method: 'Superheated thermal dry steam + dual-action residual micro-encapsulated spray.',
    suitableFor: ['Bedrooms', 'Hotels', 'Worker Accommodation', 'Villas'],
    duration: '90 - 120 mins',
    preparationSteps: [
      'Strip bed sheets and wash at 60°C or higher.',
      'Empty wardrobes and under-bed storage drawers.',
      'Vacate property for 4 hours following completion.'
    ]
  },
  {
    id: 'mosquito-control',
    name: 'Mosquito Control',
    slug: 'mosquito-control',
    iconName: 'SprayCan',
    imageUrl: '/mosquito.jpg',
    category: 'pest',
    shortDesc: 'Outdoor thermal fogging and larvicide barrier for gardens, balconies, and pools.',
    fullDesc: 'Protective outdoor barrier misting and larvicide treatment targeting standing water and garden foliage to suppress breeding mosquito populations.',
    startingPrice: 'AED 249',
    problems: ['Aedes Mosquitoes', 'Garden Swarms', 'Outdoor Biting', 'Pool Larvae'],
    method: 'Thermal ULV cold fogging misting + biological larvicide briquettes.',
    suitableFor: ['Villas', 'Outdoor Patios', 'Commercial Gardens', 'Schools'],
    duration: '45 - 90 mins',
    preparationSteps: [
      'Close all windows and doors during fogging process.',
      'Cover swimming pools or turn off circulation pumps for 1 hour.'
    ]
  },
  {
    id: 'rodent-control',
    name: 'Rodent Control',
    slug: 'rodent-control',
    iconName: 'Rat',
    imageUrl: '/rodent.jpg',
    category: 'pest',
    shortDesc: 'Tamper-resistant bait stations, exclusion sealing, and digital tracking for rats and mice.',
    fullDesc: 'Commercial-grade rodent management system utilizing locked safety bait stations, mechanical snap traps, and proofing advice to eliminate rats and mice.',
    startingPrice: 'AED 229',
    problems: ['Roof Rats', 'House Mice', 'Wire Chewing', 'Droppings in Storage'],
    method: 'Tamper-proof safety bait boxes, tracking gel, and architectural exclusion proofing.',
    suitableFor: ['Warehouses', 'Villas', 'Restaurants', 'Supermarkets'],
    duration: '60 - 90 mins',
    preparationSteps: [
      'Keep pets away from designated bait placement areas.',
      'Clear perimeter storage boxes to allow access to wall boundaries.'
    ]
  },
  {
    id: 'termite-treatment',
    name: 'Termite Treatment',
    slug: 'termite-treatment',
    iconName: 'ShieldCheck',
    imageUrl: '/termite.jpg',
    category: 'pest',
    shortDesc: 'Pre-construction and post-construction chemical soil barrier for subterranean termites.',
    fullDesc: 'Heavy-duty structural termite protection including sub-slab pressure injection, wood treatment, and continuous perimeter liquid barrier with up to 5-year warranty.',
    startingPrice: 'AED 599',
    problems: ['Subterranean Termites', 'Hollow Door Frames', 'Mud Tubes on Walls', 'Structural Damage'],
    method: 'Precision sub-slab drill-and-inject barrier using Non-Repellent Termiticides.',
    suitableFor: ['New Constructions', 'Existing Villas', 'Commercial Structures'],
    duration: '3 - 6 hours',
    preparationSteps: [
      'Provide clear access along wall skirting and exterior perimeter.',
      'Ensure water and electricity supply are active on site.'
    ]
  },
  {
    id: 'disinfection-sanitization',
    name: 'Disinfection & Sanitization',
    slug: 'disinfection-sanitization',
    iconName: 'Sparkles',
    category: 'pest',
    shortDesc: 'Hospital-grade surface misting destroying 99.999% of bacteria, viruses, and fungi.',
    fullDesc: 'Ultra-Low Volume (ULV) cold misting with UAE Ministry-approved disinfectant solutions for complete 360-degree surface decontamination.',
    startingPrice: 'AED 199',
    problems: ['Airborne Pathogens', 'Bacterial Buildup', 'Post-Infestation Cleaning', 'Odor Elimination'],
    method: 'ULV Electrostatic cold fogging with broad-spectrum eco-friendly disinfectant.',
    suitableFor: ['Offices', 'Residential', 'Gyms', 'Clinics', 'Nurseries'],
    duration: '30 - 60 mins',
    preparationSteps: [
      'Cover paper documents and delicate electronics.',
      'Vacate property for 30 minutes after misting.'
    ]
  },
  // Home Cleaning Services
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    slug: 'kitchen-cleaning',
    iconName: 'UtensilsCrossed',
    category: 'cleaning',
    shortDesc: 'Professional kitchen cleaning covering countertops, cabinets, sink, stove area, tiles and other accessible surfaces.',
    fullDesc: 'Deep hygienic kitchen restoration focusing on degreasing stovetops, sanitizing counter surfaces, cleaning sink drains, wiping cabinet doors, and scrubbing kitchen wall tiles.',
    startingPrice: 'AED 189',
    problems: ['Stove Grease', 'Cabinet Grime', 'Sink Stains', 'Tile Buildup', 'Odor'],
    method: 'Food-safe degreasing solutions, micro-fiber surface wiping, and high-pressure steam sanitization.',
    suitableFor: ['Apartments', 'Villas', 'Commercial Kitchens'],
    duration: '60 - 90 mins',
    preparationSteps: [
      'Remove loose dishware from sink and counters.',
      'Store open food containers in pantry or fridge.'
    ]
  },
  {
    id: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    slug: 'bathroom-cleaning',
    iconName: 'Sparkle',
    category: 'cleaning',
    shortDesc: 'Thorough bathroom cleaning including tiles, floors, toilet, wash basin, shower area, mirrors and other accessible surfaces.',
    fullDesc: 'Hospital-grade deep cleaning of bathroom fixtures, limescale removal from shower glass, tile grout scrubbing, mirror polishing, and toilet sanitization.',
    startingPrice: 'AED 169',
    problems: ['Limescale & Soap Scum', 'Tile Grout Stains', 'Toilet Disinfection', 'Mirror Smudges'],
    method: 'Acid-free limescale removers, anti-bacterial tile scrubbers, and streak-free mirror polishing.',
    suitableFor: ['Apartments', 'Villas', 'Offices'],
    duration: '45 - 75 mins',
    preparationSteps: [
      'Remove personal items and toiletries from countertops.',
      'Ensure running hot/cold water is available.'
    ]
  }
];

export const HOME_CLEANING_SERVICES = PEST_SERVICES.filter(s => s.category === 'cleaning');
export const PEST_CONTROL_SERVICES = PEST_SERVICES.filter(s => s.category === 'pest');
