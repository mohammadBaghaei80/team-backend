import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlayerService } from '../service/player.service';
import { PlayerDto } from '../dto/player.dto';
import { PlayerEntity } from '../entities/player.entity';
import { ApiTags } from '@nestjs/swagger';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { UseJwtGuard } from '../../../guards/jwt.guard';

@ApiTags('[Player]')
@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createPlayer(@Body() playerDto: PlayerDto): Promise<PlayerEntity> {
    return await this.playerService.createPlayer(playerDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(':id')
  async updatePlayer(@Body() playerDto: PlayerDto, @Param('id') playerId: string): Promise<PlayerEntity> {
    return await this.playerService.updatePlayer(playerDto, playerId);
  }


  @Get('all')
  async getAllPlayer(): Promise<PlayerEntity[]> {
    return await this.playerService.getAllPlayer()
  }

  @Get(':id')
  async getOnePlayer(@Param('id') playerId: string): Promise<PlayerEntity> {
    return await this.playerService.getOnePlayer(playerId)
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(':id')
  async deletePlayer(@Param('id') playerId: string): Promise<PlayerEntity> {
    return await this.playerService.deletePlayer(playerId)
  }

}