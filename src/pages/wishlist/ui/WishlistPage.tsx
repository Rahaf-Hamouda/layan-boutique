import { ArrowLeft, Heart } from 'lucide-react';
import { getProductById } from '@entities/product';
import type { Product } from '@entities/product';
import { useWishlistStore } from '@entities/wishlist';
import { ProductGrid } from '@widgets/product-grid';
import { ButtonLink, EmptyState, PageHeader } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { formatNumber, pieceWord } from '@shared/lib/format';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import styles from './WishlistPage.module.css';

export const WishlistPage = () => {
  usePageTitle('قائمة المفضلة');

  const ids = useWishlistStore((state) => state.ids);
  const products = ids
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'الرئيسية', to: ROUTES.home },
          { label: 'المتجر', to: ROUTES.shop },
          { label: 'المفضلة' },
        ]}
        eyebrow="قطعكِ المحفوظة"
        title="قائمة المفضلة"
        description={
          products.length > 0
            ? `${formatNumber(products.length)} ${pieceWord(products.length)} لفتت قلبكِ — كل واحدة منها تنتظر لحظتها.`
            : 'احفظي ما يُشبهكِ هنا، وعودي إليه متى شئتِ.'
        }
      />

      <section className={styles.section}>
        <div className="container">
          {products.length === 0 ? (
            <div className={styles.empty}>
              <EmptyState
                icon={<Heart size={30} strokeWidth={1.4} />}
                title="قائمتكِ تنتظر أول قطعة"
                description="اضغطي على القلب بجانب أي قطعة لتحفظيها هنا، وتجديها دائمًا في انتظاركِ."
                action={<ButtonLink to={ROUTES.shop}>اكتشفي القطع</ButtonLink>}
              />
            </div>
          ) : (
            <>
              <div className={styles.toolbar}>
                <p>
                  لديكِ <b>{formatNumber(products.length)}</b> {pieceWord(products.length)} محفوظة
                </p>
                <ButtonLink to={ROUTES.shop} variant="ghost" size="sm">
                  اكتشفي المزيد
                  <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
                </ButtonLink>
              </div>
              <ProductGrid products={products} />
            </>
          )}
        </div>
      </section>
    </>
  );
};
