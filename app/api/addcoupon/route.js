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

async function findBestCoupon(courseId, price) {
    const now = new Date();

    // Find all valid coupons for the given courseId
    const coupons = await Coupon.find({ courseId });

    // If no valid coupons are found
    if (coupons.length === 0) {
        return { message: "No valid coupons available" };
    }

    // Calculate the final price after applying each coupon
    const discountedPrices = coupons.map(coupon => {
        let finalPrice = price;

        if (coupon.discountType === 'percentage') {
            // Apply percentage discount
            finalPrice = price - (price * coupon.discountValue / 100);
        } else if (coupon.discountType === 'fixed') {
            // Apply fixed discount
            finalPrice = price - coupon.discountValue;
        }

        // Ensure final price is not negative
        finalPrice = Math.max(finalPrice, 0);

        return { coupon, finalPrice };
    });

    // Sort coupons based on final price (lowest price is the best deal)
    discountedPrices.sort((a, b) => a.finalPrice - b.finalPrice);

    // Return the best coupon and its final price
    const bestDeal = discountedPrices[0];
    return {
        coupon: bestDeal.coupon,
        finalPrice: bestDeal.finalPrice
    };
}


// Handle applying coupon
export async function PUT(req) {
    const { couponCode, userId } = await req.json();

    if (!couponCode) {
        return NextResponse.json({ error: "Missing couponCode" }, { status: 400 });
    }
    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }


    try {
        // Connect to database
        await connectToDatabase();

        // Validate coupon
        const validationResponse = await validateCoupon(couponCode).catch((err) => ({
            error: "Error validating coupon",
            status: 500,
        }));

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
    const { code, discountType, discountValue, startDate, expiryDate, maxUsageLimit, courseId } = await req.json();

    if (!code || !discountType || !discountValue || !expiryDate || !courseId) {
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
            courseId
        });

        await newCoupon.save().catch((error) => {
            console.error("Error saving coupon:", error);
            throw new Error("Failed to create coupon");
        });


        return NextResponse.json({ success: "Coupon created successfully", coupon: newCoupon }, { status: 201 });

    } catch (error) {
        console.error("Error creating coupon:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get('courseId');
    const price = searchParams.get('price');

    if (!courseId) {
        return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectToDatabase();

        // Find the best deal coupon for the given courseId
        const bestCoupon = await findBestCoupon(courseId, price);
        if (!bestCoupon) {
            return NextResponse.json({ error: "No valid coupon found for this course" }, { status: 404 });
        }

        return NextResponse.json({ bestCouponCode: bestCoupon.coupon.code }, { status: 200 });
    } catch (error) {
        console.error("Error fetching best coupon:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}