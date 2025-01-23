const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importing CORS
const contactUsRoutes = require('./routes/contactUsRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Allow all origins
app.use(bodyParser.json());

// Routes
app.use('/api', contactUsRoutes);
app.use('/api', inquiryRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the testing On The Go backend server!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
