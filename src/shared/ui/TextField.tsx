import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from '@shared/lib/cn';
import styles from './FormField.module.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
}

export const TextField = ({ label, error, hint, id, className, ...rest }: TextFieldProps) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const descId = `${fieldId}-desc`;

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <input
        id={fieldId}
        className={cn(styles.input, error && styles.invalid)}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? descId : undefined}
        {...rest}
      />
      {(error || hint) && (
        <p id={descId} className={cn(styles.hint, error && styles.error)}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
};
