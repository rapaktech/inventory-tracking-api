const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const v1Router = require('./routes/v1');
const baseRouter = require('./routes/base');

app.get('/', express.static(__dirname + '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // 100 requests per IP
});
app.use(limiter);
app.use(morgan('dev'));

// routes
app.use('/api/v1', v1Router);
app.use('/', baseRouter);

// handle errors and exceptions
app.use((error, req, res, next)=> {
    console.log(error);
    return res.status(500).json({ message: 'Some error occured. Please try again later!' });
});

module.exports = app;
