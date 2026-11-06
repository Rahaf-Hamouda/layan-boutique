import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBestsellers } from '@entities/product';
import { ButtonLink, Price } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import styles from './Hero.module.css';

export const Hero = () => {
  const featured = getBestsellers()[0];

  return (
    <section className={styles.hero}>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.archGhost} aria-hidden="true" />

      <div className={cn('container', styles.inner)}>
        <div className={styles.copy}>
          <span className="eyebrow">مجموعة «أُمسيات» — خريف ٢٠٢٦</span>
          <h1 className={styles.title}>
            أناقة تُروى
            <br />
            <span className={styles.accent}>بالتفاصيل</span>
          </h1>
          <p className={styles.lead}>
            قطع تُختار بعناية، وقصّات تحتفي بحضوركِ الهادئ. من أمسيات الرياض إلى
            تفاصيلكِ اليومية، كل قطعة تحمل حكاية تُشبهكِ.
          </p>

          <div className={styles.actions}>
            <ButtonLink to={ROUTES.shop} size="lg">
              تسوّقي المجموعة
              <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to={ROUTES.about} variant="outline" size="lg">
              حكاية لَيان
            </ButtonLink>
          </div>

          <div className={styles.proof}>
            <div className={styles.stat}>
              <strong className={styles.statValue}>4.9</strong>
              <span className={styles.statLabel}>تقييم العميلات</span>
            </div>
            <div className={styles.stat}>
              <strong className={styles.statValue}>+12K</strong>
              <span className={styles.statLabel}>امرأة تختار لَيان</span>
            </div>
            <div className={styles.stat}>
              <strong className={styles.statValue}>24h</strong>
              <span className={styles.statLabel}>توصيل داخل الرياض</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <figure className={styles.arch}>
            <img
              src="/images/hero.jpg"
              alt="إطلالة من مجموعة أُمسيات بقصّة أنثوية وألوان دافئة"
              loading="eager"
              {...{ fetchpriority: 'high' }}
            />
          </figure>

          {featured && (
            <Link to={ROUTES.product(featured.slug)} className={styles.floatingCard}>
              <span className={styles.floatingLabel}>القطعة الأكثر طلبًا</span>
              <span className={styles.floatingRow}>
                <img src={featured.image} alt="" loading="lazy" />
                <span className={styles.floatingInfo}>
                  <strong>{featured.name}</strong>
                  <span className={styles.floatingLatin}>{featured.latinName}</span>
                </span>
                <Price value={featured.price} size="sm" className={styles.floatingPrice} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
