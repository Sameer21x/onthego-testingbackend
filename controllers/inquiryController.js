const nodemailer = require('nodemailer');

const submitInquiry = async (req, res) => {
    const { name, email, phone, rentalDate, message, productName } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !rentalDate || !message || !productName) {
        return res.status(400).json({
            message: 'Name, email, phone, rental date, message, and product name are required.'
        });
    }

    try {
        // Create a test account using Ethereal
        const testAccount = await nodemailer.createTestAccount();

        // Set up Nodemailer transport using Ethereal
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: "micaela.baumbach30@ethereal.email",
                pass: "sE8yYSn6ztQduPQqdq"
            }
        });

        // Email content and structure
        const mailOptions = {
            from: email,
            to: 'rental-support@example.com', 
            subject: `Rental Inquiry for ${productName} from ${name}`,
            text: `You have received a new rental inquiry for ${productName} from ${name} (${email}, ${phone}):\n\nRental Date: ${rentalDate}\nMessage: ${message}`
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Get the test email URL for preview
        const emailPreviewURL = nodemailer.getTestMessageUrl(info);

        res.status(200).json({
            message: 'Your inquiry has been submitted successfully.',
            emailPreviewURL,
            productName 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'An error occurred while submitting your inquiry. Please try again later.',
            error: error.message
        });
    }
};

module.exports = { submitInquiry };
