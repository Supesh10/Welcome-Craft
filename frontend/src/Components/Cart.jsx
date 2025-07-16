import React, { useContext , useEffect } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, totalAmount } = useContext(CartContext);

  useEffect(() => {
    console.log('Cart updated:', cartItems);
  }, [cartItems]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item,index) => (
              <li key={item._id || index} className="flex justify-between items-center py-4">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>{item.artist.name}</p>
                  <p>${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
            <button className="mt-2 bg-black text-white px-5 py-2 rounded-md">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
