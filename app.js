const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/appError');

const app = express();
app.use(express.json());

console.log(process.env.JWT_SECRET_KEY);

connectDB();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/borrow', borrowRoutes);
app.use('/review', reviewRoutes);

app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
