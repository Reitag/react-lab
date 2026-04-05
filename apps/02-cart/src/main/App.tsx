import { JSX, FC } from 'react';
import { CartProvider } from '@/components/CartProvider';
import { ProductList } from '@/components/ProductList';
import { Header } from '@/components/Header';
import { Cart } from '@/components/Cart';

/** JSX.Element vs ReactNode (все, что может рендерить React) */
export const App: React.FC = () => {
// export default function App(): JSX.Element {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Cart />
    </CartProvider>
  );
}
