import { ROUTES } from './site';

export interface NavLink {
  label: string;
  to: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'الرئيسية', to: ROUTES.home },
  { label: 'المتجر', to: ROUTES.shop },
  { label: 'الفساتين', to: `${ROUTES.shop}?category=dresses` },
  { label: 'العبايات', to: `${ROUTES.shop}?category=abayas` },
  { label: 'العطور', to: `${ROUTES.shop}?category=perfumes` },
  { label: 'حكايتنا', to: ROUTES.about },
];

export const FOOTER_GROUPS = [
  {
    title: 'تسوّقي',
    links: [
      { label: 'الفساتين', to: `${ROUTES.shop}?category=dresses` },
      { label: 'العبايات', to: `${ROUTES.shop}?category=abayas` },
      { label: 'الحقائب', to: `${ROUTES.shop}?category=bags` },
      { label: 'العطور', to: `${ROUTES.shop}?category=perfumes` },
      { label: 'المجوهرات', to: `${ROUTES.shop}?category=jewelry` },
    ],
  },
  {
    title: 'خدمة العملاء',
    links: [
      { label: 'الشحن والتوصيل', to: ROUTES.shop },
      { label: 'الإرجاع والاستبدال', to: ROUTES.shop },
      { label: 'دليل المقاسات', to: ROUTES.shop },
      { label: 'الأسئلة الشائعة', to: ROUTES.about },
    ],
  },
  {
    title: 'عن لَيان',
    links: [
      { label: 'حكايتنا', to: ROUTES.about },
      { label: 'سياسة الخصوصية', to: ROUTES.about },
      { label: 'الشروط والأحكام', to: ROUTES.about },
      { label: 'تواصلي معنا', to: ROUTES.about },
    ],
  },
] as const;
