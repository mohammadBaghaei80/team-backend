import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StandingEntity } from '../entities/standing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StandingService {
  constructor(@InjectRepository(StandingEntity) private standingRep: Repository<StandingEntity>) {
  }

  async createStanding(standingDto: StandingEntity): Promise<StandingEntity> {
    const findStanding = await this.standingRep.findOne({ where: { teamName: standingDto.teamName } });
    if (findStanding) throw new BadRequestException('conflict team');

    return await this.standingRep.save(standingDto);
  }

  async updateStanding(standingDto: StandingEntity, standingId: string): Promise<StandingEntity> {
    return await this.standingRep.save(standingDto);
  }

  async getOneStanding(standingId: string): Promise<StandingEntity> {
    const findStanding = await this.standingRep.findOne({ where: { id: standingId } });
    if (!findStanding) throw new BadRequestException('not found standing');
    return findStanding;
  }

  async deleteStanding(standingId: string): Promise<any> {
    return await this.standingRep.delete({ id: standingId });
  }

  async getAllStanding(): Promise<StandingEntity[]> {
    return await this.standingRep.find();
  }

}