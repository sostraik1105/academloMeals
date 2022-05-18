const express = require('express');
const cors = require('cors');

const { usersRoutes } = require('./routes/users.routes');

const { globalErrorHandler } = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRoutes);
app.use('*', globalErrorHandler);

module.exports = { app };
