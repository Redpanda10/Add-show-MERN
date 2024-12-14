const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});