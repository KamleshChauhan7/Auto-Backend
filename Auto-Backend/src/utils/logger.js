import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const logDir = path.join(process.cwd(), 'public', 'logger');


const filterByLevel = (level) => winston.format((info) => {
  return info.level === level ? info : false;
})();

const createTransport = (level) => new winston.transports.DailyRotateFile({
  filename: path.join(logDir, `%DATE%-${level}.log`),
  datePattern: 'YYYY-MM-DD',
  level,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  auditFile: path.join(logDir, '.audit-ignore.json'),
  format: winston.format.combine(
    filterByLevel(level),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
});
const logger = winston.createLogger({
  transports: [
    createTransport('info'),
    createTransport('warn'),
    createTransport('error')
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ]
});

export default logger;
