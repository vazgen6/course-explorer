const ErrorResponse = require('../utils/error-response');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.log(`${err.stack}`.red);

    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        console.log('here');
        const message = Object.values(err.errors).map(e => e.message);
        error = new ErrorResponse(message, 400);
    }

    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || "Internal Server Error" });
};

module.exports = errorHandler;
