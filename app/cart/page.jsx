'use client'
import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { FaRegCreditCard } from "react-icons/fa";
import RazorpayPayment from "../components/common/RazorpayPayment";

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupons, setCoupons] = useState({});
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        if (Array.isArray(cartData)) {
          setCartItems(cartData);
        } else {
          throw new Error("Invalid cart data structure");
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setError("Failed to load cart items. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateDiscountedPrice = (price, coupon) => {
    if (coupon.discountType === "percentage") {
      return price - (price * coupon.discountValue) / 100;
    } else if (coupon.discountType === "fixed") {
      return price - coupon.discountValue;
    }
    return price;
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        setError(null);
        const newCoupons = {};
        let total = 0;

        for (const item of cartItems) {
          const response = await fetch(`/api/addcoupon?courseId=${item._id}&price=${item.price}`);
          const data = await response.json();

          if (response.ok) {
            if (data.bestCouponCode) {
              const coupon = {
                code: data.bestCouponCode,
                discountType: data.discountType,
                discountValue: data.discountValue,
              };

              const discountedPrice = calculateDiscountedPrice(item.price, coupon);

              newCoupons[item._id] = {
                ...coupon,
                discount: item.price - discountedPrice,
              };

              total += discountedPrice;
            } else {
              total += item.price;
              newCoupons[item._id] = null;
            }
          } else {
            total += item.price;
            newCoupons[item._id] = null;
          }
        }

        setCoupons(newCoupons);
        setDiscountedTotal(total);
      } catch (err) {
        console.error("Error fetching coupons:", err);
        setError("An unexpected error occurred while fetching coupons.");
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0) {
      fetchCoupons();
    }
  }, [cartItems]);

  const handleRemoveItem = (_id) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log("Payment Success:", paymentData);
    // Handle successful payment
  };

  const handlePaymentError = (error) => {
    console.error("Payment Error:", error);
    // Handle payment error
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center space-x-2 mb-8">
        <ShoppingBag className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>
      </div>

      {error && <div className="mb-6 bg-red-100 text-red-700 p-4 rounded">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Continue Exploring
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  {coupons[item._id] && (
                    <p className="text-sm text-green-600 mt-2">
                      Best Coupon: {coupons[item._id].code} - Save ₹
                      {coupons[item._id].discount.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-4">
                  <span className="text-xl font-bold text-gray-900">
                    ₹
                    {coupons[item._id]
                      ? (item.price - coupons[item._id].discount).toFixed(2)
                      : item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{discountedTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end">
              <RazorpayPayment
                amount={discountedTotal}
                businessName="Skillverse"
                description={`Course Payment for ${cartItems.map(item => item.title).join(", ")}`}
                prefillData={{
                  name: "John Doe", // Replace with actual user data
                  email: "johndoe@example.com", // Replace with actual user data
                  contact: "",
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              >
                <button
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center"
                >
                  <FaRegCreditCard className="w-5 h-5 mr-2" />
                  Proceed to Pay
                </button>
              </RazorpayPayment>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
