import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to find user by ID
const findUserById = async (userId) => {
    return await userModel.findById(userId);
};

// Function to handle common errors
const handleError = (res, error, message = "Server error") => {
    console.error(error);
    return res.status(500).json({ message });
};

// Register new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Validate email and password
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        handleError(res, error, "Error creating user");
    }
};

// Login user and return JWT token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ success: true, token, userId: user._id });
    } catch (error) {
        handleError(res, error, "Error logging in user");
    }
};

// Get user profile (based on authenticated user)
const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.body.userId);  // ใช้ req.body.userId จาก middleware
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error, "Error retrieving user profile");
    }
};

// Update user
const updateUser = async (req, res) => {
    const { name, email, password, userId } = req.body;

    try {
        const user = await findUserById(req.body.userId);  // ใช้ req.body.userId จาก middleware
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) user.password = await bcrypt.hash(password, 10);

        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        handleError(res, error, "Error updating user");
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await findUserById(req.body.userId);  // ใช้ req.body.userId จาก middleware
        if (!user) return res.status(404).json({ message: "User not found" });

        await userModel.deleteOne({ _id: req.body.userId });  // ใช้ req.body.userId จาก middleware
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        handleError(res, error, "Error deleting user");
    }
};

export { registerUser, loginUser, getUser, updateUser, deleteUser };
