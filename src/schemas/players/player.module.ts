import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { SharedModule } from '../shared/shared.module';
import { PlayerService } from './service/player.service';
import { PlayerController } from './controller/player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), SharedModule],
  providers: [PlayerService],
  controllers: [PlayerController],
})

export class PlayerModule {
}