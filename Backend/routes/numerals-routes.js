const express = require('express');
const HttpError = require('../models/http-error');
const router = express.Router();
const numeralController = require('../controllers/numerals-controller');
const validate = require('../models/validate');



router.get('/:value/:type', validate, numeralController.convertNumeral);;


module.exports = router;