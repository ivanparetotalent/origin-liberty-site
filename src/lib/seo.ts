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
