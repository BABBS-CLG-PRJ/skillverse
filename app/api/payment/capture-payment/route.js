// app/api/capture-payment/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req) {
  try {
    const { paymentId, amount } = await req.json();

    const response = await razorpay.payments.capture(paymentId, amount * 100, 'INR');
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error capturing payment:', error);
    return NextResponse.json({ error: 'Error capturing payment' }, { status: 500 });
  }
}
