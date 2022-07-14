import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigurations } from '../../configuration/multer/multer-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageService } from './service/image.service';
import { ImageController } from './controller/image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.registerAsync({ useClass: MulterConfigurations })],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})

export class SharedModule {
}