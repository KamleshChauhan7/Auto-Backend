import logger from './logger.js';

export const apiLogger = (req, res, next) => {
  const start = Date.now();

  const requestLog = [
    [
      ["route", req.originalUrl],
      ["method", req.method],
      ["body", JSON.stringify(req.body)]
    ]
  ];
  logger.info(`[REQUEST] ${new Date().toLocaleString()} ${JSON.stringify(requestLog)}`);

  res.on('finish', () => {
    const duration = Date.now() - start;

    const responseLog = [
      [
        ["route", req.originalUrl],
        ["method", req.method],
        ["status", res.statusCode],
        ["duration_ms", duration]
      ]
    ];
    logger.info(`[RESPONSE] ${new Date().toLocaleString()} ${JSON.stringify(responseLog)}`);
  });

  next();
};