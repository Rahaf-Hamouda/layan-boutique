import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Gift,
  RotateCcw,
  SearchX,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  getCategory,
  getCategoryLabel,
  getProductBySlug,
  getRelatedProducts,
} from '@entities/product';
import { AddToCart } from '@features/add-to-cart';
import { WishlistButton } from '@features/toggle-wishlist';
import { ProductGrid } from '@widgets/product-grid';
import {
  Accordion,
  Badge,
  Breadcrumbs,
  ButtonLink,
  EmptyState,
  Price,
  RatingStars,
  Reveal,
  SectionHeading,
} from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { discountPercent, formatPrice } from '@shared/lib/format';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import { cn } from '@shared/lib/cn';
import styles from './ProductPage.module.css';

const benefits = [
  { icon: Truck, label: 'شحن مجاني فوق 300 ر.س' },
  { icon: RotateCcw, label: 'إرجاع خلال 14 يومًا' },
  { icon: Gift, label: 'تغليف هدايا فاخر' },
];

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  usePageTitle(product?.name);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon={<SearchX size={30} strokeWidth={1.4} />}
            title="لم نجد هذه القطعة"
            description="ربما تغيّر الرابط أو نفدت الكمية. تعالي نبحث معكِ عن بديل يُشبهكِ."
            action={<ButtonLink to={ROUTES.shop}>تصفّحي المجموعة</ButtonLink>}
          />
        </div>
      </section>
    );
  }

  const category = getCategory(product.category);
  const gallery = [product.image, category?.image, '/images/lifestyle.jpg', '/images/campaign.jpg']
    .filter((src, index, list): src is string => Boolean(src) && list.indexOf(src) === index)
    .map((src, index) => ({
      src,
      alt:
        index === 0
          ? product.name
          : index === 1 && category
            ? `إلهام من مجموعة ${category.label}`
            : 'من أجواء بوتيك لَيان',
    }));

  const badge =
    product.badge === 'sale' && product.compareAtPrice
      ? { tone: 'sale' as const, label: `خصم ${discountPercent(product.price, product.compareAtPrice)}٪` }
      : product.badge === 'new'
        ? { tone: 'new' as const, label: 'جديد' }
        : product.badge === 'bestseller'
          ? { tone: 'best' as const, label: 'الأكثر مبيعًا' }
          : null;

  const crumbs = [
    { label: 'الرئيسية', to: ROUTES.home },
    { label: 'المتجر', to: ROUTES.shop },
    { label: getCategoryLabel(product.category), to: `${ROUTES.shop}?category=${product.category}` },
    { label: product.name },
  ];

  const accordionItems = [
    {
      id: 'details',
      title: 'تفاصيل القطعة',
      content: (
        <div className={styles.details}>
          <ul className={styles.detailList}>
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <p className={styles.material}>الخامة: {product.material}</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'العناية بالقطعة',
      content: (
        <p>
          للاحتفاظ بجمال القطعة أطول فترة، نوصي بالتنظيف الجاف أو الغسيل اليدوي
          بالماء البارد مع تجنّب العصر الشديد. احفظيها بعيدًا عن أشعة الشمس المباشرة
          والعطور، واستخدمي كيس الحفظ المرفق.
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'الشحن والإرجاع',
      content: (
        <div className={styles.shippingInfo}>
          <p>
            شحن مجاني للطلبات فوق 300 ر.س. التوصيل خلال 2–4 أيام عمل داخل المملكة،
            وخلال 24 ساعة داخل الرياض.
          </p>
          <p>
            يمكنكِ الإرجاع أو الاستبدال خلال 14 يومًا من الاستلام، بشرط أن تكون
            القطعة بحالتها الأصلية وبكامل تغليفها.
          </p>
        </div>
      ),
    },
    {
      id: 'packaging',
      title: 'التغليف والهدايا',
      content: (
        <p>
          تصل كل قطعة داخل علبة لَيان الفاخرة مع ورق حريري وبطاقة إهداء. يمكنكِ
          إضافة رسالتكِ الشخصية عند إتمام الطلب، وسنغلفها بلمسة ذهبية.
        </p>
      ),
    },
  ];

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <div className="container">
        <Breadcrumbs items={crumbs} className={styles.crumbs} />
      </div>

      <div className={cn('container', styles.layout)}>
        <Reveal className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            {badge && (
              <span className={styles.badge}>
                <Badge tone={badge.tone}>{badge.label}</Badge>
              </span>
            )}
            <span className={styles.imageIndex} aria-hidden="true">
              {String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </span>
          </div>

          <div className={styles.thumbs} role="group" aria-label="صور القطعة">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={cn(styles.thumb, index === activeImage && styles.thumbActive)}
                onClick={() => setActiveImage(index)}
                aria-label={`الصورة ${index + 1}`}
                aria-pressed={index === activeImage}
              >
                <img src={image.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className={styles.info}>
          <div className={styles.infoTop}>
            <div className={styles.titleGroup}>
              <span className={styles.eyebrow}>{getCategoryLabel(product.category)}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <span className={styles.latin}>{product.latinName}</span>
            </div>
            <WishlistButton product={product} variant="pill" withLabel />
          </div>

          <div className={styles.ratingRow}>
            <RatingStars value={product.rating} reviews={product.reviews} size={13} />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.stock}>
              <span className={styles.stockDot} aria-hidden="true" />
              متوفّر
            </span>
          </div>

          <div className={styles.priceRow}>
            <Price value={product.price} compareAt={product.compareAtPrice} size="lg" />
            {product.compareAtPrice && (
              <span className={styles.saving}>
                وفّري {formatPrice(product.compareAtPrice - product.price)}
              </span>
            )}
          </div>

          <p className={styles.short}>{product.shortDescription}</p>

          <div className={styles.divider} />

          <AddToCart product={product} />

          <ul className={styles.benefits}>
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className={styles.delivery}>
            <Sparkles size={15} strokeWidth={1.6} aria-hidden="true" />
            اطلبي اليوم — يصلكِ خلال 2–4 أيام عمل
          </div>

          <Accordion items={accordionItems} defaultOpenId="details" className={styles.accordion} />

          <div className={styles.secure}>
            <ShieldCheck size={15} strokeWidth={1.6} aria-hidden="true" />
            دفع آمن ومشفّر · مدى، فيزا، أبل باي
          </div>
        </Reveal>
      </div>

      <section className={cn('section', 'section-alt')}>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="يكمل إطلالتكِ"
              title="قد يعجبكِ أيضًا"
              action={{ label: 'كل المجموعة', to: `${ROUTES.shop}?category=${product.category}` }}
            />
          </Reveal>
          <ProductGrid products={related} className={styles.relatedGrid} />
        </div>
      </section>
    </>
  );
};
