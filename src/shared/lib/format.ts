const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export const formatNumber = (value: number): string => numberFormatter.format(value);

export const formatPrice = (value: number): string => `${numberFormatter.format(value)} ر.س`;

export const pieceWord = (count: number): string => (count >= 3 && count <= 10 ? 'قطع' : 'قطعة');

export const discountPercent = (price: number, compareAtPrice?: number): number => {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round((1 - price / compareAtPrice) * 100);
};

export const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim();
