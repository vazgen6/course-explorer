const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
dotenv.config({ path: "./config/config.env" });

const app = express();

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));
}

// Routes
const courses = require('./routes/courses');

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.use('/api/v1/courses', courses);