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
  role: {
    type: String,
    enum: ["instructor", "student"], // set an enum to restrict the possible values for the role
    default: "student", // set a default value for the role
  },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;