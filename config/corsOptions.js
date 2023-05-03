const allowedOrigins = require('./allowedOrigins');

function verifyOrigin(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

const corsOptions = {
    optionsSuccessStatus: 200,
    origin: verifyOrigin
}

module.exports = corsOptions;
