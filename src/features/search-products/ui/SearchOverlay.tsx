import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { getCategories, getCategoryLabel, searchProducts } from '@entities/product';
import { IconButton, Price } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { useBodyLock } from '@shared/lib/hooks/use-body-lock';
import { cn } from '@shared/lib/cn';
import styles from './SearchOverlay.module.css';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = ['فستان', 'عباية', 'عطر', 'حقيبة', 'سوار'];

export const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  useBodyLock(open);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim() ? searchProducts(query) : [];
  const categories = getCategories().slice(0, 4);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`${ROUTES.shop}?q=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  return createPortal(
    <div className={cn(styles.layer, open && styles.open)} aria-hidden={!open}>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="البحث في المتجر">
        <div className={styles.inner}>
          <div className={styles.top}>
            <span className={styles.eyebrow}>ابحثي في لَيان</span>
            <IconButton label="إغلاق البحث" onClick={onClose}>
              <X size={20} strokeWidth={1.6} />
            </IconButton>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} role="search">
            <Search size={22} strokeWidth={1.6} className={styles.searchIcon} aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="فستان، عطر، حقيبة..."
              aria-label="ابحثي عن منتج"
            />
            {query && (
              <button
                type="button"
                className={styles.clearQuery}
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                aria-label="مسح البحث"
              >
                <X size={15} />
              </button>
            )}
          </form>

          {query.trim() ? (
            <div className={styles.results}>
              {results.length > 0 ? (
                <>
                  <p className={styles.resultsLabel}>
                    {results.length} {results.length === 1 ? 'نتيجة' : 'نتائج'}
                  </p>
                  <ul className={styles.list}>
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={ROUTES.product(product.slug)}
                          className={styles.result}
                          onClick={onClose}
                        >
                          <span className={styles.thumb}>
                            <img src={product.image} alt="" loading="lazy" />
                          </span>
                          <span className={styles.resultInfo}>
                            <span className={styles.resultName}>{product.name}</span>
                            <span className={styles.resultCategory}>
                              {getCategoryLabel(product.category)}
                            </span>
                          </span>
                          <Price value={product.price} size="sm" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`${ROUTES.shop}?q=${encodeURIComponent(query.trim())}`}
                    className={styles.allResults}
                    onClick={onClose}
                  >
                    عرض كل النتائج
                    <ArrowLeft size={15} strokeWidth={1.8} />
                  </Link>
                </>
              ) : (
                <div className={styles.empty}>
                  <p>لا توجد نتائج لـ «{query.trim()}»</p>
                  <span>جرّبي كلمة أخرى، أو تصفّحي الأقسام المقترحة.</span>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.suggestions}>
              <div>
                <p className={styles.suggestLabel}>الأكثر بحثًا</p>
                <div className={styles.chips}>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={styles.chip}
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className={styles.suggestLabel}>تصفّحي الأقسام</p>
                <ul className={styles.categories}>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`${ROUTES.shop}?category=${category.id}`}
                        onClick={onClose}
                      >
                        {category.label}
                        <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
