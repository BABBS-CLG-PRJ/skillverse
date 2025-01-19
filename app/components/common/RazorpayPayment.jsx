'use client';

import { useEffect } from 'react';
import axios from 'axios';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const RazorpayPayment = ({
  amount,
  currency = 'INR',
  businessName = 'Skillverse',
  description = 'Payment for course',
  prefillData = {
    name: '',
    email: '',
    contact: '',
  },
  themeColor = '#61dafb',
  onSuccess,
  onError,
  loading,
  children
}) => {
  useEffect(() => {
    loadRazorpayScript();
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Create an order
      const { data } = await axios.post('/api/payment/create-order', { amount });
      
      if (!data.success) {
        throw new Error(data.message);
      }

      // Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency,
        name: businessName,
        description,
        order_id: data.data.orderId,
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post('/api/payment/verify-payment', {
              orderCreationId: data.data.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verificationResponse.data.success) {
              onSuccess?.(verificationResponse.data.data);
            } else {
              throw new Error(verificationResponse.data.message);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            onError?.(error);
          }
        },
        prefill: prefillData,
        theme: {
          color: themeColor,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      onError?.(error);
    }
  };

  return (
    <div onClick={handlePayment}>
      {children}
    </div>
  );
};

export default RazorpayPayment;