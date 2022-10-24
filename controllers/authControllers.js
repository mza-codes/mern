const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const bcrypt = require('bcrypt');

exports.auth = asyncHandler(async (req, res, next) => {
    const dbUser = await User.findOne({ email: req.body.email })
    console.log(dbUser);
    if (dbUser) {
        let stat = await bcrypt.compareSync(req.body.password, dbUser.password);
        if (stat === true) {
            const { password, ...other } = dbUser._doc
            res.status(200).json({ success: true, data: other })
        } else if (stat === false) {
            res.status(200).json({ success: false, message: 'Incorrect Password' })
        } else {
            res.status(200).json({ success: false, message: 'Incorrect Password #2' })
        }
    } else if (!dbUser || dbUser == null) {
        res.status(200).json({ success: false, message: 'User Does not Exist' })
    } else {
        res.status(200).json({ success: false, message: 'User Does Not Exist #2' })
    }
})

exports.createAuth = asyncHandler(async (req, res, next) => {
    let emailExists = await User.findOne({ email: req.body.email })
    if (emailExists || emailExists !== null) {
        res.status(200).json({ success: false, message: 'User Already Exists' })
    }
    req.body.password = await bcrypt.hashSync(req.body?.password, 15);
    const resUser = await User.create(req.body);
    const { password, ...other } = resUser._doc
    res.status(200).json({ success: true, data: other });
})

exports.updateAuth = asyncHandler(async (req, res, next) => {
    res.send('updateAuth put route)')
})

exports.removeAuth = asyncHandler(async (req, res, next) => {
    res.send('removeAuth delete ro)ute')
})