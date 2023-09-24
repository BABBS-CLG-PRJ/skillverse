import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 32,
  },
  imageUrl: {
    type: String,
    default: "", // set a default value for the image url
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["instructor", "student"], // set an enum to restrict the possible values for the role
    default: "student", // set a default value for the role
  },
  passwordResetToken: {
    type: String,
    select: false,  // this ensures the reset token isn't fetched by default when querying the user
  },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;