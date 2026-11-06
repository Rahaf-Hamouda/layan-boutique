import type { Product } from '@entities/product';
import { ProductCard } from '@entities/product';
import { WishlistButton } from '@features/toggle-wishlist';
import { Reveal } from '@shared/ui';
import { cn } from '@shared/lib/cn';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}

export const ProductGrid = ({ products, columns = 4, className }: ProductGridProps) => (
  <div className={cn(styles.grid, columns === 3 && styles.cols3, className)}>
    {products.map((product, index) => (
      <Reveal key={product.id} delay={Math.min(index, 5) * 70}>
        <ProductCard
          product={product}
          favoriteAction={<WishlistButton product={product} />}
        />
      </Reveal>
    ))}
  </div>
);
