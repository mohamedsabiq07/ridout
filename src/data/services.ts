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
        "Seal and store all exposed food.",
        "Remove utensils and cooking items from exposed surfaces.",
        "Clean food residue, spills and crumbs.",
        "Keep countertops, floors and sinks reasonably clean.",
        "Clear access to corners, wall edges, cabinets and areas underneath furniture.",
        "Cover personal belongings where necessary.",
        "Keep children and pets away from treatment areas as instructed.",
        "Follow any additional preparation instructions provided by the technician."
        ],
    aftercareSteps: [
        "Follow the technician's instructions regarding re-entry and ventilation.",
        "Avoid washing or disturbing treated areas for the recommended period.",
        "Keep children and pets away from treated surfaces until they are safe to access.",
        "Wash exposed utensils and food-contact items before use.",
        "Maintain good hygiene and food-storage practices.",
        "Avoid unnecessary use of household insecticides over professional treatment areas.",
        "Follow any recommended follow-up treatment schedule."
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
        "Remove or properly seal all exposed food, fruits, vegetables and food containers.",
        "Clean food crumbs, grease and spills from countertops, floors and under appliances.",
        "Keep kitchen sinks and surrounding areas reasonably clean and dry.",
        "Remove utensils, plates and cooking items from exposed surfaces and keep them covered or stored.",
        "Clear access to areas under sinks, behind appliances, inside cabinets and along wall edges.",
        "Do not apply household cockroach sprays or insecticides immediately before the technician arrives, as these may interfere with the treatment.",
        "Keep children and pets away from the treatment area as instructed by the technician."
        ],
    aftercareSteps: [
        "Do not disturb or remove gel bait placements unless instructed by the technician.",
        "Avoid cleaning treated cracks, corners and other treated areas immediately, as this may reduce treatment effectiveness.",
        "Keep food properly covered and maintain good kitchen hygiene.",
        "Clean food spills and crumbs promptly.",
        "Do not spray household insecticides over or near the professional treatment areas unless advised.",
        "Dead insects should be removed hygienically using appropriate cleaning methods.",
        "Follow the technician's recommendations regarding follow-up treatment.",
        "Pest activity may temporarily increase after treatment as pests emerge from hiding areas before the population declines."
        ],
    importantNote: "Effective cockroach control depends on proper sanitation, removal of food sources and cooperation with the recommended follow-up treatment."
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
        "Do not spray household insecticides over visible ant trails before the technician arrives.",
        "Keep food, sugar, sweets and other attractants properly sealed.",
        "Clean food spills and crumbs from countertops and floors.",
        "Identify, where possible, areas where ants are frequently seen.",
        "Keep countertops and treatment areas accessible.",
        "Remove unnecessary objects from areas requiring inspection."
        ],
    aftercareSteps: [
        "Do not disturb or remove bait placements unless instructed.",
        "Avoid spraying household insecticides around treated areas.",
        "Keep food properly sealed.",
        "Clean food spills immediately.",
        "Do not wipe away treatment from cracks, corners or other designated areas.",
        "Follow the technician's instructions regarding follow-up visits."
        ],
    importantNote: "Ant control may require time because the treatment is designed to reach the colony through worker activity. Avoid disturbing treated bait areas unless instructed by the technician."
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
        "Remove all bed sheets, blankets, pillow covers and other washable bedding.",
        "Wash and dry bedding according to the recommended temperature and fabric-care instructions.",
        "Remove items stored under beds.",
        "Reduce clutter around beds, furniture and wall edges to provide access for inspection and treatment.",
        "Empty wardrobes, drawers or other areas if requested by the technician.",
        "Do not move infested furniture or mattresses to another room, as this may spread the infestation.",
        "Keep pets and people away from the treatment area as instructed.",
        "Follow any specific preparation instructions provided during the inspection."
        ],
    aftercareSteps: [
        "Do not re-enter the treated area until the technician confirms that it is safe to do so.",
        "Follow the recommended ventilation and re-entry instructions provided by the technician.",
        "Do not immediately wash or clean treated surfaces unless specifically instructed.",
        "Avoid removing or disturbing treated areas unnecessarily.",
        "Wash bedding and clothing according to the treatment instructions.",
        "Do not move mattresses, furniture or other potentially infested items between rooms.",
        "Continue monitoring for bed bug activity after treatment.",
        "Follow the recommended follow-up schedule, as bed bug control may require more than one treatment depending on infestation severity."
        ],
    importantNote: "Bed bug eradication requires customer cooperation, proper preparation and follow-up. Finding occasional activity after the initial treatment does not necessarily mean treatment has failed."
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
        "Remove or cover exposed food and drinking-water containers.",
        "Close windows and doors during outdoor fogging where instructed.",
        "Keep children and pets away from the treatment area.",
        "Remove toys, laundry and other personal items from outdoor treatment areas.",
        "Empty or remove unnecessary containers that can collect standing water.",
        "Inform the technician about areas where mosquito activity is frequently observed.",
        "Ensure access to gardens, balconies, drains and other outdoor areas requiring inspection."
        ],
    aftercareSteps: [
        "Follow the technician's recommended re-entry time before using treated outdoor areas.",
        "Avoid unnecessary contact with treated vegetation or surfaces until they are safe to access.",
        "Remove standing water regularly from containers, plant trays and other potential breeding sites.",
        "Keep doors, windows and screens properly maintained where possible.",
        "Follow any instructions regarding swimming pools, water features or other water bodies.",
        "Continue eliminating standing water to reduce future mosquito breeding."
        ],
    importantNote: "Mosquito control is most effective when professional treatment is combined with regular removal of standing water and other breeding sources."
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
        "Store food in sealed, rodent-resistant containers.",
        "Remove exposed food, waste and unnecessary clutter.",
        "Keep access areas around walls, cabinets, storage spaces and appliances clear.",
        "Inform the technician of any sightings, droppings, gnaw marks or unusual noises.",
        "Keep children and pets away from areas where bait stations may be installed.",
        "Do not move or interfere with existing rodent control stations."
        ],
    aftercareSteps: [
        "Do not open, move or tamper with bait stations.",
        "Keep children and pets away from designated bait areas.",
        "Store food securely and maintain good waste-management practices.",
        "Seal accessible food sources and avoid leaving food waste exposed.",
        "Report new rodent activity to the Rid Out team.",
        "Do not remove or relocate traps or bait stations without technician approval.",
        "Follow recommended follow-up inspection schedules."
        ],
    importantNote: "Rodent control requires both professional treatment and removal of food, water and access points that may allow rodents to return."
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
        "Provide clear access to affected walls, skirting, wooden structures and other areas requiring inspection.",
        "Remove movable items blocking access to treatment areas.",
        "Inform the technician about previous termite treatments, if any.",
        "Identify visible signs such as mud tubes, damaged wood or hollow-sounding surfaces.",
        "Ensure required utilities and site access are available where applicable.",
        "Follow any specific preparation requirements provided after the site inspection."
        ],
    aftercareSteps: [
        "Do not disturb, cover or modify treated areas without consulting the technician.",
        "Follow the technician's instructions regarding re-entry and use of treated areas.",
        "Avoid unnecessary drilling, construction or alteration around treated areas without informing the pest-control provider.",
        "Monitor the property for new signs of termite activity.",
        "Report any suspected termite activity to Rid Out promptly.",
        "Follow the recommended inspection and monitoring schedule."
        ],
    importantNote: "Termite control is a structural protection process and may require inspection, treatment and ongoing monitoring depending on the property and level of infestation."
  },
  {
    id: 'disinfection-sanitization',
    name: 'Disinfection & Sanitization',
    slug: 'disinfection-sanitization',
    iconName: 'Droplet',
    imageUrl: '/disinfection.jpg',
    category: 'pest',
    shortDesc: 'Hospital-grade surface misting destroying 99.999% of bacteria, viruses, and fungi.',
    fullDesc: 'Ultra-Low Volume (ULV) cold misting with UAE Ministry-approved disinfectant solutions for complete 360-degree surface decontamination.',
    startingPrice: 'AED 199',
    problems: ['Airborne Pathogens', 'Bacterial Buildup', 'Post-Infestation Cleaning', 'Odor Elimination'],
    method: 'ULV Electrostatic cold fogging with broad-spectrum eco-friendly disinfectant.',
    suitableFor: ['Offices', 'Residential', 'Gyms', 'Clinics', 'Nurseries'],
    duration: '30 - 60 mins',
    preparationSteps: [
        "Remove food, utensils and personal items from surfaces requiring treatment.",
        "Cover sensitive documents, electronics and other items that should not be exposed to mist or cleaning solutions.",
        "Clear countertops, tables and accessible surfaces.",
        "Ensure the technician has access to the areas requiring treatment.",
        "Inform the technician about sensitive materials or surfaces before service.",
        "Vacate the treatment area during application as instructed."
        ],
    aftercareSteps: [
        "Re-enter the treated area only after the recommended waiting period provided by the technician.",
        "Allow adequate ventilation where instructed.",
        "Do not immediately wipe treated surfaces unless specifically instructed.",
        "Food-contact surfaces should be handled according to the disinfectant manufacturer's instructions before food preparation.",
        "Follow all product-specific safety instructions.",
        "Keep children and pets away until the treated area is safe for re-entry."
        ],
    importantNote: "Disinfection and sanitization procedures vary according to the product and application method. Always follow the technician's specific instructions provided after treatment."
  },
  // Home Cleaning Services
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    iconName: 'Sparkles',
    imageUrl: '/placeholder-cleaning.jpg',
    category: 'cleaning',
    shortDesc: 'Comprehensive top-to-bottom deep cleaning for apartments and villas, reaching every corner.',
    fullDesc: 'Intensive deep cleaning service targeting accumulated dirt and grime. Includes detailed scrubbing of all rooms, inside windows, deep dusting, floor scrubbing, and sanitizing hard-to-reach areas.',
    startingPrice: 'Based on Size',
    problems: ['Heavy Grime', 'Dust Accumulation', 'Move-in / Move-out', 'Post Construction'],
    method: 'Industrial-grade vacuums, steam sanitization, and specialized deep-action chemical cleaners.',
    suitableFor: ['Apartments', 'Villas', 'Offices'],
    duration: '4 - 8 hours',
    preparationSteps: [
        "Remove personal belongings, utensils, toiletries and loose items from the areas to be cleaned.",
        "Store food and other sensitive items safely.",
        "Keep countertops, floors and accessible areas reasonably clear.",
        "Ensure access to water and electricity where required.",
        "Inform the cleaning team about delicate surfaces, materials or items requiring special care."
        ],
    aftercareSteps: [
        "Allow cleaned surfaces and floors to dry completely before use.",
        "Maintain adequate ventilation where required.",
        "Return food, utensils and personal belongings only after relevant surfaces are dry and ready for use.",
        "Follow any specific instructions provided by the cleaning team."
        ],
    importantNote: "Deep cleaning service includes kitchen and bathroom deep cleaning, covering accessible surfaces and areas as agreed at the time of booking."
  },
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
        "Remove loose utensils, dishes and food items from countertops.",
        "Store or remove personal items from the kitchen.",
        "Empty the sink as much as possible.",
        "Clear accessible areas around the stove, countertops and cabinets.",
        "Keep valuable or delicate items in a safe location.",
        "Ensure access to water and electricity where required."
        ],
    aftercareSteps: [
        "Allow cleaned surfaces to dry before placing food or utensils back.",
        "Wash food-contact surfaces if required according to the cleaning product instructions.",
        "Allow sufficient ventilation.",
        "Avoid placing food or personal items on wet surfaces.",
        "Inform the cleaning team of any delicate materials or surfaces before cleaning."
        ],
    importantNote: "Kitchen deep cleaning includes accessible countertops, cabinets/exteriors, sink, stove area, tiles and other agreed accessible surfaces."
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
        "Remove toiletries, personal belongings and loose items from countertops and shower areas.",
        "Remove towels, mats and other items that should not be exposed to cleaning products.",
        "Clear access to the toilet, wash basin, shower area, floor and accessible surfaces.",
        "Inform the cleaning team about delicate materials or surfaces.",
        "Ensure running water and electricity are available where required."
        ],
    aftercareSteps: [
        "Allow cleaned surfaces and floors to dry completely.",
        "Avoid using freshly cleaned wet floors until they are dry.",
        "Allow adequate ventilation.",
        "Return personal belongings only after surfaces are completely dry.",
        "Follow any specific instructions provided by the cleaning team."
        ],
    importantNote: "Bathroom deep cleaning includes accessible tiles, floors, toilet, wash basin, shower area, mirrors and other agreed accessible surfaces."
  }
];

export const HOME_CLEANING_SERVICES = PEST_SERVICES.filter(s => s.category === 'cleaning');
export const PEST_CONTROL_SERVICES = PEST_SERVICES.filter(s => s.category === 'pest');
