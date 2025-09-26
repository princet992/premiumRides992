import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // Profile Information
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    // dateOfBirth: { type: Date },
    // city: { type: String },
    // accountType: { type: String, enum: ["Driver", "Passenger"], default: "Passenger" },
    // bio: { type: String },

    // Authentication
    password: { type: String, required: true },

    // Vehicle Information
    // carModel: { type: String },
    // licensePlate: { type: String },
    // drivingLicenseNumber: { type: String },

    isVerified: { type: Boolean, default: false },

    // otp: { type: String },          // store OTP

    // otpExpires: { type: Date },     // expiry time
    // Admin flag
    // isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("RideNextUser", userSchema);
