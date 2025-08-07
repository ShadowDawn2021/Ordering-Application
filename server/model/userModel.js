import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
  verificationOTP: { type: String, default: "" },
  expVerifyOTP: { type: Number, default: 0 },
  resetOTP: { type: String, default: "" },
  expResetOTP: { type: Number, default: 0 },
});

const userModel = mongoose.models.user || mongoose.model("User", userSchema);

export default userModel;
