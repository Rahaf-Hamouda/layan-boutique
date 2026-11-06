import { Minus, Plus } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
  label?: string;
}

export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
  className,
  label = 'الكمية',
}: QuantityStepperProps) => (
  <div className={cn(styles.root, styles[size], className)} role="group" aria-label={label}>
    <button
      type="button"
      className={styles.button}
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      aria-label="إنقاص الكمية"
    >
      <Minus size={14} strokeWidth={2} />
    </button>
    <span className={styles.value} aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      className={styles.button}
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      aria-label="زيادة الكمية"
    >
      <Plus size={14} strokeWidth={2} />
    </button>
  </div>
);
