import { CartContext, CartContextConfig } from '@/context/CartContext';
import { useContext } from 'react';

// DX = developer experience
// custom hook = reusable STATEFUL logic
export function useCart(): CartContextConfig {
  const context = useContext(CartContext);
  if (!context) throw new Error('Context have not been created');

  return context;
}
