const contactPhone = import.meta.env.PUBLIC_CONTACT_PHONE ?? '(423) 925-3582';
const phoneDigits = contactPhone.replace(/\D/g, '').replace(/^1(\d{10})$/, '$1');

export const siteConfig = {
  name: 'Smoky Motors',
  address: '7264 HWY 411, Benton, TN 37307',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=7264+Hwy+411+Benton+TN+37307',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'sales@smokymotors.com',
  contactPhone,
  contactPhoneHref: phoneDigits.length === 10 ? `tel:+1${phoneDigits}` : 'tel:+14239253582',
  contactSmsHref: phoneDigits.length === 10 ? `sms:+1${phoneDigits}` : 'sms:+14239253582',
  telephone:
    phoneDigits.length === 10
      ? `+1-${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
      : '+1-423-925-3582',
  formId: 'ask-about-car',
} as const;
