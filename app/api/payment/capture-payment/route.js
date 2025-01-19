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

    const payment = await razorpay.payments.capture(paymentId, amount * 100, 'INR');
    return NextResponse.json({
      success: true,
      message: 'Payment captured successfully',
      data: {
        paymentId: payment.id,
        orderId: payment.order_id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        capturedAt: payment.captured_at,
        email: payment.email,
        contact: payment.contact
      }
    });
  } catch (error) {
    console.error('Error capturing payment:', error);
    return NextResponse.json({
      success: false,
      message: 'Error capturing payment',
      error: error.message
    }, { status: 500 });
  }
}
