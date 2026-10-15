require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./configs/db');
const taskRoutes = require('./routes/taskRoutes');

// express app
const app = express();

// connect to mongodb
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount Routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})