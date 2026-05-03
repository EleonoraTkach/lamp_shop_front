import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);

      if (existing) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };


  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const updateQuantity = (id, newQuantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);