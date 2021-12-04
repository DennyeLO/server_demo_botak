const express = require('express');
const router = express.Router();
const card_Controller = require('../Controller/Card');

router.post('/pick',card_Controller.pick);

module.exports = router;