import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge, Price, RatingStars } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import { discountPercent } from '@shared/lib/format';
import { getCategoryLabel } from '../api/catalog';
import type { Product } from '../model/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  favoriteAction?: ReactNode;
  className?: string;
}

const getBadge = (product: Product): { tone: 'new' | 'best' | 'sale'; label: string } | null => {
  if (product.badge === 'sale' && product.compareAtPrice) {
    return { tone: 'sale', label: `خصم ${discountPercent(product.price, product.compareAtPrice)}٪` };
  }
  if (product.badge === 'new') return { tone: 'new', label: 'جديد' };
  if (product.badge === 'bestseller') return { tone: 'best', label: 'الأكثر مبيعًا' };
  return null;
};

export const ProductCard = ({ product, favoriteAction, className }: ProductCardProps) => {
  const url = ROUTES.product(product.slug);
  const badge = getBadge(product);

  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.media}>
        <Link to={url} className={styles.imageLink} aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        </Link>

        {badge && (
          <div className={styles.badges}>
            <Badge tone={badge.tone}>{badge.label}</Badge>
          </div>
        )}

        {favoriteAction && <div className={styles.favorite}>{favoriteAction}</div>}

        <Link to={url} className={styles.quick} tabIndex={-1} aria-hidden="true">
          عرض القطعة
          <ArrowLeft size={14} strokeWidth={1.8} />
        </Link>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{getCategoryLabel(product.category)}</span>
        <h3 className={styles.name}>
          <Link to={url}>{product.name}</Link>
        </h3>
        <div className={styles.meta}>
          <RatingStars value={product.rating} size={12} />
          <Price value={product.price} compareAt={product.compareAtPrice} size="sm" />
        </div>
      </div>
    </article>
  );
};
