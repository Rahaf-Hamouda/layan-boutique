import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { ButtonLink, Container } from '@shared/ui';
import { ROUTES, SITE } from '@shared/config/site';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  usePageTitle('الصفحة غير موجودة');

  return (
    <section className={styles.root}>
      <Container className={styles.inner}>
        <div className={styles.visual} aria-hidden="true">
          <span className={styles.arch} />
          <span className={styles.code}>404</span>
          <span className={styles.caption}>Lost in Elegance</span>
        </div>

        <div className={styles.copy}>
          <span className="eyebrow">خرجتِ عن المسار</span>
          <h1 className={styles.title}>هذه الصفحة ارتدت ثوباً آخر</h1>
          <p className={styles.description}>
            الرابط الذي تبحثين عنه لم يعد متوفراً أو ربما تغيّر عنوانه. دعينا نعيدكِ إلى مكانكِ
            الطبيعي بين التفاصيل الجميلة.
          </p>

          <div className={styles.actions}>
            <ButtonLink to={ROUTES.home} size="lg">
              العودة للرئيسية
              <ArrowLeft size={17} strokeWidth={1.8} />
            </ButtonLink>
            <ButtonLink to={ROUTES.shop} variant="outline" size="lg">
              <Compass size={17} strokeWidth={1.8} />
              تسوّقي المجموعة
            </ButtonLink>
          </div>

          <div className={styles.shortcuts}>
            <span>قد يعجبكِ أيضاً</span>
            <Link to={`${ROUTES.shop}?category=dresses`}>الفساتين</Link>
            <Link to={`${ROUTES.shop}?category=abayas`}>العبايات</Link>
            <Link to={ROUTES.about}>حكاية {SITE.name}</Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
