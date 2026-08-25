import crypto from "crypto";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-character code without spaces
  },
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST: /api/users/forgot-password
// Create Nodemailer Transporter
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    };

    // Send email inside try block
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error); // Log full error in Node terminal
    return res.status(500).json({ message: error.message });
  }
};

// POST: /api/users/reset-password/:token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    // Hash and update password
    user.password = await bcrypt.hash(password, 10);

    // FIX: Set to null so Mongoose explicitly clears these fields in MongoDB
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};