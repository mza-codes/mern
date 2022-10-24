const express = require('express');
const authControllers = require('../controllers/authControllers');
const router = express.Router();

// @route - /mflux/auth/
// router.route('/').get(authControllers.auth).post(authControllers.createAuth);
router.route('/register').post(authControllers.createAuth);
router.route('/login').post(authControllers.auth);

// @route - /mflux/auth/<id>
router.route('/:id').put(authControllers.updateAuth).delete(authControllers.removeAuth);

module.exports = router;