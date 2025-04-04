const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const { verifyToken } = require('./controllers/authController'); // Import verifyToken

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes); // Use verifyToken middleware
app.use('/admin', verifyToken, adminRoutes); // Use verifyToken middleware

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});