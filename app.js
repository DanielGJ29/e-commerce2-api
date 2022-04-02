const compression = require('compression');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morga = require('morgan');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { productsRouter } = require('./routes/products.routes');
const {cartRouter} = require('./routes/cart.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Limit the time
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from your IP, Try after 1 minute'
  })
);

//Set more security headers
app.use(helmet());

//  Compress response on the brouser
app.use(compression());

//Log incoming request to the server
app.use(morga('dev'));

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', cartRouter);

app.use(globalErrorHandler);

module.exports = { app };
