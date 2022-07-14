import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configuration/app/app.config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseOkInterceptor } from './interceptors/response-ok.interceptor';
import { SwaggerConfig } from './configuration/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseOkInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const appConfig = app.get<AppConfig>(AppConfig);
  const swaggerConfig = app.get<SwaggerConfig>(SwaggerConfig);
  if (appConfig.mode == "developer") {
    swaggerConfig.initialize(app);
  }


  await app.listen(appConfig.port);
}
bootstrap();
