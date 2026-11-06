import { useState } from 'react';
import type { ReactNode } from 'react';
import { SearchX, SlidersHorizontal, X } from 'lucide-react';
import { getCategoryLabel } from '@entities/product';
import {
  FilterSidebar,
  PRICE_RANGES,
  SortSelect,
  useProductFilters,
} from '@features/filter-products';
import { ProductGrid } from '@widgets/product-grid';
import { Button, Drawer, EmptyState, PageHeader } from '@shared/ui';
import { ROUTES } from '@shared/config/site';
import { formatNumber, pieceWord } from '@shared/lib/format';
import { cn } from '@shared/lib/cn';
import styles from './CatalogPage.module.css';

interface FilterChipProps {
  children: ReactNode;
  onRemove: () => void;
}

const FilterChip = ({ children, onRemove }: FilterChipProps) => (
  <span className={styles.chip}>
    {children}
    <button type="button" onClick={onRemove} aria-label="إزالة الفلتر">
      <X size={12} strokeWidth={2} />
    </button>
  </span>
);

export const CatalogPage = () => {
  const controller = useProductFilters();
  const { filters, filtered, activeCount, totalResults } = controller;
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryLabel = getCategoryLabel(filters.category === 'all' ? 'dresses' : filters.category);
  const priceLabel = PRICE_RANGES.find((range) => range.id === filters.price)?.label;
  const hasFilters = activeCount > 0;

  const crumbs = [{ label: 'الرئيسية', to: ROUTES.home }, { label: 'المتجر', to: ROUTES.shop }];
  if (filters.category !== 'all') crumbs.push({ label: categoryLabel, to: ROUTES.shop });

  const title = filters.query
    ? 'نتائج البحث'
    : filters.category === 'all'
      ? 'كل القطع'
      : categoryLabel;

  const description = filters.query
    ? `نتائج البحث عن «${filters.query}» — ${formatNumber(totalResults)} ${pieceWord(totalResults)}.`
    : `قطع مختارة بعناية تنتظر لمسة من ذوقكِ — ${formatNumber(totalResults)} ${pieceWord(totalResults)}.`;

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="المجموعة الكاملة"
        title={title}
        description={description}
      />

      <section className={styles.section}>
        <div className={cn('container', styles.layout)}>
          <FilterSidebar controller={controller} className={styles.sidebar} />

          <div className={styles.main}>
            <div className={styles.toolbar}>
              <button
                type="button"
                className={styles.filterButton}
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                الفلاتر
                {hasFilters && <span className={styles.filterBadge}>{activeCount}</span>}
              </button>

              <p className={styles.count}>
                عرض <b>{formatNumber(totalResults)}</b> {pieceWord(totalResults)}
              </p>

              <SortSelect value={filters.sort} onChange={controller.setSort} />
            </div>

            {hasFilters && (
              <div className={styles.chips}>
                {filters.category !== 'all' && (
                  <FilterChip onRemove={() => controller.setCategory('all')}>
                    {categoryLabel}
                  </FilterChip>
                )}
                {filters.query && (
                  <FilterChip onRemove={() => controller.setQuery('')}>
                    بحث: {filters.query}
                  </FilterChip>
                )}
                {filters.sizes.map((size) => (
                  <FilterChip key={size} onRemove={() => controller.toggleSize(size)}>
                    مقاس {size}
                  </FilterChip>
                ))}
                {priceLabel && (
                  <FilterChip onRemove={() => controller.setPrice('all')}>{priceLabel}</FilterChip>
                )}
                <button type="button" className={styles.clearAll} onClick={controller.reset}>
                  مسح الكل
                </button>
              </div>
            )}

            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={3} className={styles.grid} />
            ) : (
              <div className={styles.empty}>
                <EmptyState
                  icon={<SearchX size={30} strokeWidth={1.4} />}
                  title="لا توجد قطع مطابقة"
                  description="جرّبي تعديل الفلاتر أو البحث بكلمة أخرى — ربما تنتظركِ قطعة أجمل."
                  action={
                    <Button variant="outline" onClick={controller.reset}>
                      مسح الفلاتر
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="تصفية القطع"
        side="start"
        width={360}
        footer={
          <div className={styles.drawerFooter}>
            {activeCount > 0 && (
              <Button variant="outline" onClick={controller.reset}>
                مسح الكل
              </Button>
            )}
            <Button full onClick={() => setFiltersOpen(false)}>
              عرض {formatNumber(totalResults)} {pieceWord(totalResults)}
            </Button>
          </div>
        }
      >
        <FilterSidebar controller={controller} hideHeading />
      </Drawer>
    </>
  );
};
