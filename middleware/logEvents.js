const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// Function to create logs directory if it doesn't exist
const createLogsDir = async () => {
    const logsDirPath = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logsDirPath)) {
        await fsPromises.mkdir(logsDirPath);
    }
}

// Function to log events
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        await createLogsDir();
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

// Middleware function to log requests
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };
