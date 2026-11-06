import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { ButtonLink } from './Button';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'start' | 'center';
  action?: { label: string; to: string };
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'start',
  action,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) => (
  <div className={cn(styles.root, styles[align], className)}>
    <div className={styles.text}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className={styles.title}>{title}</Heading>
      {description && <p className={styles.description}>{description}</p>}
    </div>
    {action && (
      <ButtonLink to={action.to} variant="ghost" size="sm" className={styles.action}>
        {action.label}
        <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
      </ButtonLink>
    )}
  </div>
);
