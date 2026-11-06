import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@entities/product';
import { useCartStore } from '@entities/cart';
import { Button, QuantityStepper } from '@shared/ui';
import { notify } from '@shared/lib/toast';
import { cn } from '@shared/lib/cn';
import styles from './AddToCart.module.css';

interface AddToCartProps {
  product: Product;
  className?: string;
}

export const AddToCart = ({ product, className }: AddToCartProps) => {
  const add = useCartStore((state) => state.add);
  const openCart = useCartStore((state) => state.openCart);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const handleAdd = () => {
    if (product.sizes && !size) {
      setError('اختاري المقاس أولًا');
      return;
    }

    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        size,
      },
      qty,
    );

    notify.success(
      'أُضيفت إلى السلة',
      `${product.name}${size ? ` — مقاس ${size}` : ''} × ${qty}`,
    );
    openCart();
  };

  return (
    <div className={cn(styles.root, className)}>
      {product.sizes && (
        <div className={styles.sizes}>
          <div className={styles.sizesHead}>
            <span className={styles.label}>المقاس</span>
            <button
              type="button"
              className={styles.guideToggle}
              onClick={() => setShowGuide((value) => !value)}
              aria-expanded={showGuide}
            >
              دليل المقاسات
            </button>
          </div>

          <div className={styles.sizeOptions} role="radiogroup" aria-label="المقاس">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={size === option}
                className={cn(styles.sizeOption, size === option && styles.sizeActive)}
                onClick={() => {
                  setSize(option);
                  setError('');
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {showGuide && (
            <div className={styles.guide}>
              <p>
                قياساتنا مأخوذة من الجسم مباشرة. إن كنتِ بين مقاسين، ننصحك باختيار المقاس
                الأكبر لإطلالة أكثر ارتياحًا، أو تواصلي معنا وسنساعدك بكل سرور.
              </p>
            </div>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <QuantityStepper value={qty} onChange={setQty} />
        <Button size="lg" full onClick={handleAdd} className={styles.addButton}>
          <ShoppingBag size={18} strokeWidth={1.8} aria-hidden="true" />
          أضيفي إلى السلة
        </Button>
      </div>
    </div>
  );
};
