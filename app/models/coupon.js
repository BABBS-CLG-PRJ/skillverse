import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
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
        default: Date.now,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
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
