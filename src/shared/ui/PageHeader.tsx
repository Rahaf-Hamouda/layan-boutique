import type { ReactNode } from 'react';
import { cn } from '@shared/lib/cn';
import { Container } from './Container';
import { Breadcrumbs } from './Breadcrumbs';
import type { Crumb } from './Breadcrumbs';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  crumbs,
  eyebrow,
  title,
  description,
  aside,
  className,
}: PageHeaderProps) => (
  <header className={cn(styles.root, className)}>
    <Container className={styles.inner}>
      <div className={styles.text}>
        {crumbs && <Breadcrumbs items={crumbs} className={styles.crumbs} />}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </Container>
  </header>
);
