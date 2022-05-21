import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        // 开启全局隐式转换，表示我们不需要 @Type 显示转换了
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalInterceptors(new WrapResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('MyCoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
