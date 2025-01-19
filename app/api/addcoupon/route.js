import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Coupon from "../../models/coupon";

// Helper function to check coupon validity
async function validateCoupon(couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
        return { error: "Invalid coupon code", status: 400 };
    }

    if (coupon.startDate > new Date()) {
        return { error: "Coupon not yet valid", status: 400 };
    }

    if (coupon.expiryDate < new Date()) {
        return { error: "Coupon expired", status: 400 };
    }

    if (coupon.maxUsageLimit > 0 && coupon.usedCount >= coupon.maxUsageLimit) {
        return { error: "Coupon usage limit reached", status: 400 };
    }

    return { coupon };
}

// Handle applying coupon
export async function PUT(req) {
    const { couponCode, userId } = await req.json();

    if (!couponCode || !userId) {
        return NextResponse.json({ error: "Missing couponCode or userId" }, { status: 400 });
    }

    try {
        // Connect to database
        await connectToDatabase();

        // Validate coupon
        const validationResponse = await validateCoupon(couponCode);

        if (validationResponse.error) {
            return NextResponse.json({ error: validationResponse.error }, { status: validationResponse.status });
        }

        const coupon = validationResponse.coupon;

        // Update coupon usage count
        const updatedCoupon = await Coupon.findOneAndUpdate(
            { code: couponCode },
            { $inc: { usedCount: 1 } },
            { new: true }
        );

        if (!updatedCoupon) {
            return NextResponse.json({ error: "Failed to update coupon usage" }, { status: 500 });
        }

        // Optionally, track coupon usage for user (e.g., in a user profile model)
        // await UserProfile.findOneAndUpdate({ user: userId }, { $addToSet: { usedCoupons: couponCode } });

        return NextResponse.json({ success: "Coupon applied successfully", coupon: updatedCoupon }, { status: 200 });

    } catch (error) {
        console.error("Error applying coupon:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Handle creating new coupon
export async function POST(req) {
    const { code, discountType, discountValue, startDate, expiryDate, maxUsageLimit } = await req.json();

    if (!code || !discountType || !discountValue || !expiryDate) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (discountType !== 'percentage' && discountType !== 'fixed') {
        return NextResponse.json({ error: "Invalid discount type" }, { status: 400 });
    }

    try {
        // Connect to database
        await connectToDatabase();

        // Check for existing coupon with same code
        const existingCoupon = await Coupon.findOne({ code });

        if (existingCoupon) {
            return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 });
        }

        // Create and save the new coupon
        const newCoupon = new Coupon({
            code,
            discountType,
            discountValue,
            startDate,
            expiryDate,
            maxUsageLimit,
        });

        await newCoupon.save();

        return NextResponse.json({ success: "Coupon created successfully", coupon: newCoupon }, { status: 201 });

    } catch (error) {
        console.error("Error creating coupon:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
