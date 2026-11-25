import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fanfun_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "ff-apex-3in1",
          sku: "FAN-APEX-WALNUT",
          name: "FANFUN Apex 3-in-1 Smart Ceiling Fan (Walnut Wood)",
          price: 8490000,
          quantity: 1,
          image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
        },
        {
          id: "ff-filter-hepa-h13",
          sku: "ACC-HEPA-H13",
          name: "FANFUN Multi-Layer HEPA H13 Filter (Set of 2)",
          price: 490000,
          quantity: 1,
          image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-filter-hepa-h13.jpg"
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState({
    code: "FANFUN2026",
    title: "New Generation Launch Promo",
    discountAmount: 500000
  });

  useEffect(() => {
    localStorage.setItem('fanfun_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedVoucher ? appliedVoucher.discountAmount : 0;
  const shippingFee = 0; // Free shipping
  const total = Math.max(0, subtotal - discount + shippingFee);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedVoucher,
      setAppliedVoucher,
      subtotal,
      discount,
      shippingFee,
      total,
      totalCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
