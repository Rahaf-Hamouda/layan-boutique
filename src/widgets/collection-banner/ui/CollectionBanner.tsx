import { ArrowLeft, Sparkles } from 'lucide-react';
import { ButtonLink, Reveal } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { formatPrice } from '@shared/lib/format';
import { cn } from '@shared/lib/cn';
import styles from './CollectionBanner.module.css';

export const CollectionBanner = () => (
  <section className={cn('section', styles.root)}>
    <div className="container">
      <Reveal>
        <div className={styles.banner}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>
              <Sparkles size={14} strokeWidth={1.6} aria-hidden="true" />
              المجموعة المسائية
            </span>
            <h2 className={styles.title}>
              للأمسيات التي
              <br />
              لا تُنسى
            </h2>
            <p className={styles.text}>
              قصّات درامية، أقمشة تنساب كالضوء، وتفاصيل ذهبية تُضيء الحضور. مجموعة
              صُمّمت لتكون توقيعكِ في كل مناسبة.
            </p>
            <ul className={styles.list}>
              <li>قصّات محدودة بخامات فاخرة</li>
              <li>أحجام مختارة بعناية لتناسبكِ</li>
              <li>تغليف خاص يرافق كل قطعة</li>
            </ul>
            <div className={styles.actions}>
              <ButtonLink
                to={`${ROUTES.shop}?category=dresses`}
                variant="gold"
                size="lg"
              >
                اكتشفي المجموعة
                <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
              </ButtonLink>
              <span className={styles.starting}>تبدأ من {formatPrice(460)}</span>
            </div>
          </div>

          <div className={styles.visual}>
            <img
              src="/images/campaign.jpg"
              alt="إطلالة مسائية من مجموعة لَيان بألوان دافئة وإضاءة ناعمة"
              loading="lazy"
            />
            <span className={styles.tag}>The Evening Edit</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
