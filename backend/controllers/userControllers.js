const User = require("../models/user");
const Task = require("../models/task");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


require('dotenv').config();


exports.createUser = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "Name,email,role, and password are required" });
        }

        const duplicate = await User.findOne({ email });
        if (duplicate) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPassword, role });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.userIn = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "None";
    } else {
      cookieOptions.secure = false;
      cookieOptions.sameSite = "Lax";
    }

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.updateUser = async(req, res) => {
    try {
        const userid = req.user.id;
        const updates = req.body;

        if (!userid) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        Object.assign(user, updates);

        await user.save(); // **Important**

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to update user" });
    }
};


exports.userProfile = async(req, res) => {
    try {
        const userId = req.user.id; // assume authMiddleware sets req.user

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user" });
    }
};



exports.deleteUser = async(req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Task.deleteMany({ createdBy: userId });

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User and their tasks deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
};


exports.userLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
};
