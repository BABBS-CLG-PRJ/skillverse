import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/dbconnect";
import Coupon from "../../models/coupon";

// Helper function to validate a coupon
async function validateCoupon(couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
        return { error: "Invalid coupon code", status: 400 };
    }

    const now = new Date();

    if (coupon.startDate > now) {
        return { error: "Coupon not yet valid", status: 400 };
    }

    if (coupon.expiryDate < now) {
        return { error: "Coupon expired", status: 400 };
    }

    if (coupon.maxUsageLimit > 0 && coupon.usedCount >= coupon.maxUsageLimit) {
        return { error: "Coupon usage limit reached", status: 400 };
    }

    return { coupon };
}

// Helper function to find the best coupon for a course
async function findBestCoupon(courseId, price) {
    const coupons = await Coupon.find({ courseId });
    if (coupons.length === 0) {
        return null; // No valid coupons available
    }

    // Calculate discounted prices for each coupon
    const discountedPrices = coupons.map(coupon => {
        let finalPrice = price;

        if (coupon.discountType === 'percentage') {
            finalPrice -= (price * coupon.discountValue) / 100;
        } else if (coupon.discountType === 'fixed') {
            finalPrice -= coupon.discountValue;
        }

        // Ensure final price is not negative
        finalPrice = Math.max(finalPrice, 0);

        return { coupon, finalPrice };
    });

    // Find the coupon offering the best discount (lowest final price)
    const bestDeal = discountedPrices.reduce((best, current) => 
        current.finalPrice < best.finalPrice ? current : best
    );

    return bestDeal || null;
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


// Main API handler
export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get('courseId');
    const price = parseFloat(searchParams.get('price'));

    if (!courseId) {
        return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    if (isNaN(price) || price <= 0) {
        return NextResponse.json({ error: "Invalid or missing price" }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectToDatabase();

        // Find the best coupon for the course
        const bestCoupon = await findBestCoupon(courseId, price);

        if (!bestCoupon) {
            return NextResponse.json({ message: "No valid coupons available for this course" }, { status: 404 });
        }

        const { coupon, finalPrice } = bestCoupon;
        return NextResponse.json({
            bestCouponCode: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            finalPrice,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching best coupon:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}