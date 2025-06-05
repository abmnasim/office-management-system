import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import { getAllUsers, getUserByEmail, storeUser } from "../models/user.model.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @param {Object} req - The request object containing user details
 * @param {Object} res - The response object to send back the result
 * @return {Object} - Returns a success message or an error message
 * @throws {Error} - Throws an error if the user already exists or if validation fails
 * @example
 * // Example request body
 * {
 *   "name": "John Doe",
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 */
const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    // Check email domain
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'bansberrysg.com') {
        return res.status(400).json({ message: "Email must be from bansberrysg.com domain" });
    }

    if (getUserByEmail(email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP valid for 10 minutes

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        _id: uuid(),
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        verified: false,
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };

    storeUser(newUser);

    res.status(201).json({
        message: "OTP sent to your email",
        verified: false,
        email: newUser.email
    });
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 * @param {Object} req - The request object containing user credentials
 * @param {Object} res - The response object to send back the result
 * @return {Object} - Returns a success message or an error message
 * @throws {Error} - Throws an error if the user is not found, password is invalid, or user is not verified
 * @example
 * // Example request body
 * {
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const users = await getAllUsers();
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(402).json({ message: "Invalid password" });
    }

    if (!user.verified) {
        return res.status(403).json({ message: "User not verified", verified: false });
    }

    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}

/**
 * @desc Verify OTP for a user
 * @route POST /api/auth/verify-otp
 * @access Public
 * @param {Object} req - The request object containing user email and OTP
 * @param {Object} res - The response object to send back the result
 */
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.otp != otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otpExpiry)) {
        return res.status(400).json({ message: "OTP has expired" });
    }

    user.verified = true;
    user.otp = null; // Clear OTP after verification
    user.otpExpiry = null; // Clear OTP expiry after verification
    user.updatedAt = new Date();

    storeUser(user);

    res.status(200).json({
        message: "OTP verified successfully"
    });
}

/**
 * @desc Resend OTP to a user
 * @route POST /api/auth/resend-otp
 * @access Public
 * @param {Object} req - The request object containing user email
 * @param {Object} res - The response object to send back the result
 * @returns {Object} - Returns a success message or an error message
 * @throws {Error} - Throws an error if the user is not found or if email is not provided
 * @example
 * // Example request body
 * {
 *   "email": "john.doe@example.com"
 */
const resendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.updatedAt = new Date();

    storeUser(user);

    res.status(200).json({
        message: "OTP resent successfully"
    });
}

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Public
 * @param {Object} req - The request object
 * @param {Object} res - The response object to send back the result
 * @return {Object} - Returns a success message indicating logout
 * @throws {Error} - Throws an error if logout fails
 * @example
 * // Example request body
 * {}
 */
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
}

export { login, logout, register, resendOtp, verifyOtp };

