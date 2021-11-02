const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

const authMiddleware = ((req, res, next) => {
    let token = req.header("x-auth-token");

    if(!token) {
        return res.status(401).json({ message: "You are not authorized" });
    }

    // const decoded = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch(ex) {
        res.status(401).json({ message: "Invalid token"});
    }
});

module.exports = authMiddleware;