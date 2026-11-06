export const ROUTES = {
  home: '/',
  shop: '/shop',
  product: (slug: string) => `/product/${slug}`,
  cart: '/cart',
  checkout: '/checkout',
  wishlist: '/wishlist',
  about: '/about',
} as const;

export const SITE = {
  name: 'لَيان',
  latinName: 'LAYAN',
  tagline: 'أناقة تُروى بالتفاصيل',
  description:
    'بوتيك أزياء نسائية راقية من الرياض. قطع مختارة بعناية، وتفاصيل تُصنع لتبقى في الذاكرة.',
  phone: '+966 55 214 8890',
  email: 'care@layan.sa',
  address: 'الرياض — حي السليمانية، طريق الملك عبدالعزيز',
  instagram: '@layan.boutique',
  freeShippingThreshold: 300,
  shippingFee: 25,
  codFee: 15,
  vatNote: 'الأسعار تشمل ضريبة القيمة المضافة',
  foundedYear: 2021,
} as const;

export const PROMO_CODES: Record<string, { rate: number; label: string }> = {
  LAYAN10: { rate: 0.1, label: 'خصم ١٠٪ على جميع القطع' },
  WELCOME15: { rate: 0.15, label: 'خصم ترحيبي ١٥٪' },
};

export const CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الطائف',
  'أبها',
  'تبوك',
  'بريدة',
] as const;
