// app/api/payment/create-order/route.js
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
      amount: amount * 100,
      currency: 'INR',
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        createdAt: order.created_at
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating order',
      error: error.message
    }, { status: 500 });
  }
}