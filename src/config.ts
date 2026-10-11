export const siteConfig = {
  name: 'Smoky Motors',
  address: '7264 HWY 411, Benton, TN 37307',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=7264+Hwy+411+Benton+TN+37307',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'sales@smokymotors.com',
  // Placeholder only. Ryan must replace this before launch.
  contactPhone: import.meta.env.PUBLIC_CONTACT_PHONE ?? '123-456-7890',
  formId: 'ask-about-car',
} as const;
