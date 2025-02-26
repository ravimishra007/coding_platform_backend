import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { adminValidation } from '../validation/joiValidation.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config();

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    // Validate request body
    const { error } = adminValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) return res.status(400).send('Admin already registered.');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new admin
    const admin = new Admin({
      ...req.body,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({
      message: 'Admin registered successfully',
      data: admin
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate Input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // 2️⃣ Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // 3️⃣ Validate password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // 4️⃣ Generate JWT Token
    const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "96h",
    });

    // 5️⃣ Send Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        createdAt: admin.createdAt,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Get All Admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).send('Error fetching admins');
  }
};

// Get Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send('Admin not found');
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).send('Error fetching admin');
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) return res.status(404).send('Admin not found');
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).send('Error updating admin');
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).send('Admin not found');
    res.status(200).send('Admin deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting admin');
  }
};



// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS  // Your Gmail App Password
  }
});

// Forgot Password (Generate Reset Token)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Store in Database with Expiry (15 mins)
    admin.resetPasswordToken = resetTokenHash;
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await admin.save();

    // Send Reset Email
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Reset link sent to email' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the received token (as it was stored hashed in DB)
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find admin with valid token & not expired
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() } // Token should not be expired
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password & clear reset fields
    admin.password = hashedPassword;
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
