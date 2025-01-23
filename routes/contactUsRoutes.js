const express = require('express');
const { contactUs } = require('../controllers/contactUsController');

const router = express.Router();

// POST /api/contact-us
router.post('/contactus', contactUs);

module.exports = router;
