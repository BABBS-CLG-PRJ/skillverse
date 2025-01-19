// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = await req.json();

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest === razorpaySignature) {
      return NextResponse.json({ message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}
