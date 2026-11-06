import type { TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from '@shared/lib/cn';
import styles from './FormField.module.css';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
}

export const TextareaField = ({
  label,
  error,
  hint,
  id,
  className,
  ...rest
}: TextareaFieldProps) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const descId = `${fieldId}-desc`;

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <textarea
        id={fieldId}
        className={cn(styles.textarea, error && styles.invalid)}
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
