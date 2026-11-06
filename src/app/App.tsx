import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { CatalogPage } from '@pages/catalog';
import { ProductPage } from '@pages/product';
import { CartPage } from '@pages/cart';
import { CheckoutPage } from '@pages/checkout';
import { WishlistPage } from '@pages/wishlist';
import { AboutPage } from '@pages/about';
import { NotFoundPage } from '@pages/not-found';
import { RootLayout } from './layouts/RootLayout';

export const App = () => (
  <Routes>
    <Route element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="shop" element={<CatalogPage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
