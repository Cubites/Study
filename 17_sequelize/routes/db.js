const express = require('express');
const db = require('../controller/db.controller');

let router = express.Router();

router.post('/user/register', db.register);

router.get('/user/search/', db.searchUser);
router.get('/profile/search');

module.exports = router;