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
          name: "Quạt trần thông minh FANFUN Apex 3-in-1 (Gỗ Óc Chó)",
          price: 8490000,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida/ALJJyrAsiZaWI3R7fdCjyGjiRWTZQ1e93xWc9QEQ47Zoy5hlGrO487ZHGdDMX2aQ0wD7YzCYOCNLCFrqPdwQ0MLrStB0NPn5sMzLdCxDMm2Pk3lR-7tbMu82gpklcYK64RytVb-FuLsjBQWNBSKuaUWgCPkz476kJTVUy-zRk7Q0u5JIDP84IJAtan0RrqIA3D4tEt_nw_LetO36wFGsn5vQAcoedK_XrCLgOuw2GiKwd-Ve"
        },
        {
          id: "ff-filter-hepa-h13",
          sku: "ACC-HEPA-H13",
          name: "Lõi lọc HEPA H13 đa tầng chính hãng FANFUN (Set 2 lõi)",
          price: 490000,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida/ALJJyrD_ae_lLPYjMCZY4HnpQLZUiTWqZ4f7Q3Hp5CGxa9PgWIdPi4kO6fM-OxuvnVpWYAg5-UyoEc3zOsSlyawbN9cnoP5bp_f9e8YqUvfEgMn71i9skHxLwhMWJBRPyUvuwOOXBpNW78I_cwAl8h0xnsmDQX7edKmwfLwMaw36fDGK-XYbSNikSfD7rGEo2hSgknSrD2BaXTviAqt2MfTn99RZO9boW3SIYjKcii6V4CUtDnAT6NxSN_M1gdM6"
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState({
    code: "FANFUN2026",
    title: "Ưu đãi mở bán thế hệ mới",
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
