// app/api/transfer-funds/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import axios from 'axios';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // // Create Razorpay contact
    // const contact = await axios.post(
    //   'https://api.razorpay.com/v1/contacts',
    //   {
    //     name: 'John Doe',
    //     type: 'vendor',
    //     reference_id: '123456',
    //     email: 'testuser@gmail.com',
    //     contact: '+91 1234567890',
    //     notes: {
    //       role: "provider"
    //     }
    //   },
    //   {
    //     auth: {
    //       username: razorpay.key_id,
    //       password: razorpay.key_secret
    //     }
    //   }
    // );


    // // Create Razorpay fund account
    // const fundAccount = await razorpay.fundAccount.create({
    //   contact_id: contact.data.id,
    //   account_type: "bank_account",
    //   bank_account: {
    //     name: 'John Doe',
    //     ifsc: 'HDFC0001234',
    //     account_number: '123456789012'
    //   }
    // });

    // console.log("Fund Account Created:", fundAccount.id);
    // console.log("Contact Created:", contact.data.id);

    // Recipient details - MUST BE VALID RAZORPAY IDs
    const recipientDetails = {
      fund_account_id: 'fa_QOSKnahh9DnWvC',
      contact_id: 'cont_QOSKmrbtgExKcS',
      account_holder: 'John Doe',
      account_number: '123456789012',
      ifsc: 'HDFC0001234'
    }

    // 1. First verify the fund account exists
    try {
      const response = await axios.get(`https://api.razorpay.com/v1/fund_accounts/${recipientDetails.fund_account_id}`, {
        auth: {
          username: razorpay.key_id,
          password: razorpay.key_secret
        }
      });
      const fundAccount = response.data;
      console.log("Fund Account Verification:", fundAccount);
      console.log("Fund Account Status:", fundAccount.active ? "Active" : "Inactive");
    } catch (err) {
      console.error('Fund Account Verification Error:', err);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid recipient account',
          error: `Fund account verification failed: ${err.error.description}`
        },
        { status: 400 }
      );
    }

    // Calculate amounts
    const commission = amount * 0.20;
    const transferAmount = amount * 0.80;

    try {
      const payout = await axios.post(
        'https://api.razorpay.com/v1/payouts',
        {
          account_number: process.env.RAZORPAY_SETTLEMENT_ACCOUNT || "7878780080316316",
          fund_account_id: recipientDetails.fund_account_id,
          amount: Math.round(transferAmount * 100),
          currency: "INR",
          mode: "NEFT", // Try NEFT if IMPS fails
          purpose: "payout",
          queue_if_low_balance: true,
          reference_id: `payout_${Date.now()}`,
          narration: `Payment to ${recipientDetails.account_holder}`,
          notes: {
            original_amount: amount,
            commission: commission
          }
        },
        {
          auth: {
            username: razorpay.key_id,
            password: razorpay.key_secret
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    
      console.log("Payout Created:", payout.data);
      return NextResponse.json({
        success: true,
        message: 'Payout initiated',
        data: payout.data
      });
    } catch (error) {
      console.error('Detailed Payout Error:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      return NextResponse.json(
        {
          success: false,
          message: 'Payout failed',
          error: error.response?.data?.error?.description || error.message,
          code: error.response?.data?.error?.code || 'UNKNOWN_ERROR'
        },
        { status: error.response?.status || 500 }
      );
    }
    console.log("Payout Created:", payout.data);
    return NextResponse.json({
      success: true,
      message: 'Payout initiated',
      data: {
        payoutId: payout.id,
        status: payout.status,
        amount: transferAmount,
        utr: payout.utr
      }
    });

  } catch (error) {
    console.error('Payout Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Payout failed',
        error: error.error?.description || error.message,
        code: error.error?.code || 'UNKNOWN_ERROR'
      },
      { status: error.statusCode || 500 }
    );
  }
}