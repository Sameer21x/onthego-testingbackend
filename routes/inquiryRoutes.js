const express = require('express');
const { submitInquiry } = require('../controllers/inquiryController');

const router = express.Router();

// POST /api/rental-inquiry
router.post('/rentalinquiry', submitInquiry);

module.exports = router;
