// app/api/payment/verify-payment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    // Check if secret key is present
    if (!process.env.RAZORPAY_SECRET_KEY) {
      console.error('Razorpay secret key missing in environment variables');
      return NextResponse.json({
        success: false,
        message: 'Payment verification configuration error',
        error: 'Missing payment gateway credentials'
      }, { status: 500 });
    }

    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = await req.json();

    // Validate required parameters
    if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({
        success: false,
        message: 'Missing required payment verification parameters',
        error: 'Invalid payment data'
      }, { status: 400 });
    }

    console.log('Verifying payment with:', {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId
    });

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    console.log('Generated digest:', digest);
    console.log('Received signature:', razorpaySignature);

    if (digest === razorpaySignature) {
      console.log('Payment verification successful');
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
      console.log('Payment verification failed - signature mismatch');
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
