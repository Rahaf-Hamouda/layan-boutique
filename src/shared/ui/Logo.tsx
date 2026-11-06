import { Link } from 'react-router-dom';
import { cn } from '@shared/lib/cn';
import { ROUTES, SITE } from '@shared/config/site';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const Logo = ({ variant = 'dark', className }: LogoProps) => (
  <Link
    to={ROUTES.home}
    className={cn(styles.root, styles[variant], className)}
    aria-label={`${SITE.name} — الصفحة الرئيسية`}
  >
    <span className={styles.mark} aria-hidden="true">
      <svg viewBox="0 0 44 44" fill="none">
        <path
          d="M6.5 39V22.5C6.5 13.94 13.44 7 22 7s15.5 6.94 15.5 15.5V39"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 39V23.2C12 17.57 16.57 13 22.2 13s10.2 4.57 10.2 10.2V39"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.65"
        />
        <circle cx="22.2" cy="23.4" r="2.4" fill="currentColor" />
      </svg>
    </span>
    <span className={styles.word}>
      <span className={styles.arabic}>{SITE.name}</span>
      <span className={styles.latin}>{SITE.latinName}</span>
    </span>
  </Link>
);
