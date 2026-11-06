import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/lib/cn';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  badge?: number;
  variant?: 'plain' | 'outline';
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, badge = 0, variant = 'plain', className, children, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(styles.root, styles[variant], className)}
      {...rest}
    >
      {children}
      {badge > 0 && (
        <span className={styles.badge} aria-hidden="true">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  ),
);

IconButton.displayName = 'IconButton';
