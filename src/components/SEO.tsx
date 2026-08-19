import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
  schemaMarkup?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  imageUrl = 'https://ridoutpest.com/hero-bg.jpg',
  schemaMarkup
}) => {
  const fullTitle = `${title} | Ridout Pest Control & Cleaning UAE`;
  const pageUrl = `https://ridoutpest.com${canonicalUrl || ''}`;

  // Default rich LocalBusiness schema with 4.9 Star Aggregate Rating
  const defaultLocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ridout Pest Control & Home Cleaning Services UAE',
    image: imageUrl,
    telephone: '+971554720124',
    url: 'https://ridoutpest.com',
    priceRange: 'AED 129 - AED 999',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai, Sharjah, Ajman',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.2048',
      longitude: '55.2708'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '348',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const finalSchema = schemaMarkup || defaultLocalBusinessSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content="pest control dubai, pest control sharjah, pest control ajman, bed bug treatment dubai, cockroach control uae, deep cleaning dubai, kitchen cleaning sharjah, municipality approved pest control" />

      {/* Local UAE Geo Meta Tags */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, Sharjah, Ajman" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Rid Out Pest Control UAE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};
