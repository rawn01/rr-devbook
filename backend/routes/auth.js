const express = require("express");
const authMiddleware = require("../middleware/auth");
const UserModel = require("../models/User");

const router = express.Router();

// @@ Show authenticated user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const id = req.user.id;

        const user = await UserModel.findOne({ _id: id }).select("-password");
    
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
    
        res.json({ user: user });
    } catch(ex) {
        res.status(500).json({ message: ex.message });
    }
});

module.exports = router;