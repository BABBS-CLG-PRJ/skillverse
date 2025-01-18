"use client";
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // const response = await axios.get(`/api/cart`); // Replace with your cart API endpoint
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartData);
        // setCartItems(response.data.cartItems || []);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`); // Replace with your API endpoint
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Update item quantity
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.patch(`/api/cart/${itemId}`, { quantity: newQuantity }); // Replace with your API endpoint
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading cart...</div>;
  }

  return (
    <div className="mx-auto p-6 lg:w-[70%] w-full">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l-md"
                    onClick={() =>
                      handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r-md"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold">${item.price.toFixed(2)}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-lg font-medium">Total:</h3>
            <span className="text-xl font-semibold">
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <div className="text-right mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
