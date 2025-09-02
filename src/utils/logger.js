const winstonLogger = require('./winstonLogger');

function getCallerInfo() {
    const stack = new Error().stack;
    const stackLines = stack.split('\n');

    // La línea 3 es normalmente la llamada real (ajustar si necesario)
    const callerLine = stackLines[3] || stackLines[2];

    const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
    if (!match) return '[unknown]';

    const [_, file, line, col] = match;
    const relativePath = file.split('/src/').pop(); // para acortar la ruta
    return `[${relativePath}:${line}]`;
}

const logger = {
    error: (msg) => winstonLogger.error(`${getCallerInfo()} ${msg}`),
    warn: (msg) => winstonLogger.warn(`${getCallerInfo()} ${msg}`),
    info: (msg) => winstonLogger.info(`${getCallerInfo()} ${msg}`),
    debug: (msg) => winstonLogger.debug(`${getCallerInfo()} ${msg}`),
};

module.exports = logger;
