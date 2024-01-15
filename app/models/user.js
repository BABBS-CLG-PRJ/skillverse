import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["Instructor", "Student"], // set an enum to restrict the possible values for the role
    default: "Student", // set a default value for the role
  },
  passwordResetToken: {
    type: String,
    select: false,  // this ensures the reset token isn't fetched by default when querying the user
  },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;