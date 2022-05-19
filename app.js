const express = require('express');
const cors = require('cors');

const {
    usersRoutes,
    mealsRoutes,
    ordersRoutes,
    restaurantsRoutes,
} = require('./routes/all.routes');

const { globalErrorHandler } = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/restaurants', restaurantsRoutes);
app.use('/api/v1/meals', mealsRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('*', globalErrorHandler);

module.exports = { app };
