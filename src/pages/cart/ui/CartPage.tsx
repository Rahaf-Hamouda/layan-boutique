import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  X,
} from 'lucide-react';
import { calculatePricing, CartLineItem, getCartCount, useCartStore } from '@entities/cart';
import { Button, ButtonLink, EmptyState, PageHeader } from '@shared/ui';
import { PROMO_CODES, ROUTES, SITE } from '@shared/config/site';
import { formatNumber, formatPrice, pieceWord } from '@shared/lib/format';
import { notify } from '@shared/lib/toast';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import { cn } from '@shared/lib/cn';
import styles from './CartPage.module.css';

export const CartPage = () => {
  usePageTitle('حقيبة التسوق');

  const items = useCartStore((state) => state.items);
  const promoCode = useCartStore((state) => state.promoCode);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const removePromo = useCartStore((state) => state.removePromo);

  const [code, setCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const count = getCartCount(items);
  const pricing = calculatePricing(items, promoCode);
  const progress = Math.min(100, Math.round((pricing.subtotal / SITE.freeShippingThreshold) * 100));
  const appliedPromo = promoCode ? PROMO_CODES[promoCode] : undefined;

  const handlePromo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = code.trim();

    if (!value) {
      setPromoError('أدخلي كود الخصم أولًا');
      return;
    }

    const result = applyPromo(value);

    if (result === 'invalid') {
      setPromoError('هذا الكود غير صالح أو انتهت صلاحيته');
      return;
    }

    if (result === 'exists') {
      setPromoError('هذا الكود مطبّق بالفعل على طلبكِ');
      return;
    }

    setPromoError('');
    setCode('');
    notify.success('تم تطبيق كود الخصم', PROMO_CODES[value.toUpperCase()]?.label);
  };

  const handleRemovePromo = () => {
    removePromo();
    notify.info('أُزيل كود الخصم', 'يمكنكِ إضافته مرة أخرى في أي وقت');
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'الرئيسية', to: ROUTES.home },
          { label: 'المتجر', to: ROUTES.shop },
          { label: 'حقيبة التسوق' },
        ]}
        eyebrow="حقيبتكِ"
        title="حقيبة التسوق"
        description={
          items.length > 0
            ? `${formatNumber(count)} ${pieceWord(count)} مختارة بعناية — خطوة واحدة تفصلكِ عن إتمام الطلب.`
            : 'حقيبتكِ فارغة الآن، وبداية إطلالتكِ القادمة على بُعد نقرة.'
        }
      />

      <section className={styles.section}>
        <div className={cn('container', items.length > 0 ? styles.layout : undefined)}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <EmptyState
                icon={<ShoppingBag size={30} strokeWidth={1.4} />}
                title="حقيبتكِ تنتظر أول قطعة"
                description="اختاري ما يشبهكِ من مجموعتنا، ودعي التفاصيل تتحدث عنكِ."
                action={<ButtonLink to={ROUTES.shop}>اكتشفي القطع</ButtonLink>}
              />
            </div>
          ) : (
            <>
              <div className={styles.itemsPanel}>
                <div className={styles.itemsHead}>
                  <h2>
                    القطع <span>({formatNumber(count)})</span>
                  </h2>
                  <Link to={ROUTES.shop} className={styles.continue}>
                    متابعة التسوّق
                    <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
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

                <div
                  className={cn(
                    styles.shippingBanner,
                    pricing.freeShippingRemaining === 0 && styles.shippingDone,
                  )}
                >
                  <div className={styles.shippingHead}>
                    <Truck size={16} strokeWidth={1.6} aria-hidden="true" />
                    <p>
                      {pricing.freeShippingRemaining === 0 ? (
                        'رائع، طلبكِ مؤهّل للشحن المجاني'
                      ) : (
                        <>
                          أضيفي قطعًا بقيمة{' '}
                          <b>{formatPrice(pricing.freeShippingRemaining)}</b> لتحصلي على شحن
                          مجاني
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
              </div>

              <aside className={styles.summaryCol}>
                <div className={styles.summaryCard}>
                  <h2 className={styles.summaryTitle}>ملخص الطلب</h2>

                  {appliedPromo && promoCode ? (
                    <div className={styles.promoApplied}>
                      <Tag size={15} strokeWidth={1.7} aria-hidden="true" />
                      <div className={styles.promoAppliedText}>
                        <b dir="ltr">{promoCode}</b>
                        <span>{appliedPromo.label}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        aria-label="إزالة كود الخصم"
                      >
                        <X size={14} strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <form className={styles.promoForm} onSubmit={handlePromo}>
                      <label htmlFor="promo-code">كود الخصم</label>
                      <div className={styles.promoRow}>
                        <div className={styles.promoInputWrap}>
                          <Tag size={14} strokeWidth={1.7} aria-hidden="true" />
                          <input
                            id="promo-code"
                            value={code}
                            onChange={(event) => {
                              setCode(event.target.value);
                              if (promoError) setPromoError('');
                            }}
                            placeholder="أدخلي الكود"
                            dir="ltr"
                            autoComplete="off"
                            aria-invalid={Boolean(promoError)}
                            aria-describedby={promoError ? 'promo-error' : 'promo-hint'}
                          />
                        </div>
                        <Button type="submit" variant="outline" size="sm">
                          تطبيق
                        </Button>
                      </div>
                      {promoError ? (
                        <p id="promo-error" className={styles.promoError}>
                          {promoError}
                        </p>
                      ) : (
                        <p id="promo-hint" className={styles.promoHint}>
                          جرّبي <b dir="ltr">WELCOME15</b> لخصم ١٥٪ على أول طلب
                        </p>
                      )}
                    </form>
                  )}

                  <div className={styles.rows}>
                    <div className={styles.row}>
                      <span>المجموع الفرعي</span>
                      <span>{formatPrice(pricing.subtotal)}</span>
                    </div>
                    {pricing.discount > 0 && (
                      <div className={cn(styles.row, styles.discount)}>
                        <span>الخصم</span>
                        <span>− {formatPrice(pricing.discount)}</span>
                      </div>
                    )}
                    <div className={styles.row}>
                      <span>الشحن</span>
                      <span className={pricing.shipping === 0 ? styles.free : undefined}>
                        {pricing.shipping === 0 ? 'مجاني' : formatPrice(pricing.shipping)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.totalRow}>
                    <span>الإجمالي</span>
                    <span>{formatPrice(pricing.total)}</span>
                  </div>

                  <ButtonLink to={ROUTES.checkout} size="lg" full>
                    إتمام الشراء
                    <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
                  </ButtonLink>

                  <p className={styles.taxNote}>{SITE.vatNote}</p>

                  <ul className={styles.trust}>
                    <li>
                      <ShieldCheck size={13} strokeWidth={1.7} aria-hidden="true" />
                      دفع آمن
                    </li>
                    <li>
                      <Truck size={13} strokeWidth={1.7} aria-hidden="true" />
                      شحن سريع
                    </li>
                    <li>
                      <RotateCcw size={13} strokeWidth={1.7} aria-hidden="true" />
                      إرجاع سهل
                    </li>
                  </ul>
                </div>
              </aside>
            </>
          )}
        </div>
      </section>
    </>
  );
};
