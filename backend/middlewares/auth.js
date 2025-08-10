const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async(req, res, next) => {
    try {
        const token = req.cookies.token; // cookie se token lo

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};