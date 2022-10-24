const asyncHandler = require('../middlewares/asyncHandler');
const Wishlist = require('../models/Wishlist');
const objectId = require('mongoose')

exports.getItems = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const items = await Wishlist.find({ userId: req.body?.userId })
    res.status(200).json({ success: true, data: items });
});

exports.createItem = asyncHandler(async (req, res, next) => {
    console.log('create Item');
    console.log(req.body);
    const stat = await Wishlist.create(req.body);
    res.status(200).json({ success: true, data: stat });
});

exports.updateItem = asyncHandler(async (req, res, next) => {
    console.log('update Item');

});

exports.removeItem = asyncHandler(async (req, res, next) => {
    console.log('remove Item');
});