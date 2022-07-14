import { Module } from '@nestjs/common';
import appConfiguration from './app/configuration';
import swaggerConfiguration from './swagger/configuration';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app/app.config';
import { SwaggerConfig } from './swagger/swagger.config';


@Module({
  imports: [ConfigModule.forRoot({
    load: [appConfiguration, swaggerConfiguration],
  })],
  providers: [AppConfig, SwaggerConfig],
})
export class ConfigurationModule {
}
