import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useToastStore } from '@shared/lib/toast';
import type { ToastTone } from '@shared/lib/toast';
import { cn } from '@shared/lib/cn';
import styles from './ToastViewport.module.css';

const icons = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
} satisfies Record<ToastTone, typeof Info>;

export const ToastViewport = () => {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  return createPortal(
    <div className={styles.viewport} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const Icon = icons[toast.tone];
        return (
          <div key={toast.id} className={cn(styles.toast, styles[toast.tone])}>
            <span className={styles.icon}>
              <Icon size={17} strokeWidth={1.8} />
            </span>
            <div className={styles.text}>
              <p className={styles.title}>{toast.title}</p>
              {toast.description && <p className={styles.description}>{toast.description}</p>}
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => dismiss(toast.id)}
              aria-label="إغلاق التنبيه"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );
};
