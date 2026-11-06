import { useState } from 'react';
import type { FormEvent } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { notify } from '@shared/lib/toast';
import { cn } from '@shared/lib/cn';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const NewsletterForm = ({ variant = 'light', className }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('أدخلي بريدًا إلكترونيًا صحيحًا');
      return;
    }

    setError('');
    setStatus('loading');

    window.setTimeout(() => {
      setStatus('done');
      setEmail('');
      notify.success('أهلًا بكِ في عائلة لَيان', 'تفقّدي بريدك للحصول على كود الخصم');
    }, 700);
  };

  if (status === 'done') {
    return (
      <div className={cn(styles.root, styles[variant], styles.success, className)} role="status">
        <span className={styles.check}>
          <Check size={17} strokeWidth={2} />
        </span>
        <div>
          <p className={styles.successTitle}>تم الاشتراك بنجاح</p>
          <p className={styles.successText}>ستصلكِ رسالتنا الأولى مع كود خصم ١٥٪ قريبًا.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={cn(styles.root, styles[variant], className)}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.row}>
        <label className="u-visually-hidden" htmlFor={`newsletter-${variant}`}>
          البريد الإلكتروني
        </label>
        <input
          id={`newsletter-${variant}`}
          type="email"
          className={styles.input}
          placeholder="بريدك الإلكتروني"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError('');
          }}
          aria-invalid={Boolean(error)}
          autoComplete="email"
          dir="ltr"
        />
        <button type="submit" className={styles.button} disabled={status === 'loading'}>
          {status === 'loading' ? (
            <LoaderCircle size={16} className={styles.spinner} aria-hidden="true" />
          ) : null}
          اشتركي
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
