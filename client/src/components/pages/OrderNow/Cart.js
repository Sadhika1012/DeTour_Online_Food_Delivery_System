import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { Navbar } from '../../layout';

import './cart.css'; // Added CSS file

const Cart = () => {
  const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});


  useEffect(() => {
   
    // Initialize item quantities based on cartItems
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.item._id] = item.item.quantity;
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

const handlePlaceOrder = () => {
    const orderDetails = {
      items: buyItems.map(item => ({
        name: item.item.name,
        quantity: itemQuantities[item.item._id],
        price: item.item.price,
      })),
      totalAmount: totalBuyPrice,
      createdAt: new Date(),
    };

    fetch('http://localhost:8800/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
       
      })
      .catch((error) => {
        console.error('An error occurred while placing the order:', error);
      });
};

  const buyItems = cartItems.filter((item) => item.action === 'buy');
  const totalBuyPrice = buyItems.reduce((total, item) => total + parseFloat(item.item.price) * itemQuantities[item.item._id], 0);
  const totalItems = Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
  const handleQuantityChange = (itemId, quantity) => {
    quantity = Math.max(1, Math.min(quantity, 6));

    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="cart">
        <div className="cart_box">
          {cartItems.map((item) => (
            <div className="cart_item" key={item.item._id}>
              <div className="cart_img">
                <img src={item.item.image} alt={item.item.name} />
                <p className="item_quantity">Qty: {itemQuantities[item.item._id]}</p>
              </div>
              <div className="cart_item_details">
                <p className="cart_item_name">Name: {item.item.name}</p>
                <p className="cart_item_price">Price: ₹{item.item.price.toFixed(2)}</p>
                <button
                  id="remove"
                  onClick={() => handleRemoveItem(item.item._id)}
                >
                  Remove
                </button>
                <button
                  id="plus"
                  onClick={() => handleQuantityChange(item.item._id, itemQuantities[item.item._id] + 1)}
                >
                  
                </button>
                <button
                  id="minus"
                  onClick={() => handleQuantityChange(item.item._id, itemQuantities[item.item._id] - 1)}
                  disabled={itemQuantities[item.item._id] <= 1}
                >
                  
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <span className="total_items">Total Items: {totalItems}</span><br/>
          <span className="total_price">Total Price: ₹{totalBuyPrice.toFixed(2)}</span>
        </div>
        <div className="checkout_cont">
          <div className='Button-container'>
            <button id="checkout" onClick={handlePlaceOrder}>
            Checkout
            </button>
            
            <button id="clear_cart" onClick={handleClearCart}>
              Clear Cart
            </button>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
