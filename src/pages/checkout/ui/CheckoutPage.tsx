import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  Check,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  User,
} from 'lucide-react';
import { calculatePricing, getCartCount, useCartStore } from '@entities/cart';
import {
  Button,
  ButtonLink,
  EmptyState,
  PageHeader,
  SelectField,
  TextField,
  TextareaField,
} from '@shared/ui';
import { CITIES, ROUTES, SITE } from '@shared/config/site';
import { formatNumber, formatPrice, pieceWord } from '@shared/lib/format';
import { notify } from '@shared/lib/toast';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import { cn } from '@shared/lib/cn';
import styles from './CheckoutPage.module.css';

type ShippingId = 'standard' | 'express';
type PaymentId = 'card' | 'applepay' | 'cod';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

interface PlacedOrder {
  number: string;
  firstName: string;
  email: string;
  city: string;
  total: number;
  itemsCount: number;
  paymentLabel: string;
  shippingLabel: string;
}

const initialForm: FormState = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  notes: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
};

const cityOptions = CITIES.map((city) => ({ value: city, label: city }));
const EXPRESS_FEE = 45;

const paymentLabels: Record<PaymentId, string> = {
  card: 'بطاقة بنكية',
  applepay: 'Apple Pay',
  cod: 'الدفع عند الاستلام',
};

