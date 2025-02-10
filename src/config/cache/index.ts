import { redisStore } from 'cache-manager-redis-yet';

export const CACHE_CONFIG = {
  isGlobal: true,
  store: redisStore,
  ttl: parseInt(process.env.REDIS_TTL || '86400000', 10),
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};
