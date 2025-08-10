const express = require("express");
const { createUser, userIn, userLogout, userProfile, deleteUser, updateUser } = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/auth");
const { isUser } = require("../middlewares/role");
const router = express.Router();


router.post("/signup", createUser);
router.post("/signin", userIn);
router.post("/logout", authMiddleware, isUser, userLogout);
router.get("/profile", authMiddleware, isUser, userProfile);
router.delete("/deleteuser/:id", authMiddleware, isUser, deleteUser);
router.put("/updateProfile", authMiddleware, isUser, updateUser);



module.exports = router;