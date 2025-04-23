import { createClient } from 'redis';
import logger from '../utils/logger.util';

const redisConfig = require('../config/redis.config');

const NAMESPACE = 'ecom';


/**
 * Centralized key manager for Redis keys to enforce naming conventions.
 */
export const RedisPrefix = {
  SESSION: 'session:',
  USER: 'user:',
  CART: 'cart:',
  PRODUCT: 'product:',
  PRODUCT_STOCK: 'product:stock:',
  ORDER_TEMP: 'order:temp:',
  CHECKOUT_LOCK: 'checkout:lock:',
  CATEGORY: 'category:',
  SEARCH_SUGGESTION: 'search:suggestions:',
  VENDOR: 'vendor:',
  PROMO: 'promo:',
  INVENTORY_LOCK: 'inventory:lock:',
  REVIEW_COUNT: 'review:count:',
  QUEUE: 'queue:',
  RATE_LIMIT: 'rate_limit:',
};

/**
 * Utility to build Redis keys using prefixes
 */
export const RedisKey = {
  session: (sessionId: string) => `${RedisPrefix.SESSION}${sessionId}`,
  user: (userId: string | number) => `${RedisPrefix.USER}${userId}`,
  cart: (userId: string | number) => `${RedisPrefix.CART}${userId}`,
  product: (productId: string | number) => `${RedisPrefix.PRODUCT}${productId}`,
  productStock: (productId: string | number) => `${RedisPrefix.PRODUCT_STOCK}${productId}`,
  orderTemp: (userId: string | number) => `${RedisPrefix.ORDER_TEMP}${userId}`,
  checkoutLock: (userId: string | number) => `${RedisPrefix.CHECKOUT_LOCK}${userId}`,
  category: (categorySlug: string) => `${RedisPrefix.CATEGORY}${categorySlug}`,
  searchSuggestion: (term: string) => `${RedisPrefix.SEARCH_SUGGESTION}${term}`,
  vendor: (vendorId: string | number) => `${RedisPrefix.VENDOR}${vendorId}`,
  promo: (code: string) => `${RedisPrefix.PROMO}${code}`,
  inventoryLock: (productId: string | number) => `${RedisPrefix.INVENTORY_LOCK}${productId}`,
  reviewCount: (productId: string | number) => `${RedisPrefix.REVIEW_COUNT}${productId}`,
  rateLimit: (ip: string) => `${RedisPrefix.RATE_LIMIT}ip:${ip}`,
  queue: (name: string) => `${RedisPrefix.QUEUE}${name}`,
};

class RedisClient {
  private client;

  constructor() {
    const env = process.env.NODE_ENV || 'development';
    const config = redisConfig[env];

    const redisUrl = config.url || 'redis://localhost:6379';

    this.client = createClient({
      url: redisUrl,
      socket: {
          reconnectStrategy: () => false
      }
    });

    this.client.on('error', (err) => {
      logger.error(`Redis connection error: ${err}`);
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
      logger.info('Redis connected');
    }
  }

  async set(key: number | string, value: any, ttlInSeconds?: number): Promise<void> {
    if(!this.client.isOpen){
      return;
    }
    const stringValue = JSON.stringify(value);
    if (ttlInSeconds) {
      await this.client.setEx(String(key), ttlInSeconds, stringValue);
    } else {
      await this.client.set(String(key), stringValue);
    }
  }

  async get(key: number | string) {
    if(!this.client.isOpen){
      return null;
    }
    const result = await this.client.get(String(key));
    return result ? (JSON.parse(result)) : null;
  }

  async delete(key: number | string): Promise<void> {
    if(!this.client.isOpen){
      return;
    }
    await this.client.del(String(key));
  }

  async flushAll(): Promise<void> {
    if(!this.client.isOpen){
      return;
    }
    await this.client.flushAll();
  }

  getInstance() {
    return this.client;
  }

  createQueueKey(queueKey: string, key: string) {
    return RedisKey.queue(`${queueKey}:${key}`);
  }

  async enqueue(queueKey: string, item: any): Promise<void> {
    if(!this.client.isOpen){
      return;
    }
    await this.client.rPush(queueKey, JSON.stringify(item));
  }

  async dequeue(queueKey: string) {
    if(!this.client.isOpen){
      return null;
    }
    const result = await this.client.lPop(queueKey);
    return result ? JSON.parse(result) : null;
  }

  async getQueueLength(queueKey: string) {
    if(!this.client.isOpen){
      return null;
    }
    return await this.client.lLen(queueKey);
  }

  async getQueueValues(queueKey: string) {
    if(!this.client.isOpen){
      return null;
    }
    const queue = await this.client.lRange(queueKey, 0, -1);
    return queue?.map((item) => JSON.parse(item));
  }
}

export const redisClient = new RedisClient();
