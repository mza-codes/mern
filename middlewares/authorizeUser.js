require('dotenv').config();

const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require('../controllers/authControllers');

exports.checkAuthorization = asyncHandler(async (req, res, next) => {
    console.log("Checking Authorization");
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "User token not found" });
    };

    let data = jwt.verify(token, process.env.JWT_KEY ?? "m$auth");
    req.userId = data.userId;
    next();
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "User token not found" });
    };

    let data = jwt.verify(token, process.env.JWT_KEY ?? "m$authRefresh");
    req.userId = data.userId;
    next();
});