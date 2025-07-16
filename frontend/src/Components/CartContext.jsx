import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (artwork) => {
    setCartItems((prevItems) => {
        // Check if item already exists in cart
        const existingItem = prevItems.find(item => item._id === artwork._id);
        if (existingItem) {
          // Update quantity if needed
          return prevItems.map(item =>
            item._id === artwork._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        // Add new item to cart
        return [...prevItems, { ...artwork, quantity: 1 }];
      });
      console.log('Product added:', artwork);
      console.log('Updated cart:', cartItems);
  };

  const removeFromCart = (artworkId) => {
    setCartItems(cartItems.filter(item => item._id !== artworkId));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
