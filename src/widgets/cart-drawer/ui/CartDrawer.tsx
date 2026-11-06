import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { calculatePricing, CartLineItem, getCartCount, useCartStore } from '@entities/cart';
import { ButtonLink, Drawer, EmptyState, Price } from '@shared/ui';
import { ROUTES, SITE } from '@shared/config/site';
import { formatNumber, formatPrice } from '@shared/lib/format';
import { cn } from '@shared/lib/cn';
import styles from './CartDrawer.module.css';

export const CartDrawer = () => {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const promoCode = useCartStore((state) => state.promoCode);
  const closeCart = useCartStore((state) => state.closeCart);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);

  const count = getCartCount(items);
  const pricing = calculatePricing(items, promoCode);
  const progress = Math.min(
    100,
    Math.round((pricing.subtotal / SITE.freeShippingThreshold) * 100),
  );

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a')) closeCart();
  };

  const footer =
    items.length > 0 ? (
      <div className={styles.summary}>
        <div className={styles.row}>
          <span>المجموع الفرعي</span>
          <Price value={pricing.subtotal} size="sm" />
        </div>
        {pricing.discount > 0 && (
          <div className={cn(styles.row, styles.discount)}>
            <span>خصم ({promoCode})</span>
            <span>− {formatPrice(pricing.discount)}</span>
          </div>
        )}
        <div className={cn(styles.row, styles.shipping)}>
          <span>الشحن</span>
          <span>{pricing.shipping === 0 ? 'مجاني' : formatPrice(pricing.shipping)}</span>
        </div>
        <div className={styles.totalRow}>
          <span>الإجمالي</span>
          <span>{formatPrice(pricing.total)}</span>
        </div>
        <ButtonLink to={ROUTES.checkout} full onClick={closeCart}>
          إتمام الشراء
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
        </ButtonLink>
        <ButtonLink to={ROUTES.cart} variant="outline" full onClick={closeCart}>
          عرض الحقيبة
        </ButtonLink>
        <p className={styles.note}>الأسعار تشمل ضريبة القيمة المضافة</p>
      </div>
    ) : undefined;

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={count > 0 ? `حقيبة التسوق (${formatNumber(count)})` : 'حقيبة التسوق'}
      width={452}
      footer={footer}
    >
      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={30} strokeWidth={1.4} />}
          title="حقيبتكِ تنتظر أول قطعة"
          description="اختاري ما يشبهكِ من مجموعتنا، ودعي التفاصيل تتحدث عنكِ."
          action={
            <ButtonLink to={ROUTES.shop} onClick={closeCart}>
              اكتشفي القطع
            </ButtonLink>
          }
        />
      ) : (
        <div className={styles.content} onClick={handleContentClick}>
          <div
            className={cn(styles.progressCard, pricing.freeShippingRemaining === 0 && styles.progressDone)}
          >
            <div className={styles.progressHead}>
              {pricing.freeShippingRemaining === 0 ? (
                <Sparkles size={16} strokeWidth={1.7} aria-hidden="true" />
              ) : (
                <Truck size={16} strokeWidth={1.7} aria-hidden="true" />
              )}
              <p>
                {pricing.freeShippingRemaining === 0 ? (
                  'رائع، طلبكِ مؤهّل للشحن المجاني'
                ) : (
                  <>
                    أضيفي قطعًا بقيمة{' '}
                    <b>{formatPrice(pricing.freeShippingRemaining)}</b> لتحصلي على شحن مجاني
                  </>
                )}
              </p>
            </div>
            <div
              className={styles.track}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="تقدّم الشحن المجاني"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className={styles.items}>
            {items.map((line) => (
              <CartLineItem
                key={line.key}
                line={line}
                onQtyChange={(qty) => setQty(line.key, qty)}
                onRemove={() => remove(line.key)}
              />
            ))}
          </div>

          <Link to={ROUTES.cart} className={styles.continue} onClick={closeCart}>
            متابعة التسوّق
            <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      )}
    </Drawer>
  );
};
