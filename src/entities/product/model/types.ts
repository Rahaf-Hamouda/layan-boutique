export type CategoryId =
  | 'dresses'
  | 'abayas'
  | 'bags'
  | 'perfumes'
  | 'jewelry'
  | 'beauty'
  | 'shoes';

export type ProductBadge = 'new' | 'bestseller' | 'sale';

export interface Product {
  id: string;
  slug: string;
  name: string;
  latinName: string;
  category: CategoryId;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: ProductBadge;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string;
  details: string[];
  sizes?: string[];
  material: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  latinLabel: string;
  description: string;
  image: string;
}

export interface CategoryWithCount extends Category {
  count: number;
}
