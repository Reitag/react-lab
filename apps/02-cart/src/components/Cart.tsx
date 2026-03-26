import { useCart } from '@/hooks/useCart';
import { JSX } from 'react';

export function Cart(): JSX.Element {
  const { items, removeFromCart } = useCart();

  return (
    <div>
      <h3>Cart</h3>
      {items.map((item) => {
        return (
          <div key={item.id} style={{ display: 'flex', padding: '10px' }}>
            <div style={{ width: '200px' }}>{item.title}</div>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
          </div>
        );
      })}
    </div>
  );
}
