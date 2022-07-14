import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageEntity } from '../entities/image.entity';
import { ImageService } from '../service/image.service';
import { ImageDto } from '../dto/image.dto';
import { Response } from 'express';

@ApiTags('[Image]')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ImageDto })
  async createImage(@UploadedFile('file') file: Express.Multer.File): Promise<ImageEntity> {
    return await this.imageService.createImage(file);
  }

  @Get(':id')
  async sendFile(@Param('id') idFile: string, @Res() res: Response) {
    res.sendFile(idFile, { root: 'assets' });
  }

  @Put(':id')
  async deleteImage(@Param('id') imageId: string): Promise<ImageEntity> {
    return await this.imageService.deleteImage(imageId);
  }

}