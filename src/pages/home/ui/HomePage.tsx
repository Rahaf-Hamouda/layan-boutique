import { getBestsellers, getNewArrivals } from '@entities/product';
import { Hero } from '@widgets/hero';
import { ServiceHighlights } from '@widgets/service-highlights';
import { CategoryShowcase } from '@widgets/category-showcase';
import { ProductGrid } from '@widgets/product-grid';
import { CollectionBanner } from '@widgets/collection-banner';
import { BrandStory } from '@widgets/brand-story';
import { Testimonials } from '@widgets/testimonials';
import { NewsletterBand } from '@widgets/newsletter-band';
import { Reveal, SectionHeading } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import styles from './HomePage.module.css';

export const HomePage = () => (
  <>
    <Hero />
    <ServiceHighlights />
    <CategoryShowcase />

    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="وصل حديثًا"
            title="قطعة تُشبه بدايتكِ"
            description="لمسات جديدة وصلت لتُكمل خزانتكِ بأناقة هادئة."
            action={{ label: 'كل الجديد', to: `${ROUTES.shop}?sort=newest` }}
          />
        </Reveal>
        <ProductGrid products={getNewArrivals(4)} className={styles.grid} />
      </div>
    </section>

    <CollectionBanner />

    <section className={cn('section', 'section-alt')}>
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="الأكثر مبيعًا"
            title="اختيارات تُحبّها الجميع"
            description="القطع التي تعود إليها عميلاتنا في كل مناسبة."
            action={{ label: 'كل الأكثر مبيعًا', to: `${ROUTES.shop}?sort=rating` }}
          />
        </Reveal>
        <ProductGrid products={getBestsellers(4)} className={styles.grid} />
      </div>
    </section>

    <BrandStory />
    <Testimonials />
    <NewsletterBand />
  </>
);
