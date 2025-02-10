export const RATE_LIMIT_CONFIG = [
  {
    ttl: parseInt(process.env.THROTTLER_TTL || '60000', 10),
    limit: parseInt(process.env.THROTTLER_LIMIT || '10', 10),
  },
];
