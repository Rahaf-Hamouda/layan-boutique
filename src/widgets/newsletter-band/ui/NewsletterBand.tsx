import { Check, Mail } from 'lucide-react';
import { NewsletterForm } from '@features/newsletter-subscribe';
import { Reveal } from '@shared/ui';
import { cn } from '@shared/lib/cn';
import styles from './NewsletterBand.module.css';

const perks = ['وصول مبكر للمجموعات', 'خصم ١٥٪ على أول طلب', 'دعوات وهدايا حصرية'];

export const NewsletterBand = () => (
  <section className={cn('section', styles.root)}>
    <div className="container">
      <Reveal>
        <div className={styles.band}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>
              <Mail size={14} strokeWidth={1.6} aria-hidden="true" />
              رسائل لَيان
            </span>
            <h2 className={styles.title}>كوني أول من يعلم</h2>
            <p className={styles.text}>
              مجموعة كل شهر، قصص من الأتيليه، وخصومات لا نشاركها إلا مع صديقات
              لَيان. رسالة واحدة، بلا إزعاج.
            </p>
            <ul className={styles.perks}>
              {perks.map((perk) => (
                <li key={perk}>
                  <Check size={13} strokeWidth={2.2} aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.formSide}>
            <span className={styles.formLatin}>THE LAYAN LETTER</span>
            <NewsletterForm variant="dark" />
            <p className={styles.note}>
              عند اشتراككِ يصلكِ كود <b dir="ltr">WELCOME15</b> مباشرة إلى بريدكِ.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
