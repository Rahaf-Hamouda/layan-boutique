import { useState } from 'react';
import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion = ({ items, defaultOpenId, className }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn(styles.root, className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={cn(styles.item, isOpen && styles.open)}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
            >
              <span>{item.title}</span>
              <Plus size={17} strokeWidth={1.7} className={styles.icon} aria-hidden="true" />
            </button>
            <div className={styles.panel} id={`accordion-${item.id}`} role="region">
              <div className={styles.panelInner}>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
