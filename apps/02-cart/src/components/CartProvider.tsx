import { CartContext, CartContextConfig, CartItem } from '@/context/CartContext';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items: CartItem[] = [];
  const addToCart = (item: CartItem) => {};
  const removeFromCart = (id: number) => {};

  const contextValue: CartContextConfig = {
    items,
    addToCart,
    removeFromCart,
  };
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
