import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
