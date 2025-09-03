const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Transporte archivo único para todos los niveles (debug captura todo)
const fileTransport = new winston.transports.DailyRotateFile({
    dirname: logDir,
    filename: `app-%DATE%.log`,        // archivo único
    datePattern: 'YYYY-MM-DD',
    level: 'debug',                    // registra todos los niveles >= debug
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',                   // conservar por 14 días
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
    ),
});

// Transporte consola para desarrollo
const consoleTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] ${level}: ${message}`
        )
    ),
});

const winstonLogger = winston.createLogger({
    level: 'debug',
    transports: [consoleTransport, fileTransport],
})

module.exports = winstonLogger;
