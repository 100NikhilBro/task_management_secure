exports.isUser = (req, res, next) => {
    if (req.user && req.user.role === "User") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, user only" });
    }
};