import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } // Automatically deletes after the expiry date
    },
    usedCount: {
        type: Number,
        default: 0,
    },
    maxUsageLimit: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);

export default Coupon;
