import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, getCategoryLabel, products } from '@entities/product';
import type { CategoryId } from '@entities/product';
import { normalizeText } from '@shared/lib/format';

export type SortId = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
export type PriceRangeId = 'under-300' | '300-600' | '600-1000' | 'above-1000';

export const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number | null }[] = [
  { id: 'under-300', label: 'أقل من 300 ر.س', min: 0, max: 300 },
  { id: '300-600', label: '300 — 600 ر.س', min: 300, max: 600 },
  { id: '600-1000', label: '600 — 1,000 ر.س', min: 600, max: 1000 },
  { id: 'above-1000', label: 'أكثر من 1,000 ر.س', min: 1000, max: null },
];

export const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: 'featured', label: 'الأكثر تميّزًا' },
  { id: 'newest', label: 'وصل حديثًا' },
  { id: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { id: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { id: 'rating', label: 'الأعلى تقييمًا' },
];

const sizeOrder: Record<string, number> = {
  XS: 0,
  S: 1,
  M: 2,
  L: 3,
  XL: 4,
  XXL: 5,
};

const compareSizes = (a: string, b: string): number => {
  const orderA = sizeOrder[a];
  const orderB = sizeOrder[b];
  if (orderA !== undefined && orderB !== undefined) return orderA - orderB;
  if (orderA !== undefined) return -1;
  if (orderB !== undefined) return 1;
  return Number(a) - Number(b);
};

export const useProductFilters = () => {
  const [params, setParams] = useSearchParams();

  const categoryParam = params.get('category');
  const category: CategoryId | 'all' = categories.some((item) => item.id === categoryParam)
    ? (categoryParam as CategoryId)
    : 'all';

  const query = params.get('q') ?? '';

  const priceParam = params.get('price');
  const price: PriceRangeId | 'all' = PRICE_RANGES.some((range) => range.id === priceParam)
    ? (priceParam as PriceRangeId)
    : 'all';

  const sortParam = params.get('sort');
  const sort: SortId = SORT_OPTIONS.some((option) => option.id === sortParam)
    ? (sortParam as SortId)
    : 'featured';

  const sizes = useMemo(
    () => (params.get('size') ?? '').split(',').filter(Boolean),
    [params],
  );
  const sizesKey = sizes.join(',');

  const update = (patch: Record<string, string | string[] | null>) => {
    const next = new URLSearchParams(params);

    Object.entries(patch).forEach(([key, value]) => {
      const isEmpty =
        value === null ||
        value === '' ||
        value === 'all' ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        next.delete(key);
      } else {
        next.set(key, Array.isArray(value) ? value.join(',') : value);
      }
    });

    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = products.slice();

    if (category !== 'all') {
      result = result.filter((product) => product.category === category);
    }

    const normalizedQuery = normalizeText(query);
    if (normalizedQuery) {
      result = result.filter((product) =>
        normalizeText(
          `${product.name} ${product.latinName} ${product.material} ${getCategoryLabel(product.category)}`,
        ).includes(normalizedQuery),
      );
    }

    if (sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size)),
      );
    }

    if (price !== 'all') {
      const range = PRICE_RANGES.find((item) => item.id === price);
      if (range) {
        result = result.filter(
          (product) =>
            product.price >= range.min && (range.max === null || product.price < range.max),
        );
      }
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => Number(b.badge === 'new') - Number(a.badge === 'new'));
        break;
      default:
        break;
    }

    return result;
  }, [category, query, sizesKey, price, sort, sizes]);

  const availableSizes = useMemo(() => {
    const base =
      category === 'all' ? products : products.filter((product) => product.category === category);
    const set = new Set<string>();
    base.forEach((product) => product.sizes?.forEach((size) => set.add(size)));
    return Array.from(set).sort(compareSizes);
  }, [category]);

  const activeCount =
    Number(category !== 'all') +
    Number(Boolean(query.trim())) +
    Number(sizes.length > 0) +
    Number(price !== 'all');

  const toggleSize = (size: string) => {
    const next = sizes.includes(size)
      ? sizes.filter((item) => item !== size)
      : [...sizes, size];
    update({ size: next });
  };

  return {
    filters: { category, query, sizes, price, sort },
    filtered,
    activeCount,
    availableSizes,
    totalResults: filtered.length,
    setCategory: (value: CategoryId | 'all') => update({ category: value }),
    setQuery: (value: string) => update({ q: value }),
    setPrice: (value: PriceRangeId | 'all') => update({ price: value }),
    setSort: (value: SortId) => update({ sort: value }),
    toggleSize,
    reset: () => setParams(new URLSearchParams(), { replace: true }),
  };
};

export type ProductFiltersController = ReturnType<typeof useProductFilters>;
