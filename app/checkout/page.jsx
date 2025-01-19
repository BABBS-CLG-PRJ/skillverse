// app/checkout/page.js
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Checkout() {
  const [amount, setAmount] = useState(500); // Example amount in INR

  const handlePayment = async () => {
    try {
      // Create an order
      const { data: { order_id } } = await axios.post('/api/payment/create-order', { amount });

      // Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Skillverse',
        description: 'Payment for course',
        order_id,
        handler: async (response) => {
          const { data } = await axios.post('/api/payment/verify-payment', {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });

          alert(data.message || 'Payment successful!');
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    // Dynamically load the Razorpay script if not already available
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Checkout</title>
      </Head>
      <h1>Checkout</h1>
      <button onClick={handlePayment}>Pay ₹{amount}</button>
    </div>
  );
}