export const CheckoutPage = () => {
  usePageTitle('إتمام الشراء');

  const items = useCartStore((state) => state.items);
  const promoCode = useCartStore((state) => state.promoCode);
  const clearCart = useCartStore((state) => state.clear);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shipping, setShipping] = useState<ShippingId>('standard');
  const [payment, setPayment] = useState<PaymentId>('card');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const count = getCartCount(items);
  const pricing = calculatePricing(items, promoCode);
  const shippingFee = shipping === 'express' ? EXPRESS_FEE : pricing.shipping;
  const codFee = payment === 'cod' ? SITE.codFee : 0;
  const total = pricing.subtotal - pricing.discount + shippingFee + codFee;

  const update = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    update('cardNumber', digits.replace(/(\d{4})(?=\d)/g, '$1 '));
  };

  const handleExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    update('cardExpiry', digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
  };

  const handleCvv = (value: string) => {
    update('cardCvv', value.replace(/\D/g, '').slice(0, 4));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (form.fullName.trim().length < 3) next.fullName = 'أدخلي الاسم الكامل';
    if (!/^(05|5)\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      next.phone = 'أدخلي رقم جوال سعودي صحيح يبدأ بـ 05';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'أدخلي بريدًا إلكترونيًا صحيحًا';
    }
    if (!form.city) next.city = 'اختاري مدينة التوصيل';
    if (form.address.trim().length < 10) {
      next.address = 'أدخلي عنوانًا واضحًا: الحي، الشارع، رقم المبنى';
    }

    if (payment === 'card') {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) {
        next.cardNumber = 'أدخلي رقم بطاقة صحيح من 16 رقمًا';
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry)) {
        next.cardExpiry = 'استخدمي الصيغة MM/YY';
      }
      if (!/^\d{3,4}$/.test(form.cardCvv)) {
        next.cardCvv = 'أدخلي رمزًا صحيحًا';
      }
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      notify.error('تحقّقي من البيانات', 'هناك حقول تحتاج تعديلًا قبل إتمام الطلب');
      window.setTimeout(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 60);
      return;
    }

    setStatus('submitting');

    window.setTimeout(() => {
      const placed: PlacedOrder = {
        number: `LY-${Math.floor(10000 + Math.random() * 90000)}`,
        firstName: form.fullName.trim().split(/\s+/)[0],
        email: form.email.trim(),
        city: form.city,
        total,
        itemsCount: count,
        paymentLabel: paymentLabels[payment],
        shippingLabel: shipping === 'express' ? 'شحن سريع — 24 ساعة' : 'شحن قياسي — 2–4 أيام',
      };

      setOrder(placed);
      setStatus('done');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      notify.success('تم استلام طلبكِ', `رقم الطلب ${placed.number}`);
    }, 1400);
  };

  if (status === 'done' && order) {
    return (
      <section className={styles.successSection}>
        <div className={cn('container', styles.successWrap)}>
          <div className={styles.successCard}>
            <span className={styles.successIcon} aria-hidden="true">
              <Check size={34} strokeWidth={1.8} />
            </span>
            <span className={styles.successEyebrow}>تم استلام طلبكِ بنجاح</span>
            <h1 className={styles.successTitle}>شكرًا لكِ، {order.firstName}</h1>
            <p className={styles.successText}>
              اخترنا لكِ {formatNumber(order.itemsCount)} {pieceWord(order.itemsCount)} بعناية، وبدأنا بتحضيرها بلمسة
              لَيان. سيصلكِ بريد التأكيد خلال دقائق.
            </p>

            <div className={styles.orderNumber}>
              <span>رقم الطلب</span>
              <strong dir="ltr">{order.number}</strong>
            </div>

            <dl className={styles.successMeta}>
              <div>
                <dt>الإجمالي</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
              <div>
                <dt>مدينة التوصيل</dt>
                <dd>{order.city}</dd>
              </div>
              <div>
                <dt>طريقة الدفع</dt>
                <dd>{order.paymentLabel}</dd>
              </div>
              <div>
                <dt>موعد التوصيل المتوقع</dt>
                <dd>{order.shippingLabel}</dd>
              </div>
            </dl>

            <div className={styles.successActions}>
              <ButtonLink to={ROUTES.shop}>متابعة التسوّق</ButtonLink>
              <ButtonLink to={ROUTES.home} variant="outline">
                العودة للرئيسية
              </ButtonLink>
            </div>

            <p className={styles.successNote}>
              <Mail size={13} strokeWidth={1.7} aria-hidden="true" />
              أرسلنا تفاصيل الطلب إلى {order.email}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className={styles.emptySection}>
        <div className="container">
          <EmptyState
            icon={<ShoppingBag size={30} strokeWidth={1.4} />}
            title="لا يمكن إتمام الشراء"
            description="حقيبتكِ فارغة الآن. اختاري قطعكِ المفضلة أولًا، ثم عودي لإتمام الطلب."
            action={<ButtonLink to={ROUTES.shop}>اكتشفي القطع</ButtonLink>}
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'الرئيسية', to: ROUTES.home },
          { label: 'حقيبة التسوق', to: ROUTES.cart },
          { label: 'إتمام الشراء' },
        ]}
        eyebrow="خطوة واحدة تفصلكِ"
        title="إتمام الشراء"
        description="أدخلي بياناتكِ وسنعتني بالباقي — تغليف أنيق، وتوصيل يليق بكِ."
        aside={
          <span className={styles.headerNote}>
            <ShieldCheck size={15} strokeWidth={1.7} aria-hidden="true" />
            دفع آمن ومشفّر
          </span>
        }
      />

      <section className={styles.section}>
        <form
          className={cn('container', styles.layout)}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.formCol}>
            <section className={styles.card}>
              <header className={styles.cardHead}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <User size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <h2>بيانات الشحن</h2>
                  <p>سنستخدمها للتواصل معكِ وتوصيل طلبكِ بأمان.</p>
                </div>
              </header>

              <div className={styles.fields}>
                <TextField
                  label="الاسم الكامل"
                  placeholder="مثال: نورة العبدالله"
                  value={form.fullName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    update('fullName', event.target.value)
                  }
                  error={errors.fullName}
                  autoComplete="name"
                />
                <TextField
                  label="رقم الجوال"
                  placeholder="05XXXXXXXX"
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  error={errors.phone}
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  autoComplete="tel"
                />
                <TextField
                  label="البريد الإلكتروني"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  error={errors.email}
                  type="email"
                  inputMode="email"
                  dir="ltr"
                  autoComplete="email"
                  className={styles.fullField}
                />
                <SelectField
                  label="المدينة"
                  options={cityOptions}
                  placeholder="اختاري المدينة"
                  value={form.city}
                  onChange={(event) => update('city', event.target.value)}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <TextField
                  label="العنوان"
                  placeholder="الحي، الشارع، رقم المبنى"
                  value={form.address}
                  onChange={(event) => update('address', event.target.value)}
                  error={errors.address}
                  autoComplete="street-address"
                  className={styles.fullField}
                />
                <TextareaField
                  label="ملاحظات التوصيل (اختياري)"
                  placeholder="أي تفاصيل تساعد المندوب — الطابق، الوقت المناسب، أو رسالة إهداء."
                  value={form.notes}
                  onChange={(event) => update('notes', event.target.value)}
                  rows={3}
                  className={styles.fullField}
                />
              </div>
            </section>

            <section className={styles.card}>
              <header className={styles.cardHead}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Truck size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <h2>طريقة الشحن</h2>
                  <p>نوصّل لجميع مدن المملكة بعناية تغليف لَيان.</p>
                </div>
              </header>

              <div className={styles.options}>
                <label
                  className={cn(styles.option, shipping === 'standard' && styles.optionActive)}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shipping === 'standard'}
                    onChange={() => setShipping('standard')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioDot} aria-hidden="true" />
                  <span className={styles.optionText}>
                    <strong>الشحن القياسي</strong>
                    <span>2–4 أيام عمل داخل المملكة</span>
                  </span>
                  <span
                    className={cn(styles.optionPrice, pricing.shipping === 0 && styles.freeOption)}
                  >
                    {pricing.shipping === 0 ? 'مجاني' : formatPrice(pricing.shipping)}
                  </span>
                </label>

                <label
                  className={cn(styles.option, shipping === 'express' && styles.optionActive)}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shipping === 'express'}
                    onChange={() => setShipping('express')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioDot} aria-hidden="true" />
                  <span className={styles.optionText}>
                    <strong>الشحن السريع</strong>
                    <span>خلال 24 ساعة داخل الرياض</span>
                  </span>
                  <span className={styles.optionPrice}>{formatPrice(EXPRESS_FEE)}</span>
                </label>
              </div>
            </section>

            <section className={styles.card}>
              <header className={styles.cardHead}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <CreditCard size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <h2>طريقة الدفع</h2>
                  <p>كل المعاملات مشفّرة، ولا نحتفظ ببيانات بطاقتكِ.</p>
                </div>
              </header>

              <div className={styles.paymentOptions}>
                <label className={cn(styles.payOption, payment === 'card' && styles.optionActive)}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === 'card'}
                    onChange={() => setPayment('card')}
                    className={styles.radioInput}
                  />
                  <span className={styles.payIcon} aria-hidden="true">
                    <CreditCard size={17} strokeWidth={1.6} />
                  </span>
                  <span className={styles.optionText}>
                    <strong>بطاقة مدى / فيزا / ماستركارد</strong>
                    <span>دفع فوري آمن</span>
                  </span>
                  <span className={styles.radioDot} aria-hidden="true" />
                </label>

                <label
                  className={cn(styles.payOption, payment === 'applepay' && styles.optionActive)}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="applepay"
                    checked={payment === 'applepay'}
                    onChange={() => setPayment('applepay')}
                    className={styles.radioInput}
                  />
                  <span className={styles.payIcon} aria-hidden="true">
                    <Smartphone size={17} strokeWidth={1.6} />
                  </span>
                  <span className={styles.optionText}>
                    <strong>Apple Pay</strong>
                    <span>ادفعي بلمسة واحدة عبر جهازك</span>
                  </span>
                  <span className={styles.radioDot} aria-hidden="true" />
                </label>

                <label className={cn(styles.payOption, payment === 'cod' && styles.optionActive)}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                    className={styles.radioInput}
                  />
                  <span className={styles.payIcon} aria-hidden="true">
                    <Banknote size={17} strokeWidth={1.6} />
                  </span>
                  <span className={styles.optionText}>
                    <strong>الدفع عند الاستلام</strong>
                    <span>ادفعي نقدًا أو بالشبكة عند وصول طلبكِ</span>
                  </span>
                  <span className={styles.optionPrice}>+ {formatPrice(SITE.codFee)}</span>
                </label>
              </div>

              {payment === 'card' && (
                <div className={cn(styles.fields, styles.cardFields)}>
                  <TextField
                    label="رقم البطاقة"
                    placeholder="0000 0000 0000 0000"
                    value={form.cardNumber}
                    onChange={(event) => handleCardNumber(event.target.value)}
                    error={errors.cardNumber}
                    inputMode="numeric"
                    dir="ltr"
                    autoComplete="cc-number"
                    maxLength={19}
                    className={styles.fullField}
                  />
                  <TextField
                    label="تاريخ الانتهاء"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={(event) => handleExpiry(event.target.value)}
                    error={errors.cardExpiry}
                    inputMode="numeric"
                    dir="ltr"
                    autoComplete="cc-exp"
                    maxLength={5}
                  />
                  <TextField
                    label="رمز التحقق CVV"
                    placeholder="123"
                    value={form.cardCvv}
                    onChange={(event) => handleCvv(event.target.value)}
                    error={errors.cardCvv}
                    inputMode="numeric"
                    dir="ltr"
                    autoComplete="cc-csc"
                    maxLength={4}
                  />
                </div>
              )}

              {payment === 'applepay' && (
                <p className={styles.paymentNote}>
                  سيُطلب منكِ تأكيد الدفع عبر Apple Pay بعد الضغط على «تأكيد الطلب».
                </p>
              )}
            </section>

            <p className={styles.terms}>
              بالمتابعة، أنتِ توافقين على <Link to={ROUTES.about}>الشروط والأحكام</Link> وسياسة
              الخصوصية الخاصة بـ {SITE.name}.
            </p>
          </div>

          <aside className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHead}>
                <h2>طلبكِ ({formatNumber(count)})</h2>
                <Link to={ROUTES.cart}>تعديل الحقيبة</Link>
              </div>

              <ul className={styles.miniItems}>
                {items.map((line) => (
                  <li key={line.key}>
                    <img src={line.image} alt="" loading="lazy" />
                    <span className={styles.miniInfo}>
                      <strong>{line.name}</strong>
                      <span>
                        {line.size ? `مقاس ${line.size} · ` : ''}الكمية {line.qty}
                      </span>
                    </span>
                    <span className={styles.miniPrice}>
                      {formatPrice(line.price * line.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.rows}>
                <div className={styles.row}>
                  <span>المجموع الفرعي</span>
                  <span>{formatPrice(pricing.subtotal)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className={cn(styles.row, styles.discount)}>
                    <span>الخصم {promoCode ? `(${promoCode})` : ''}</span>
                    <span>− {formatPrice(pricing.discount)}</span>
                  </div>
                )}
                <div className={styles.row}>
                  <span>الشحن</span>
                  <span className={shippingFee === 0 ? styles.free : undefined}>
                    {shippingFee === 0 ? 'مجاني' : formatPrice(shippingFee)}
                  </span>
                </div>
                {codFee > 0 && (
                  <div className={styles.row}>
                    <span>رسوم الدفع عند الاستلام</span>
                    <span>{formatPrice(codFee)}</span>
                  </div>
                )}
              </div>

              <div className={styles.totalRow}>
                <span>الإجمالي</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                type="submit"
                size="lg"
                full
                disabled={status === 'submitting'}
                className={styles.submit}
              >
                {status === 'submitting' ? (
                  <>
                    <LoaderCircle size={17} className={styles.spinner} aria-hidden="true" />
                    جارٍ إتمام الطلب...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
                    تأكيد الطلب · {formatPrice(total)}
                  </>
                )}
              </Button>

              <p className={styles.taxNote}>
                <MapPin size={12} strokeWidth={1.7} aria-hidden="true" />
                {SITE.vatNote}
              </p>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
};
