import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    // Route Information
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    pickupLocation: { type: String },
    dropLocation: { type: String },

    // Schedule
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },

    // Seats & Pricing
    availableSeats: { type: Number, required: true },
    pricePerSeat: { type: Number, required: true },

    // Vehicle & Information
    carModel: { type: String },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },

    // Travel Preferences
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    musicAllowed: { type: Boolean, default: false },
    instantBooking: { type: Boolean, default: false },

    // Additional Information
    notes: { type: String },

    // Reference to Driver (User)
    driverId: { type: mongoose.Schema.Types.ObjectId, ref:"RideNextUser", required: true },
  },
  { timestamps: true }
);

export const Ride = mongoose.model("CreateRide", rideSchema);
