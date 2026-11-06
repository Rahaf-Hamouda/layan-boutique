import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="مسار التنقل" className={cn(styles.root, className)}>
    <ol>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`}>
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronLeft size={13} strokeWidth={1.8} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
