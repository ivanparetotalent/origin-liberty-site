export const SITE = {
  name: 'Origin Liberty',
  url: 'https://originliberty.com',
  defaultTitle: 'Origin Liberty — Move your family to Uruguay in 90 days.',
  defaultDescription:
    'Origin Liberty is a relocation concierge for U.S. and global founders moving their families to Uruguay. Ninety days from your decision to landed, filed, and operational.',
  email: 'hello@originliberty.com',
  ogImage: '/og-default.jpg',
  twitter: '',
};

// Booking widget — LeadConnector / GoHighLevel iframe.
// The form_embed.js script handles postMessage-based auto-resize, so
// the iframe expands to fit its content and we don't need a fixed height.
export const BOOKING = {
  embedUrl: 'https://api.leadconnectorhq.com/widget/booking/raxVUChnhNsLVh3osroB',
  embedScript: 'https://link.msgsndr.com/js/form_embed.js',
  // Stable id used by the embed script to target this iframe for resize.
  iframeId: 'raxVUChnhNsLVh3osroB_origin-liberty',
};

// Google Analytics 4 measurement ID. Empty string disables the snippet.
export const ANALYTICS = {
  ga4MeasurementId: 'G-8Y10X38M8H',
};

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/og-default.jpg`,
    email: SITE.email,
    sameAs: [],
  };
}

export function buildServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Origin Liberty Relocation Concierge',
    serviceType: 'Relocation Concierge',
    areaServed: {
      '@type': 'Country',
      name: 'Uruguay',
    },
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    description:
      'Ninety-day, founder-led relocation concierge moving U.S. and global founder families to Uruguay. Residency, tax structure, apartment, EA, and onboarding included.',
    offers: {
      '@type': 'Offer',
      price: '20000',
      priceCurrency: 'USD',
    },
  };
}
