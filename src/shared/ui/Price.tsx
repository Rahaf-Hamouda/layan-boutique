import { cn } from '@shared/lib/cn';
import { formatPrice } from '@shared/lib/format';
import styles from './Price.module.css';

interface PriceProps {
  value: number;
  compareAt?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price = ({ value, compareAt, size = 'md', className }: PriceProps) => (
  <div className={cn(styles.root, styles[size], className)}>
    <span className={styles.current}>{formatPrice(value)}</span>
    {compareAt && compareAt > value && (
      <span className={styles.compare}>{formatPrice(compareAt)}</span>
    )}
  </div>
);
