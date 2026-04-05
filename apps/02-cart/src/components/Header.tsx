import { useCart } from '@/hooks/useCart';
import { JSX } from 'react';

// function foo(): number {
//   return 0;
// }

// type MyType = ReturnType<typeof foo>;

/** TS generics */

type Props = {
  // title: string | undefined;
  title?: string;
}

export const Header: React.FC<Props> = (props) => {
// export function Header(): ReturnType<React.FC> {
  const { items } = useCart();
  return <header>Items in Cart: {items.length} {props.title}</header>;
}
