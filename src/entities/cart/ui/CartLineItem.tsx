import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Price, QuantityStepper } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import type { CartLine } from '../model/types';
import styles from './CartLineItem.module.css';

interface CartLineItemProps {
  line: CartLine;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
  compact?: boolean;
}

export const CartLineItem = ({ line, onQtyChange, onRemove, compact = false }: CartLineItemProps) => (
  <article className={cn(styles.root, compact && styles.compact)}>
    <Link to={ROUTES.product(line.slug)} className={styles.media}>
      <img src={line.image} alt={line.name} loading="lazy" />
    </Link>

    <div className={styles.info}>
      <div className={styles.top}>
        <div className={styles.titleGroup}>
          <Link to={ROUTES.product(line.slug)} className={styles.name}>
            {line.name}
          </Link>
          {line.size && <span className={styles.size}>المقاس: {line.size}</span>}
        </div>
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          aria-label={`إزالة ${line.name} من السلة`}
        >
          <X size={15} strokeWidth={1.8} />
        </button>
      </div>

      <div className={styles.bottom}>
        <QuantityStepper
          value={line.qty}
          onChange={onQtyChange}
          size="sm"
          label={`كمية ${line.name}`}
        />
        <Price value={line.price} compareAt={line.compareAtPrice} size="sm" />
      </div>
    </div>
  </article>
);
