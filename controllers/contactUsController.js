const nodemailer = require('nodemailer');

const contactUs = async (req, res) => {
    const { firstName, lastName, phone, email, message } = req.body;
  
    // Validate input fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }
  
    try {
      const testAccount = await nodemailer.createTestAccount();
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: "micaela.baumbach30@ethereal.email",
          pass: "sE8yYSn6ztQduPQqdq"
        }
      });
  
      const mailOptions = {
        from: email,
        to: 'admin@onthegomedicalsupply.com',
        subject: `Contact Form Submission from ${firstName} ${lastName}`,
        text: `You have received a new message from ${firstName} ${lastName} (${email}, ${phone}):\n\n${message}`
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      const emailPreviewURL = nodemailer.getTestMessageUrl(info);
  
      res.status(200).json({
        message: 'Your message has been sent successfully.',
        emailPreviewURL // This will help for testing the email delivery
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        message: 'An error occurred while sending your message. Please try again later.',
        error: error.message
      });
    }
  };
  

module.exports = { contactUs };
