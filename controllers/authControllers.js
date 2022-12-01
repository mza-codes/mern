require('dotenv').config();

const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAuth = asyncHandler(async (req, res, next) => {
    let emailExists = await User.findOne({ email: req.body.email })
    if (emailExists || emailExists !== null) {
        res.status(406).json({ success: false, message: 'User Already Exists' });
    };
    req.body.password = await bcrypt.hashSync(req.body?.password, 15);
    const resUser = await User.create(req.body);
    const { password, ...other } = resUser._doc; // _doc is specified to get the actual JSON data
    // generating jwt token, access data from headers  
    const token = jwt.sign({ userId: other._id }, process.env.JWT_KEY ?? "m$auth", { expiresIn: "1h" });
    res.setHeader('user_token', token);
    res.status(200).json({ success: true, data: other });
});

exports.auth = asyncHandler(async (req, res, next) => {
    const dbUser = await User.findOne({ email: req.body.email });
    if (dbUser) {
        let stat = await bcrypt.compareSync(req.body.password, dbUser.password);
        if (stat === true) {
            const { password, ...other } = dbUser._doc; // _doc is specified to get the actual JSON data
            // generating jwt token, access data from headers
            const token = jwt.sign({ userId: other._id }, process.env.JWT_KEY ?? "m$auth", { expiresIn: "1h" });
            res.setHeader('user_token', token);
            res.status(200).json({ success: true, data: other });
        } else {
            res.status(401).json({ success: false, message: 'Incorrect Password' });
        };
    } else if (!dbUser || dbUser == null) {
        res.status(404).json({ success: false, message: 'User Does not Exist' });
    } else {
        res.status(404).json({ success: false, message: 'User Does Not Exist #2' });
    };
});

exports.updateAuth = asyncHandler(async (req, res, next) => {
    console.log("REACHED updateAuth");
    log.info("fd")
    console.log("req.id", req.userId);
    // res.status(200).json({ success: true, message: "nothing here" });
    res.send("Good");
});

exports.removeAuth = asyncHandler(async (req, res, next) => {
    console.log("REACHED removeAyth route");
    console.log("req.id", req.userId);
    res.send('removeAuth delete ro)ute');
});