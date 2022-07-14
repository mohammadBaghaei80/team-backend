import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { UseJwtGuard } from '../../../guards/jwt.guard';
import { StandingEntity } from '../entities/standing.entity';
import { StandingService } from '../service/standing.service';

@ApiTags('[Standing]')
@Controller('standing')
export class StandingController {
  constructor(private standingService: StandingService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createStanding(@Body() standingDto: StandingEntity): Promise<StandingEntity> {
    return await this.standingService.createStanding(standingDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(':id')
  async updateStanding(@Body() standingDto: StandingEntity, @Param('id') standingId: string): Promise<StandingEntity> {
    return await this.standingService.updateStanding(standingDto, standingId);
  }

  @Get('all')
  async getAllStanding(): Promise<StandingEntity[]> {
    return await this.standingService.getAllStanding()
  }

  @Get(':id')
  async getOneStanding(@Param('id') standingId: string): Promise<StandingEntity> {
    return await this.standingService.getOneStanding(standingId)
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(':id')
  async deleteStanding(@Param('id') standingId: string): Promise<StandingEntity> {
    return await this.standingService.deleteStanding(standingId)
  }

}