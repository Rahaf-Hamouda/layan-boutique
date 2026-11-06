import { Gift, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import styles from './ServiceHighlights.module.css';

const items = [
  {
    icon: Truck,
    title: 'شحن سريع ومجاني',
    text: 'للطلبات فوق 300 ر.س',
  },
  {
    icon: RotateCcw,
    title: 'إرجاع بلا تعقيد',
    text: 'خلال 14 يومًا من الاستلام',
  },
  {
    icon: Gift,
    title: 'تغليف هدايا فاخر',
    text: 'بلمسة من الذهب والحرير',
  },
  {
    icon: ShieldCheck,
    title: 'دفع آمن تمامًا',
    text: 'مدى، فيزا، وأبل باي',
  },
];

export const ServiceHighlights = () => (
  <section className={styles.root} aria-label="مزايا التسوّق مع لَيان">
    <div className={cn('container', styles.grid)}>
      {items.map(({ icon: Icon, title, text }) => (
        <div className={styles.item} key={title}>
          <span className={styles.icon} aria-hidden="true">
            <Icon size={19} strokeWidth={1.5} />
          </span>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.caption}>{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
