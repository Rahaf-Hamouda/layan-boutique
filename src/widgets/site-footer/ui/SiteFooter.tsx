import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@shared/ui';
import { FOOTER_GROUPS } from '@shared/config/navigation';
import { SITE } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import styles from './SiteFooter.module.css';

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={cn('container', styles.top)}>
        <div className={styles.brandCol}>
          <Logo variant="light" className={styles.logo} />
          <p className={styles.tagline}>{SITE.description}</p>

          <ul className={styles.contact}>
            <li>
              <MapPin size={14} strokeWidth={1.6} aria-hidden="true" />
              {SITE.address}
            </li>
            <li>
              <Phone size={14} strokeWidth={1.6} aria-hidden="true" />
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} dir="ltr">
                {SITE.phone}
              </a>
            </li>
            <li>
              <Mail size={14} strokeWidth={1.6} aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} dir="ltr">
                {SITE.email}
              </a>
            </li>
            <li>
              <Instagram size={14} strokeWidth={1.6} aria-hidden="true" />
              <span dir="ltr">{SITE.instagram}</span>
            </li>
          </ul>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} className={styles.group} aria-label={group.title}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <ul className={styles.links}>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.to}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={cn('container', styles.bottom)}>
        <p className={styles.copyright}>
          © {year} {SITE.name}. جميع الحقوق محفوظة.
        </p>
        <p className={styles.vat}>{SITE.vatNote}</p>
        <ul className={styles.payments} aria-label="وسائل الدفع المتاحة">
          <li>mada</li>
          <li>VISA</li>
          <li>Mastercard</li>
          <li>Apple Pay</li>
        </ul>
      </div>
    </footer>
  );
};
