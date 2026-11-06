import { ArrowLeft, Gem, HeartHandshake, Sparkles } from 'lucide-react';
import { ButtonLink, Reveal, SectionHeading } from '@shared/ui';
import { ROUTES, SITE } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import styles from './BrandStory.module.css';

const values = [
  {
    icon: Gem,
    title: 'اختيار بعناية',
    text: 'كل قطعة تمرّ بعين خبيرة قبل أن تصل إليكِ.',
  },
  {
    icon: HeartHandshake,
    title: 'حِرفية تدوم',
    text: 'خامات مختارة وخياطة تُقاوم الزمن.',
  },
  {
    icon: Sparkles,
    title: 'لمسة شخصية',
    text: 'تفاصيل تُضيف إليكِ، لا تغيّر منكِ.',
  },
];

export const BrandStory = () => (
  <section className={cn('section', styles.root)}>
    <div className="container">
      <div className={styles.inner}>
        <Reveal className={styles.visual}>
          <figure className={styles.arch}>
            <img
              src="/images/lifestyle.jpg"
              alt="لمسة من أجواء بوتيك لَيان وتفاصيل الأقمشة الفاخرة"
              loading="lazy"
            />
          </figure>

          <div className={styles.seal} aria-hidden="true">
            <span className={styles.sealLatin}>EST.</span>
            <span className={styles.sealYear}>{SITE.foundedYear}</span>
            <span className={styles.sealCity}>الرياض</span>
          </div>

          <blockquote className={styles.quote}>
            <p>«الأناقة ليست ما ترتدينه، بل كيف تشعرين فيه.»</p>
            <cite>— ليان، المؤسِّسة</cite>
          </blockquote>
        </Reveal>

        <Reveal delay={120} className={styles.copy}>
          <SectionHeading
            eyebrow="حكايتنا"
            title="وُلدت لَيان من شغفٍ بالتفاصيل التي تُشبهكِ"
            as="h2"
          />
          <p className={styles.paragraph}>
            بدأت الحكاية عام {SITE.foundedYear} بغرفة صغيرة في الرياض، وبفكرة بسيطة:
            أن تجد المرأة قطعة تشعر فيها بنفسها، لا بغيرها. اليوم أصبحت لَيان وجهة
            لمن تبحث عن أناقة هادئة، وتفاصيل تُروى ولا تُنسى.
          </p>
          <p className={styles.paragraph}>
            نختار كل قطعة بعناية، ونرافقها من لحظة التصميم حتى تغليفها بلمسة
            ذهبية — لأن التفاصيل الصغيرة هي ما يصنع الفرق.
          </p>

          <ul className={styles.values}>
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className={styles.value}>
                <span className={styles.valueIcon} aria-hidden="true">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <span className={styles.valueText}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <div className={styles.signature}>
              <span className={styles.signatureName}>ليان</span>
              <span className={styles.signatureRole}>المؤسِّسة والمديرة الإبداعية</span>
            </div>
            <ButtonLink to={ROUTES.about} variant="ghost" size="sm">
              اقرئي الحكاية كاملة
              <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
