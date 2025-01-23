const nodemailer = require('nodemailer');

const submitInquiry = async (req, res) => {
    const { name, email, phone, rentalDate, message } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !rentalDate || !message) {
        return res.status(400).json({
            message: 'Name, email, phone, rental date, and message are required.'
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
            from: email, // Sender email
            to: 'rental-support@example.com', // Replace with the rental inquiries email
            subject: `Rental Inquiry from ${name}`,
            text: `You have received a new rental inquiry from ${name} (${email}, ${phone}):\n\nRental Date: ${rentalDate}\nMessage: ${message}`
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Get the test email URL for preview
        const emailPreviewURL = nodemailer.getTestMessageUrl(info);

        res.status(200).json({
            message: 'Your inquiry has been submitted successfully.',
            emailPreviewURL // Return the preview URL for testing
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
