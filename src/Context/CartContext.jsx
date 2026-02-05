import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from storage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p._id === product._id);

      if (exist) {
        return prev.map(p =>
          p._id === product._id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  // Change qty
  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(p =>
        p._id === id ? { ...p, qty } : p
      )
    );
  };

  //buynow
  const buyNow = (product) => {
  setCart([{ ...product, qty: 1 }]);
};

//clear cart
const clearCart = () => {
  setCart([]);
};


  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      buyNow,
      removeFromCart,
      updateQty,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
