const express = require("express");
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const router = express.Router();
const SALT = 5;

// @@ Signup
router.post("/signup", async (req, res) => {
    const validation = registerValidation(req.body);

    if(validation.error) {
        return res.status(400).json({ message: validation.error.details[0].message });
    }

    const { name, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email: email });

        if(user) {
            return res.status(400).json({ message: "User already exists." });
        }

        user = new UserModel({
            name: name,
            email: email,
            password: password
        });
        
        user.password = await bcrypt.hash(user.password, SALT);
        
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600000 }, (err, token) => {
            if(err) {
                throw err;
            }

            res.json({ token });
        }); 
    } catch(ex) {
        console.log(ex);
        res.status(500).json({ message: ex.message });
    }
});

// @@ Login
router.post("/login", async (req, res) => {
    try {
        const validation = loginValidation(req.body);

        if(validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message })
        }
    
        const { email, password } = req.body;
    
        const user = await UserModel.findOne({ email: email });
    
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600000 }, (err, token) => {
            if(err) {
                throw err;
            }

            res.json({ token: token })
        });
    } catch(ex) {
        console.log(ex);
        res.status(500).json({ message: ex.message });
    }
});


module.exports = router;