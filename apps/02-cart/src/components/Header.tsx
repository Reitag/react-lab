import { useCart } from '@/hooks/useCart';
import { JSX } from 'react';

export function Header(): JSX.Element {
  const { items } = useCart();
  return <header>Items in Cart: {items.length}</header>;
}
