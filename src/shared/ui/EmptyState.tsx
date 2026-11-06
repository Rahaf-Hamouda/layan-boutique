import type { ReactNode } from 'react';
import { cn } from '@shared/lib/cn';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn(styles.root, className)}>
    <div className={styles.icon} aria-hidden="true">
      {icon}
    </div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    {action && <div className={styles.action}>{action}</div>}
  </div>
);
