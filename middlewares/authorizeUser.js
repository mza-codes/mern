require('dotenv').config();

const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken, refreshTokens } = require('../controllers/authControllers');

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

exports.refreshToken = asyncHandler(async (req, res) => {
    console.log("Refreshing token");
    const currentToken = req.body?.refreshToken;
    if (!refreshTokens.includes(currentToken)) {
        return res.status(401).json({ success: false, message: "Invalid Refresh Token,Unable to Continue" });
    };
    let data = jwt.verify(currentToken, process.env.JWT_REFRESH_KEY ?? "m$authRefresh");

    const newToken = createAccessToken({ _id: data?.userId });
    const newRefreshToken = createRefreshToken({ _id: data?.userId });
    // Removing current refresh token from cache/Array
    refreshTokens.filter((item) => item !== currentToken);
    refreshTokens.push(newRefreshToken);

    res.setHeader('user_token', newToken);
    return res.status(200).json({ success: true, refreshToken: newRefreshToken });
});