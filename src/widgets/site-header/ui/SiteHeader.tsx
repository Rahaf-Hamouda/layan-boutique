import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Gift,
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { getCategories } from '@entities/product';
import { useCartCount, useCartStore } from '@entities/cart';
import { useWishlistCount } from '@entities/wishlist';
import { SearchOverlay } from '@features/search-products';
import { ButtonLink, Drawer, IconButton, Logo } from '@shared/ui';
import { NAV_LINKS } from '@shared/config/navigation';
import { ROUTES, SITE } from '@shared/config/site';
import { cn } from '@shared/lib/cn';
import styles from './SiteHeader.module.css';

const isLinkActive = (to: string, pathname: string, search: string): boolean => {
  const [path, query = ''] = to.split('?');
  const inShop = pathname === ROUTES.shop || pathname.startsWith(`${ROUTES.product('')}`);
  const matchesPath = path === ROUTES.shop ? inShop : pathname === path;
  if (!matchesPath) return false;
  if (!query) return !new URLSearchParams(search).get('category');
  return new URLSearchParams(search).get('category') === new URLSearchParams(query).get('category');
};

export const SiteHeader = () => {
  const { pathname, search } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const openCart = useCartStore((state) => state.openCart);
  const categories = getCategories();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, search]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={styles.announce}>
        <div className={cn('container', styles.announceInner)}>
          <span className={styles.announceItem}>
            <Truck size={15} strokeWidth={1.7} aria-hidden="true" />
            شحن مجاني للطلبات فوق {SITE.freeShippingThreshold} ر.س
          </span>
          <span className={cn(styles.announceItem, styles.announceOptional)}>
            <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
            خصم ١٥٪ على أول طلب بكود
            <b className={styles.code} dir="ltr">
              WELCOME15
            </b>
          </span>
          <span className={cn(styles.announceItem, styles.announceOptional)}>
            <Gift size={14} strokeWidth={1.7} aria-hidden="true" />
            تغليف هدايا فاخر مجانًا
          </span>
        </div>
      </div>

      <header className={cn(styles.header, scrolled && styles.scrolled)}>
        <div className={cn('container', styles.inner)}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
            aria-expanded={menuOpen}
          >
            <Menu size={20} strokeWidth={1.7} />
          </button>

          <Logo className={styles.logo} />

          <nav className={styles.nav} aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.to, pathname, search);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={cn(styles.navLink, active && styles.navLinkActive)}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <IconButton
              label="البحث"
              className={styles.action}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} strokeWidth={1.7} />
            </IconButton>

            <Link
              to={ROUTES.wishlist}
              className={cn(styles.iconLink, styles.wishlistAction)}
              aria-label="قائمة المفضلة"
            >
              <Heart size={19} strokeWidth={1.7} />
              {wishlistCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            <IconButton
              label="حقيبة التسوق"
              badge={cartCount}
              className={styles.action}
              onClick={openCart}
            >
              <ShoppingBag size={19} strokeWidth={1.7} />
            </IconButton>
          </div>
        </div>
      </header>

      <Drawer
        open={menuOpen}
        onClose={closeMenu}
        title={SITE.name}
        side="start"
        width={392}
      >
        <div className={styles.drawer}>
          <nav className={styles.drawerNav} aria-label="قائمة الجوال">
            {NAV_LINKS.map((link, index) => (
              <Link key={link.label} to={link.to} className={styles.drawerLink}>
                <span className={styles.drawerIndex}>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
                <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className={styles.drawerSection}>
            <p className={styles.drawerLabel}>تسوّقي حسب القسم</p>
            <div className={styles.chips}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`${ROUTES.shop}?category=${category.id}`}
                  className={styles.chip}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.drawerShortcuts}>
            <Link to={ROUTES.wishlist} className={styles.shortcut}>
              <Heart size={17} strokeWidth={1.7} />
              قائمة المفضلة
              <span className={styles.shortcutCount}>{wishlistCount}</span>
            </Link>
            <Link to={ROUTES.cart} className={styles.shortcut}>
              <ShoppingBag size={17} strokeWidth={1.7} />
              حقيبة التسوق
              <span className={styles.shortcutCount}>{cartCount}</span>
            </Link>
          </div>

          <div className={styles.drawerContact}>
            <p>نحن هنا لمساعدتكِ</p>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
              <span dir="ltr">{SITE.phone}</span>
            </a>
            <span>{SITE.instagram}</span>
          </div>

          <ButtonLink to={ROUTES.shop} full onClick={closeMenu}>
            تسوّقي الآن
          </ButtonLink>
        </div>
      </Drawer>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
};
