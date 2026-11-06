import { BadgeCheck, Quote } from 'lucide-react';
import { RatingStars, Reveal, SectionHeading } from '@shared/ui';
import { cn } from '@shared/lib/cn';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 't-noura',
    name: 'نورة العبدالله',
    city: 'الرياض',
    piece: 'فستان «ياسمين»',
    rating: 5,
    quote:
      'الفستان وصلني أجمل من الصور. القماش ثقيل بذوق، والقصة تداري وتُبرز في الوقت نفسه. شعرت أن القطعة صُمّمت لي وحدي.',
  },
  {
    id: 't-sara',
    name: 'سارة الحربي',
    city: 'جدة',
    piece: 'عطر «فجر»',
    rating: 5,
    quote:
      'التغليف وحده حكاية — كأنني أفتح هدية من شخص يعرفني. العطر هادئ وثابت، وأصبح توقيعي اليومي.',
  },
  {
    id: 't-reem',
    name: 'ريم القحطاني',
    city: 'الدمام',
    piece: 'حقيبة «لين»',
    rating: 5,
    quote:
      'أول تجربة شراء كانت سلسة لدرجة أنني طلبت قطعتين بعدها. الاهتمام بالتفاصيل واضح في كل خطوة، من الطلب حتى الاستلام.',
  },
];

export const Testimonials = () => (
  <section className={cn('section', styles.root)}>
    <div className="container">
      <Reveal>
        <SectionHeading
          eyebrow="همسات العميلات"
          title="قالوا عن لَيان"
          description="ثقة تُبنى قطعة بعد قطعة، وحكايات تصلنا كل يوم."
          align="center"
        />
      </Reveal>

      <Reveal delay={80}>
        <div className={styles.rating}>
          <RatingStars value={4.9} size={15} />
          <span>من أكثر من 340 تقييمًا موثّقًا</span>
        </div>
      </Reveal>

      <div className={styles.grid}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={120 + index * 80}>
            <article className={styles.card}>
              <span className={styles.quoteIcon} aria-hidden="true">
                <Quote size={22} strokeWidth={1.4} />
              </span>
              <RatingStars value={testimonial.rating} size={12} />
              <p className={styles.quote}>{testimonial.quote}</p>
              <footer className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {testimonial.name.charAt(0)}
                </span>
                <span className={styles.authorInfo}>
                  <span className={styles.name}>
                    {testimonial.name}
                    <BadgeCheck size={14} strokeWidth={1.8} className={styles.verified} aria-label="شراء موثّق" />
                  </span>
                  <span className={styles.meta}>
                    {testimonial.city} · {testimonial.piece}
                  </span>
                </span>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
