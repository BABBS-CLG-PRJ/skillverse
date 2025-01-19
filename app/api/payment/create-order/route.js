// app/api/create-order/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      receipt: shortid.generate(),
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order_id: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
