import { User } from "../models/User.js";
import { Ride } from "../models/RideModel.js";
import mongoose from "mongoose";

export const postRides = async (req, res) => {
  try {
    const { driverId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).send({ message: "Invalid driver ID format" });
    }
    const checkdriver = await User.findById(driverId);
    if (!checkdriver) {
      return res.status(400).send({ message: "Driver not Found" });
    }
    const data = await Ride.create({
      ...req.body,
      driverId,
    });
    if (data) res.status(200).send({ message: "Ride posted successfully", data });
    else res.status(400).send({ message: "Failed to post ride" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

export const updateRideData = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const data = await Ride.findByIdAndUpdate(id, { $set: rest },{new:true});
    if (data) res.status(200).send({ message: "Ride Updated successfully", data });
    else res.status(400).send({ message: "Failed to update ride" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

export const deleteRideData = async (req, res) => {
  try {
    const data = await Ride.deleteOne({
      _id: req.params.id,
    });
    if (data.deletedCount === 1) res.status(200).send({ message: "Ride delete successfully" });
    else res.status(400).send({ message: "Failed to delete ride" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

export const getRideData = async (req, res) => {
  try {
    const data = await Ride.find({}).populate("driver");
    if (data) res.status(200).send({ data });
    else res.status(404).send({ message: "Unable to find ride data" });
  } catch (error) {
    console.log("Fail to submit data", error);
  }
};

export const getAllRides = async (req, res) => {
  try {
    const data = await Ride.find({}).populate("driverId");
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(404).send({ message: "failed to get data" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
