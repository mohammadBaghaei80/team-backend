import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { SharedModule } from '../shared/shared.module';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), SharedModule],
  providers: [GameService],
  controllers: [GameController],
})

export class GameModule {

}