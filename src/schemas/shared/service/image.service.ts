import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(ImageEntity) private imageRep: Repository<ImageEntity>) {
  }

  async createImage(file: Express.Multer.File): Promise<any> {

    const image = new ImageEntity();
    image.fileName = file.originalname;
    image.filePath = file.path;
    await this.imageRep.save(image);

    return image.id;
  }

  async deleteImage(imageId: string): Promise<any> {
    return await this.imageRep.delete({ id: imageId });
  }

  async findImage(imageId: string): Promise<ImageEntity> {
    return await this.imageRep.findOne({ where: { id: imageId } });
  }
}