import { getCategories, products } from '@entities/product';
import { cn } from '@shared/lib/cn';
import { formatNumber } from '@shared/lib/format';
import { PRICE_RANGES } from '../model/use-product-filters';
import type { ProductFiltersController } from '../model/use-product-filters';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  controller: ProductFiltersController;
  className?: string;
  hideHeading?: boolean;
}

export const FilterSidebar = ({ controller, className, hideHeading = false }: FilterSidebarProps) => {
  const { filters, availableSizes, activeCount, setCategory, toggleSize, setPrice, reset } =
    controller;
  const categories = getCategories();

  return (
    <aside className={cn(styles.root, className)} aria-label="تصفية المنتجات">
      {!hideHeading && (
        <div className={styles.head}>
          <h2 className={styles.heading}>تصفية</h2>
          {activeCount > 0 && (
            <button type="button" className={styles.clear} onClick={reset}>
              مسح الكل
            </button>
          )}
        </div>
      )}

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>الأقسام</h3>
        <ul className={styles.list}>
          <li>
            <button
              type="button"
              className={cn(styles.option, filters.category === 'all' && styles.active)}
              onClick={() => setCategory('all')}
            >
              <span>كل القطع</span>
              <span className={styles.count}>{formatNumber(products.length)}</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                className={cn(styles.option, filters.category === category.id && styles.active)}
                onClick={() => setCategory(category.id)}
              >
                <span>{category.label}</span>
                <span className={styles.count}>{formatNumber(category.count)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {availableSizes.length > 0 && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>المقاس</h3>
          <div className={styles.sizes}>
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                className={cn(styles.size, filters.sizes.includes(size) && styles.sizeActive)}
                onClick={() => toggleSize(size)}
                aria-pressed={filters.sizes.includes(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>السعر</h3>
        <ul className={styles.list}>
          {PRICE_RANGES.map((range) => (
            <li key={range.id}>
              <button
                type="button"
                className={cn(styles.option, filters.price === range.id && styles.active)}
                onClick={() => setPrice(filters.price === range.id ? 'all' : range.id)}
              >
                <span className={styles.radio} aria-hidden="true" />
                <span>{range.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.note}>
        <p>تحتاجين مساعدة في الاختيار؟</p>
        <span>فريقنا يرافقكِ خطوة بخطوة عبر واتساب.</span>
      </div>
    </aside>
  );
};
