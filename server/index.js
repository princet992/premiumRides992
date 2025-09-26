import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import { getAllUsers, googleLogin, login, register, updateUser } from "./controllers/userController.js";
import { cancelBooking, createBooking, getBookingData, getTotalRevenue, updateBooking } from "./controllers/bookingController.js";

import { deleteRideData, getAllRides, postRides, updateRideData } from "./controllers/RideController.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//usercontroller
app.post("/register", register),
app.post("/login", login),
app.put("/updateUser", updateUser),
app.get("/getAllUsers", getAllUsers),
  //app.post("/verify-otp", verifyOtp),
app.post("/googleLogin", googleLogin);

  //bookingcontroller
app.put("/updateBooking", updateBooking),
app.post("/createbooking", createBooking),
app.delete("/cancelBooking", cancelBooking),
app.get("/getBookingData", getBookingData);
app.get("/getTotalRevenue", getTotalRevenue);

//ridecontroller
app.post("/createride", postRides), app.get("/getRideData", getAllRides);
app.put("/updateRideData", updateRideData),
app.delete("/deleteRideData/:id", deleteRideData),
app.listen(process.env.Port, () => {
    connectDB();
    console.log("server is running on PORT:" + process.env.Port);
});
