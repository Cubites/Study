const express = require('express');
const db = require('../controller/db.controller');

let router = express.Router();

router.post('/user/register', db.register);
router.post('/user/update', db.userUpdate);

router.get('/user/search/', db.searchUser);
router.get('/profile/search');

router.get('/user/totalsearch', db.totalSearch);

module.exports = router;