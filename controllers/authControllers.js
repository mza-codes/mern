require('dotenv').config();

const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_KEY ?? "m$auth", { expiresIn: "1h" });
};

exports.createRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_KEY ?? "m$authRefresh", { expiresIn: "1h" });
};

exports.createAuth = asyncHandler(async (req, res, next) => {
    const duplicateUser = await User.findOne({ email: req.body.email });

    if (duplicateUser || duplicateUser !== null) {
        return res.status(406).json({ success: false, message: 'User Already Exists' });
    };

    req.body.password = await bcrypt.hashSync(req.body?.password, 15);
    const newUser = await User.create(req.body);
    const { password, ...other } = newUser._doc; // _doc is specified to get the actual JSON data

    const token = createAccessToken(other);
    res.setHeader('user_token', token);

    return res.status(200).json({ success: true, data: other });
});

exports.auth = asyncHandler(async (req, res, next) => {
    const dbUser = await User.findOne({ email: req.body.email });

    if (!dbUser || dbUser == null) {
        return res.status(404).json({ success: false, message: 'User Does not Exist' });
    };

    const stat = await bcrypt.compareSync(req.body.password, dbUser.password);
    if (stat === true) {
        const { password, ...other } = dbUser._doc; // _doc is specified to get the actual JSON data

        const token = createAccessToken(other);
        res.setHeader('user_token', token);

        return res.status(200).json({ success: true, data: other });
    } else {
        return res.status(401).json({ success: false, message: 'Incorrect Password' });
    };
});

exports.logout = asyncHandler(async (req, res, next) => {
    console.log("Logout User");
    return res.status(200).json({ success: true, message: "Logout Complete", data: {} });
});

exports.updateAuth = asyncHandler(async (req, res, next) => {
    console.log("REACHED updateAuth");
    console.log("req.id", req.userId);
    res.send("Good");
});

exports.removeAuth = asyncHandler(async (req, res, next) => {
    console.log("REACHED removeAuth route");
    console.log("req.id", req.userId);
    res.send('removeAuth delete ro)ute');
});