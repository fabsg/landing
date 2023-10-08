import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private rateLimiter: RateLimiterMemory;

  constructor() {
    this.rateLimiter = new RateLimiterMemory({
      points: 10,
      duration: 60,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.rateLimiter.consume(req.ip, 1);
      next();
    } catch (err) {
      res.status(429).json({ message: 'Too Many Requests' });
    }
  }
}