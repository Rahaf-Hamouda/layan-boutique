import { Gem, HeartHandshake, Sparkles, Star } from 'lucide-react';
import { ButtonLink, PageHeader, Reveal, SectionHeading } from '@shared/ui';
import { NewsletterBand } from '@widgets/newsletter-band';
import { ROUTES, SITE } from '@shared/config/site';
import { usePageTitle } from '@shared/lib/hooks/use-page-title';
import { cn } from '@shared/lib/cn';
import styles from './AboutPage.module.css';

const values = [
  {
    icon: Gem,
    title: 'جودة تُختبر أولًا',
    text: 'نلمس القماش، نجرّب القصّة، ونسأل أنفسنا: هل ستبقى جميلة بعد سنوات؟ لا نختار إلا ما نُحبّ أن نرتديه.',
  },
  {
    icon: HeartHandshake,
    title: 'علاقة لا تنتهي بالطلب',
    text: 'فريق العناية يرافقكِ قبل الشراء وبعده. لأن رضاكِ جزء من القطعة، وليس إضافة عليها.',
  },
  {
    icon: Sparkles,
    title: 'تفاصيل تُصنع بحب',
    text: 'من التطريز إلى التغليف، كل لمسة تمرّ بيد تعرف معنى الإتقان، وتؤمن أن التفاصيل الصغيرة تصنع الحكاية.',
  },
];

const milestones = [
  {
    year: '2021',
    title: 'البداية',
    text: 'مجموعة صغيرة من العبايات والفساتين، أُطلقت من غرفة في الرياض.',
  },
  {
    year: '2022',
    title: 'أول بوتيك',
    text: 'افتتحنا مساحتنا الأولى في حي السليمانية، وبدأت الحكايات تتقاطع معنا.',
  },
  {
    year: '2024',
    title: 'عطور ومجوهرات',
    text: 'وسّعنا عوالم لَيان لنُكمل الإطلالة من أول لمسة حتى آخر تفصيل.',
  },
  {
    year: '2026',
    title: 'مجموعة «أُمسيات»',
    text: 'إصدار مسائي حصري، احتفاءً بالمرأة التي تحوّل كل مناسبة إلى ذكرى.',
  },
];

const stats = [
  { value: '+12K', label: 'عميلة تختار لَيان' },
  { value: '40', label: 'قطعة حصرية سنويًا' },
  { value: '4.9', label: 'متوسط تقييم العميلات' },
];

export const AboutPage = () => {
  usePageTitle('حكايتنا');

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'الرئيسية', to: ROUTES.home },
          { label: 'عن لَيان' },
        ]}
        eyebrow="عن لَيان"
        title="حكاية تُروى بالتفاصيل"
        description="من غرفة صغيرة في الرياض، إلى بوتيك يختار التفاصيل بعناية — هذه حكايتنا، وما زالت تُكتب."
        aside={
          <span className={styles.est}>
            <span className={styles.estLatin}>EST. {SITE.foundedYear}</span>
            <span className={styles.estCity}>الرياض</span>
          </span>
        }
      />

      <section className={styles.intro}>
        <div className={cn('container', styles.introGrid)}>
          <Reveal className={styles.visual}>
            <figure className={styles.arch}>
              <img
                src="/images/hero.jpg"
                alt="تفاصيل من إطلالات لَيان بألوان كريمية وذهبية دافئة"
                loading="lazy"
              />
            </figure>
            <div className={styles.ratingNote}>
              <Star size={16} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <strong>4.9 من 5</strong>
                <span>ثقة عميلاتنا</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className={styles.copy}>
            <span className="eyebrow">من الرياض، بحب</span>
            <h2 className={styles.title}>
              بدأت الحكاية بسؤال بسيط: لماذا لا تجد المرأة ما يُشبهها؟
            </h2>
            <p className={styles.paragraph}>
              في عام {SITE.foundedYear}، بدأت لَيان كمجموعة صغيرة اختيرت قطعةً قطعة،
              بفكرة أن الأناقة الحقيقية لا تحتاج ضجيجًا. كانت البداية في غرفة صغيرة
              بالرياض، وحلم بأن تجد كل امرأة قطعة تشعر فيها بنفسها.
            </p>
            <p className={styles.paragraph}>
              اليوم، أصبحت لَيان عوالم متكاملة من الفساتين والعبايات والحقائب والعطور
              والمجوهرات — لكن الجوهر لم يتغيّر: اختيار بعناية، حِرفية تدوم، ولمسة
              شخصية تُشبهكِ وحدكِ.
            </p>

            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <ButtonLink to={ROUTES.shop} className={styles.cta}>
              تسوّقي من مجموعتنا
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className={cn('section', 'section-alt')}>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="ما نؤمن به"
              title="ثلاثة مبادئ لا نتنازل عنها"
              description="القيم التي تُشكّل كل قطعة، وكل تفصيل، وكل رسالة تصلكِ منّا."
              align="center"
            />
          </Reveal>

          <div className={styles.values}>
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <article className={styles.valueCard}>
                  <span className={styles.valueIcon} aria-hidden="true">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueText}>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="محطات"
              title="حكاية تكبر معكِ"
              description="كل سنة أضافت فصلًا جديدًا، وكل فصل كان بفضلكِ."
            />
          </Reveal>

          <ol className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 70}>
                <li className={styles.milestone}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.year}>{milestone.year}</span>
                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                  <p className={styles.milestoneText}>{milestone.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className="container">
          <Reveal>
            <blockquote className={styles.quoteBand}>
              <span className={styles.quoteMark} aria-hidden="true">
                «
              </span>
              <p>
                لا نصنع ملابس فقط؛ نصنع لحظات تشعرين فيها أنكِ نسختكِ الأجمل.
              </p>
              <cite>ليان — المؤسِّسة والمديرة الإبداعية</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
};
