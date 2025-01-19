// app/api/payment/verify-payment/route.js
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
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          orderId: orderCreationId,
          paymentId: razorpayPaymentId,
          razorpayOrderId,
          signature: razorpaySignature,
          status: 'paid'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid signature',
        error: 'Payment verification failed'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    }, { status: 500 });
  }
}
