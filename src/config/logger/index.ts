import { format, toZonedTime } from 'date-fns-tz';
import { randomUUID } from 'node:crypto';

export const LOGGER_CONFIG = {
  pinoHttp: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty' }
        : undefined,
    timestamp: () => {
      const now = new Date();
      const timezone = 'America/Recife';
      const zonedTime = toZonedTime(now, timezone);
      const formattedTime = format(zonedTime, "yyyy-MM-dd'T'HH:mm:ssXXX");
      return `,"time":"${formattedTime}"`;
    },
    serializers: {
      req: (req) => ({
        id: req.headers['x-request-id'] || randomUUID(),
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  },
};
