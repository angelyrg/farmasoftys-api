const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// 📄 Transportes rotativos por nivel
const createTransport = (level) =>
    new winston.transports.DailyRotateFile({
        dirname: logDir,
        filename: `${level}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        level,
        zippedArchive: false,
        maxSize: '20m',
        maxFiles: '14d', // conserva por 14 días
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
                ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
            )
        ),
    });

// 🎨 Consola en desarrollo
const consoleTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.printf(
            ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
        )
    ),
});

const winstonLogger = winston.createLogger({
    level: 'info',
    transports: [
        consoleTransport,            // 💻 Consola con colores
        createTransport('error'),    // 📄 logs/error-YYYY-MM-DD.log
        createTransport('info'),     // 📄 logs/info-YYYY-MM-DD.log
        createTransport('debug'),    // 📄 logs/debug-YYYY-MM-DD.log
    ],
});

module.exports = winstonLogger;
