import { User } from "../models/User.js";
import { generateToken } from "../config/auth.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

//import nodemailer from "nodemailer";
//import twilio from "twilio";

//------------registerUser------------
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkemail = await User.findOne({ email });
    if (checkemail) {
      return res.status(401).send({ message: "Email already exists, try with another email" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      ...req.body,
      email,
      password: hashPassword,
    });

    if (data) {
      return res.status(201).send({
        message: "User created successfully ",
      });
    } else {
      return res.status(401).send({
        message: " unable to create a User ",
      });
    }
  } catch (error) {
    console.error("fail to submit data:", error);
    return res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

//-----------upDateUser---------------
export const updateUser = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const data = await User.findByIdAndUpdate(id, { $set: rest }, { new: true });
    if (data) res.status(200).send({ message: "User Succussfully updated", data });
    else res.status(401).send({ message: "Unable to updated a User,try again:" });
  } catch (error) {
    console.log("fail to submit data" + error);
  }
};

//--------------loginUser-----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    // if (!user.isVerified) {
    //   return res.status(401).send({ message: "Please verify your phoneNumebr before logging in." });
    // }
    const Ismatch = await bcrypt.compare(password, user.password);
    if (!Ismatch) {
      res.status(401).send({ message: " Invalid Or Wrong Password" });
    }

    const token = generateToken(user._id);
    res.status(200).send({
      message: "User Login Successfully",
      email: user.email,
      userName: user.userName,
      token,
      driverId: user._id,
      phoneNumber: user.phoneNumber,
    });

    // else
    //     res.status(401).send({ message: "User Login Successfully" })
  } catch (error) {
    console.log("fail to submit data");
  }
};

//-------------getUSers----------------

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) res.status(200).send({ users });
    else res.status(400).send({ message: "failed to get users" });
  } catch (error) {
    console.log("error", error);
  }
};

// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp, phonenumber } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     const checkphoneNumber = await User.findOne({ phonenumber });
//     console.log(checkphoneNumber);
//     if (!checkphoneNumber) {
//       res.status(401).send({ message: "Check Your Phone Numner,try again" });
//     }
//     if (user.isVerified) {
//       return res.status(400).json({ message: "User already verified" });
//     }
//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }
//     // OTP is valid
//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({ message: "Email verified successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error", error: err.message });
//   }
// };

export const googleLogin = async (req, res) => {
  try {
     const { tokenId } = req.body; // Frontend should send the Google tokenId

    // Verify token
    const client = new OAuth2Client(process.env.CLIENT_ID); // Replace with your Google Client ID

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If not, create user
      user = await User.create({
        email,
        userName: name,
        password: "", // No password for Google login
        // profilePic: picture,
        isVerified: false, // Google login is verified
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "User logged in successfully with Google",
      token,
      email: user.email,
      userName: user.userName,
      driverId: user._id,
      //profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Google login failed", error: error.message });
  }
};
