import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { UseJwtGuard } from '../../../guards/jwt.guard';
import { GameService } from '../service/game.service';
import { GameEntity } from '../entities/game.entity';
import { GameDto } from '../dto/game.dto';

@ApiTags('[Game]')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createPlayer(@Body() gameDto: GameDto): Promise<GameEntity> {
    return await this.gameService.createGame(gameDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(':id')
  async updatePlayer(@Body() gameDto: GameDto, @Param('id') gameId: string): Promise<GameEntity> {
    return await this.gameService.updateGame(gameDto, gameId);
  }

  @Get('all')
  async getAllPlayer(): Promise<GameEntity[]> {
    return await this.gameService.getAllGame()
  }

  @Get(':id')
  async getOnePlayer(@Param('id') gameId: string): Promise<GameEntity> {
    return await this.gameService.getOneGame(gameId)
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(':id')
  async deletePlayer(@Param('id') gameId: string): Promise<GameEntity> {
    return await this.gameService.deleteGame(gameId)
  }

}