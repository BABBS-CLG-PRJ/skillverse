import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        value: {
            type: String,
            required: true
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            index: { expireAfterSeconds: 300 }  // This sets the TTL to 5 minutes (5 * 60 seconds = 300 seconds).
        }
    }
});
const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);
export default OTP;