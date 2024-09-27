const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const errorHandler = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
}); 
