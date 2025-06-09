// app/api/capture-payment/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    // Check if environment variables are present
    if (!process.env.RAZORPAY_ID_KEY || !process.env.RAZORPAY_SECRET_KEY) {
      console.error('Razorpay credentials missing in environment variables');
      return NextResponse.json({
        success: false,
        message: 'Payment service configuration error',
        error: 'Missing payment gateway credentials'
      }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const { paymentId, amount } = await req.json();

    if (!paymentId || !amount || amount <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid payment parameters',
        error: 'Payment ID and valid amount are required'
      }, { status: 400 });
    }

    console.log('Capturing payment:', { paymentId, amount });

    const payment = await razorpay.payments.capture(
      paymentId, 
      Math.round(amount * 100), // Ensure it's an integer
      'INR'
    );

    console.log('Payment captured successfully:', payment.id);

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
    
    // Check if it's a Razorpay specific error
    if (error.error && error.error.code) {
      return NextResponse.json({
        success: false,
        message: 'Razorpay error',
        error: error.error.description || error.message,
        code: error.error.code
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Error capturing payment',
      error: error.message
    }, { status: 500 });
  }
}
