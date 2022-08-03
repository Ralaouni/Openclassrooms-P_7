const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controller/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/verify', auth,userCtrl.token)

module.exports = router;