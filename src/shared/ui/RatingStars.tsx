import { cn } from '@shared/lib/cn';
import { formatNumber } from '@shared/lib/format';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
  value: number;
  reviews?: number;
  size?: number;
  className?: string;
}

const StarGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3.4l2.47 5.34 5.86.71-4.32 4.02 1.15 5.8L12 16.42l-5.16 2.85 1.15-5.8-4.32-4.02 5.86-.71L12 3.4z" />
  </svg>
);

export const RatingStars = ({ value, reviews, size = 14, className }: RatingStarsProps) => (
  <div className={cn(styles.root, className)}>
    <span
      className={styles.stars}
      style={{ fontSize: `${size}px` }}
      role="img"
      aria-label={`التقييم ${value} من 5`}
    >
      <span className={styles.base}>
        {[0, 1, 2, 3, 4].map((index) => (
          <StarGlyph key={index} />
        ))}
      </span>
      <span className={styles.fill} style={{ width: `${(value / 5) * 100}%` }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <StarGlyph key={index} />
        ))}
      </span>
    </span>
    <span className={styles.value}>{value.toFixed(1)}</span>
    {typeof reviews === 'number' && (
      <span className={styles.reviews}>({formatNumber(reviews)} تقييم)</span>
    )}
  </div>
);
