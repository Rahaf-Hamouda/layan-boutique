import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { SORT_OPTIONS } from '../model/use-product-filters';
import type { SortId } from '../model/use-product-filters';
import styles from './SortSelect.module.css';

interface SortSelectProps {
  value: SortId;
  onChange: (value: SortId) => void;
  className?: string;
}

export const SortSelect = ({ value, onChange, className }: SortSelectProps) => (
  <div className={cn(styles.root, className)}>
    <SlidersHorizontal size={15} strokeWidth={1.8} className={styles.icon} aria-hidden="true" />
    <label className="u-visually-hidden" htmlFor="catalog-sort">
      ترتيب المنتجات
    </label>
    <select
      id="catalog-sort"
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value as SortId)}
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
  </div>
);
