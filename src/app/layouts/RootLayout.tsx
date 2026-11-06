import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '@widgets/site-header';
import { SiteFooter } from '@widgets/site-footer';
import { CartDrawer } from '@widgets/cart-drawer';
import { ToastViewport } from '@shared/ui';
import styles from './RootLayout.module.css';

export const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#main">
        تجاوز إلى المحتوى الرئيسي
      </a>

      <SiteHeader />

      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <SiteFooter />
      <CartDrawer />
      <ToastViewport />
    </div>
  );
};
