import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Reference to ride and user (foreign keys)
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "CreateRide", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "RideNextUser", required: true },

    // Booking Information
    seats: { type: Number, required: true },
    amount: { type: Number, required: true },
    journeyDate: { type: String, required: true },

    // Locations
    pickUp: { type: String, required: true },
    drop: { type: String, required: true },

    // Passenger Contact
    phoneNumber: { type: String, required: true },

    // Special Requests
    notes: { type: String },

    // Status
    status: { type: String, enum: ["Booked", "Cancelled", "Pending"], default: "Pending" },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("RideNextBooking", bookingSchema);
