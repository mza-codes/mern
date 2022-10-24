const express = require('express');
const router = express.Router()
const wishlistController = require('../controllers/wishlistControllers')

// @route - /mflux/wishlist/
router.route('/view').post(wishlistController.getItems);
router.route('/add').post(wishlistController.createItem);
router.route('/update').put(wishlistController.updateItem);
router.route('/remove').delete(wishlistController.removeItem);

module.exports = router;