import { Ride } from "../models/RideModel.js";
import { Booking } from "../models/BookingRide.js";

//----------create Booking--------
export const createBooking = async (req, res) => {
  try {
    const { bookingId, user } = req.body;
    const seats = Number(req.body.seats);

    const ride = await Ride.findById(bookingId);
    if (!ride) return res.status(404).send({ message: "Ride not found" });

    if (ride.availableSeats < seats) {
      return res.status(400).send({ message: "Not enough seats available" });
    }

    const booking = await Booking.create({ ...req.body, bookingId, user, seats });

    const updatedRide = await Ride.findByIdAndUpdate(bookingId, { $inc: { availableSeats: -seats } }, { new: true });

    return res.status(200).send({
      message: "Ride booked successfully",
      booking,
      updatedRide,
    });
  } catch (error) {
    console.error("Fail to submit data", error);
    res.status(500).send({ message: "Server error", error });
  }
};

//-------------upDate Booking-----------
export const updateBooking = async (req, res) => {
  try {
    const { id, rideId, ...updateFields } = req.body;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).send({ message: "Booking not found" });
    const result = await Booking.updateOne({ _id: id }, { $set: updateFields });
    if (result.modifiedCount > 0) {
      if (updateFields.status === "Cancelled") {
        await Ride.findByIdAndUpdate(rideId, { $inc: { availableSeats: booking.seats } });
      }
      if (updateFields.status === "Booked" && booking.status !== "Booked") {
        await Ride.findByIdAndUpdate(rideId, { $inc: { availableSeats: -booking.seats } });
      }
      return res.status(200).send({ message: "Booking updated successfully", data: result });
    } else {
      return res.status(404).send({ message: "Booking not found or no changes made" });
    }
  } catch (error) {
    console.error("Fail to update data", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

//----------deleteBooking--------------
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, id } = req.body;
    const seats = Number(req.body.seats);
    const data = await Booking.deleteOne({ _id: id });
    console.log(data);
    if (data.deletedCount == 1) {
      await Ride.findByIdAndUpdate(bookingId, { $inc: { availableSeats: seats } });
      res.status(200).send({ message: "Ride delete successfully", data });
    } else res.status(400).send({ message: "Failed to delete ride" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

//-----------getBookingData---------------
export const getBookingData = async (req, res) => {
  try {
    const data = await Booking.find({}).populate("bookingId").populate("user");
    if (data) res.status(200).send({ data });
    else res.status(404).send({ message: "Unable to find ride data" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

//get Revenue Data

export const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      { $match: { status: "Booked" } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $toDate: "$journeyDate" },
            },
          },
          revenue: { $sum: "$amount" },
          bookingCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          revenue: 1,
          // bookingCount: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);
    console.log(revenue);
    if (revenue) res.status(200).send(revenue);
    else res.status(400).send({ message: "failed to get totalrevenue" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
