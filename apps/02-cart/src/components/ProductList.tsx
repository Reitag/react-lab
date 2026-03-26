import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { JSX } from 'react';

export function ProductList(): JSX.Element {
  const { items, addToCart } = useCart();

  const findItem = (id: number) => {
    return items.some((item) => item.id === id);
  };

  return (
    <div>
      <h3>Product List</h3>
      {products.map((product) => {
        const isItemInCart = findItem(product.id);

        return (
          <div key={product.id} style={{ display: 'flex', padding: '10px' }}>
            <div style={{ width: '200px' }}>{product.title}</div>

            <button onClick={() => addToCart(product)} disabled={isItemInCart}>
              {isItemInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
