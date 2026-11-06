import { Heart } from 'lucide-react';
import { useWishlistStore } from '@entities/wishlist';
import type { Product } from '@entities/product';
import { notify } from '@shared/lib/toast';
import { cn } from '@shared/lib/cn';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  product: Product;
  variant?: 'floating' | 'pill';
  withLabel?: boolean;
  className?: string;
}

export const WishlistButton = ({
  product,
  variant = 'floating',
  withLabel = false,
  className,
}: WishlistButtonProps) => {
  const isFavorite = useWishlistStore((state) => state.ids.includes(product.id));
  const toggle = useWishlistStore((state) => state.toggle);

  const handleClick = () => {
    const added = toggle(product.id);
    notify.success(
      added ? 'أُضيفت إلى المفضلة' : 'أُزيلت من المفضلة',
      added ? product.name : 'يمكنكِ إعادتها في أي وقت',
    );
  };

  return (
    <button
      type="button"
      className={cn(styles.root, styles[variant], isFavorite && styles.active, className)}
      onClick={handleClick}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} إلى المفضلة`}
      title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
    >
      <Heart size={variant === 'floating' ? 17 : 18} strokeWidth={1.7} fill={isFavorite ? 'currentColor' : 'none'} />
      {withLabel && <span>{isFavorite ? 'في المفضلة' : 'أضيفي للمفضلة'}</span>}
    </button>
  );
};
