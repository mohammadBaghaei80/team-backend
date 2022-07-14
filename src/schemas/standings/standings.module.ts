import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandingEntity } from './entities/standing.entity';
import { StandingService } from './service/standing.service';
import { StandingController } from './controller/standing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StandingEntity])],
  providers: [StandingService],
  controllers: [StandingController],
})

export class StandingsModule {

}