import type { SelectHTMLAttributes } from 'react';
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import styles from './FormField.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly Option[];
  placeholder?: string;
  error?: string;
  className?: string;
}

export const SelectField = ({
  label,
  options,
  placeholder,
  error,
  id,
  className,
  ...rest
}: SelectFieldProps) => {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={fieldId}
          className={cn(styles.select, error && styles.invalid)}
          aria-invalid={Boolean(error)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </div>
      {error && <p className={cn(styles.hint, styles.error)}>{error}</p>}
    </div>
  );
};
