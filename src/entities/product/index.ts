export type {
  Category,
  CategoryId,
  CategoryWithCount,
  Product,
  ProductBadge,
} from './model/types';
export {
  categories,
  getBestsellers,
  getCategories,
  getCategory,
  getCategoryLabel,
  getNewArrivals,
  getProductById,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getRelatedProducts,
  products,
  searchProducts,
} from './api/catalog';
export { ProductCard } from './ui/ProductCard';
