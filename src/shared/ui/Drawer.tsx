import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { useBodyLock } from '@shared/lib/hooks/use-body-lock';
import { IconButton } from './IconButton';
import styles from './Drawer.module.css';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: 'start' | 'end';
  width?: number;
  children: ReactNode;
  footer?: ReactNode;
}

export const Drawer = ({
  open,
  onClose,
  title,
  side = 'end',
  width = 440,
  children,
  footer,
}: DrawerProps) => {
  useBodyLock(open);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return createPortal(
    <div
      className={cn(styles.layer, styles[side], open && styles.open)}
      aria-hidden={!open}
    >
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'لوحة جانبية'}
        style={{ '--panel-width': `${width}px` } as CSSProperties}
      >
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <IconButton ref={closeRef} label="إغلاق" onClick={onClose} className={styles.close}>
            <X size={19} strokeWidth={1.6} />
          </IconButton>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </aside>
    </div>,
    document.body,
  );
};
