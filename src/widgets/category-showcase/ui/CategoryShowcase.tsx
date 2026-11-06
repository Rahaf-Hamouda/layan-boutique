import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getCategories } from '@entities/product';
import { Reveal, SectionHeading } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import { formatNumber } from '@shared/lib/format';
import styles from './CategoryShowcase.module.css';

export const CategoryShowcase = () => {
  const categories = getCategories();

  return (
    <section className={cn('section', styles.root)}>
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="تسوّقي بحسب القسم"
            title="عوالم لَيان"
            description="سبعة عوالم من الأناقة، كلٌّ منها ينتظر لمسة من ذوقكِ."
            action={{ label: 'كل الأقسام', to: ROUTES.shop }}
          />
        </Reveal>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={Math.min(index, 4) * 70}>
              <Link
                to={`${ROUTES.shop}?category=${category.id}`}
                className={styles.card}
              >
                <span className={styles.media}>
                  <img src={category.image} alt={category.label} loading="lazy" />
                  <span className={styles.veil} aria-hidden="true" />
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowLeft size={15} strokeWidth={1.7} />
                  </span>
                </span>
                <span className={styles.footer}>
                  <span className={styles.info}>
                    <strong className={styles.label}>{category.label}</strong>
                    <span className={styles.description}>{category.description}</span>
                  </span>
                  <span className={styles.count}>{formatNumber(category.count)} قطعة</span>
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={280} className={styles.promoReveal}>
            <Link to={ROUTES.shop} className={styles.promo}>
              <span className={styles.promoTop}>
                <Sparkles size={18} strokeWidth={1.5} aria-hidden="true" />
                <span className={styles.promoEyebrow}>عرض ترحيبي</span>
              </span>
              <span className={styles.promoTitle}>
                خصم ١٥٪
                <br />
                على أول طلب
              </span>
              <span className={styles.promoCode} dir="ltr">
                WELCOME15
              </span>
              <span className={styles.promoCta}>
                اكتشفي القطع
                <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
