export interface UAEEmirateLocations {
  emirate: string;
  areas: string[];
}

export const UAE_LOCATIONS: UAEEmirateLocations[] = [
  {
    emirate: 'Dubai (District 1)',
    areas: [
      'Dubai Marina',
      'Downtown Dubai',
      'Palm Jumeirah',
      'Business Bay',
      'Jumeirah Beach Residence (JBR)',
      'Jumeirah Lakes Towers (JLT)',
      'Arabian Ranches',
      'Al Barsha & Barsha Heights'
    ]
  },
  {
    emirate: 'Dubai (District 2)',
    areas: [
      'Jumeirah Village Circle (JVC)',
      'Jumeirah Village Triangle (JVT)',
      'Dubai Hills Estate',
      'Mirdif & Damac Hills',
      'Deira & Bur Dubai',
      'Dubai Design District (D3)',
      'Dubai Investment Park (DIP)',
      'Jebel Ali Free Zone (JAFZA)'
    ]
  },
  {
    emirate: 'Sharjah (District 1)',
    areas: [
      'Al Majaz & Corniche',
      'Al Zahia & Muwaileh',
      'Al Khan',
      'Al Nahda Sharjah',
      'Sharjah Industrial Area'
    ]
  },
  {
    emirate: 'Sharjah (District 2)',
    areas: [
      'Al Qasimia',
      'Al Taawun',
      'Al Rolla',
      'University City Sharjah',
      'Al Mamzar Sharjah'
    ]
  },
  {
    emirate: 'Ajman',
    areas: [
      'Ajman Downtown',
      'Al Nuaimiya',
      'Al Rashidiya',
      'Al Jurf',
      'Emirates City'
    ]
  }
];

export const POPULAR_LOCATIONS = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Business Bay',
  'Jumeirah Village Circle (JVC)',
  'Arabian Ranches',
  'Al Majaz (Sharjah)',
  'Al Zahia (Sharjah)',
  'Al Nahda (Sharjah)'
];
