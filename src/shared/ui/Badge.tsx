import type { ReactNode } from 'react';
import { cn } from '@shared/lib/cn';
import styles from './Badge.module.css';

export type BadgeTone = 'new' | 'sale' | 'best' | 'gold' | 'soft';

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export const Badge = ({ tone = 'soft', children, className }: BadgeProps) => (
  <span className={cn(styles.root, styles[tone], className)}>{children}</span>
);
