'use client'
import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { FaRegCreditCard } from "react-icons/fa";
import RazorpayPayment from "../components/common/RazorpayPayment";
import toast from 'react-hot-toast';

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupons, setCoupons] = useState({});
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [enrollingCourses, setEnrollingCourses] = useState(new Set());

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
        toast.error("Failed to load cart items. Please try refreshing the page.");
        setError("Failed to load cart items. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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

          if (response.ok && data.bestCouponCode) {
            const coupon = {
              code: data.bestCouponCode,
              discountType: data.discountType,
              discountValue: data.discountValue,
              finalPrice: data.finalPrice,
            };

            newCoupons[item._id] = {
              ...coupon,
              discount: item.price - data.finalPrice,
            };

            total += data.finalPrice;
          } else {
            total += item.price;
            newCoupons[item._id] = null;
          }
        }

        setCoupons(newCoupons);
        setDiscountedTotal(total);
      } catch (err) {
        console.error("Error fetching coupons:", err);
        toast.error("Failed to fetch coupon details. Some discounts may not be applied.");
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
    toast.success("Item removed from cart");
    window.location.reload();
  };

  const handlePaymentSuccess = async (paymentData) => {
    console.log("Payment Success:", paymentData);
    if(paymentData.status === "paid") {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      const enrollCourseWithRetry = async (item, maxRetries = 3, baseDelay = 1000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            setEnrollingCourses(prev => new Set([...prev, item._id]));
            
            const response = await fetch("/api/buycourse", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                courseId: item._id,
                uid: item.uid,
                orderhistory: {
                  order_id: paymentData.order_id,
                  paymentId: paymentData.paymentId,
                  status: paymentData.status,
                },
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              // Check if it's a write conflict error
              if (errorData.code === 112 || errorData.codeName === 'WriteConflict') {
                if (attempt < maxRetries) {
                  // Exponential backoff
                  const backoffDelay = baseDelay * Math.pow(2, attempt - 1);
                  console.log(`Retrying enrollment for ${item.title} after ${backoffDelay}ms (Attempt ${attempt}/${maxRetries})`);
                  await delay(backoffDelay);
                  continue;
                }
              }
              throw new Error(errorData.message || `Failed to enroll in ${item.title}`);
            }

            toast.success(`Successfully enrolled in ${item.title}`);
            return true;
          } catch (error) {
            if (attempt === maxRetries) {
              console.error(`Error enrolling in course ${item.title}:`, error);
              toast.error(`Failed to enroll in ${item.title}. Please contact support.`);
              throw error;
            }
            // If it's not the last attempt, continue the retry loop
            await delay(baseDelay * Math.pow(2, attempt - 1));
          }
        }
      };

      // Process enrollments sequentially to reduce write conflicts
      const enrollmentPromises = [];
      for (const item of cartItems) {
        try {
          await enrollCourseWithRetry(item);
          enrollmentPromises.push(Promise.resolve());
        } catch (error) {
          enrollmentPromises.push(Promise.reject(error));
        } finally {
          setEnrollingCourses(prev => {
            const updated = new Set(prev);
            updated.delete(item._id);
            return updated;
          });
        }
      };

      try {
        await Promise.all(enrollmentPromises);
        // Clear cart after successful enrollment
        localStorage.removeItem("cart");
        setCartItems([]);
        toast.success("Thank you for your purchase! You can now access your courses.");
      } catch (error) {
        console.error("Some enrollments failed:", error);
        toast.error("Some courses couldn't be enrolled. Please contact support.");
      }
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment Error:", error);
    toast.error("Payment failed. Please try again or contact support.");
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
                  {enrollingCourses.has(item._id) && (
                    <div className="flex items-center mt-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600 mr-2"></div>
                      <span className="text-sm">Enrolling...</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-4">
                  <span className="text-xl font-bold text-gray-900">
                    ₹
                    {coupons[item._id]
                      ? coupons[item._id].finalPrice.toFixed(2)
                      : item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={enrollingCourses.has(item._id)}
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
                amount={Math.round(discountedTotal)}
                businessName="Skillverse"
                description={`Course Payment for ${cartItems.map(item => item.title).join(", ")}`}
                prefillData={{
                  name: "", // Replace with actual user data
                  email: "", // Replace with actual user data
                  contact: "",
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              >
                <button
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center"
                  disabled={enrollingCourses.size > 0}
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