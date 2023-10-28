import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Basic email format validation
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9\-+\s]*$/ // Basic phone number format validation
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;