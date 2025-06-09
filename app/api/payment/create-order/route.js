// app/api/payment/create-order/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

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

    console.log('Razorpay Key ID:', process.env.RAZORPAY_ID_KEY ? 'Present' : 'Missing');
    console.log('Razorpay Secret Key:', process.env.RAZORPAY_SECRET_KEY ? 'Present' : 'Missing');

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      }, { status: 400 });
    }

    const options = {
      amount: Math.round(amount * 100), // Ensure it's an integer
      currency: 'INR',
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    console.log('Creating order with options:', options);

    const order = await razorpay.orders.create(options);
    
    console.log('Order created successfully:', order.id);

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
      message: 'Error creating order',
      error: error.message
    }, { status: 500 });
  }
}