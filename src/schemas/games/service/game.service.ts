import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameDto } from '../dto/Game.dto';
import { ImageService } from '../../shared/service/image.service';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private gameRep: Repository<GameEntity>,
    private imageService: ImageService) {
  }

  async createGame(gameDto: GameDto): Promise<GameEntity> {
    const game = new GameEntity();
    game.teamOne = gameDto.teamOne;
    game.teamTwo = gameDto.teamTwo;
    game.result = gameDto.result;
    game.leagueName = gameDto.leagueName;
    game.stadium = gameDto.stadium;
    game.date = gameDto.date;
    game.time = gameDto.time;
    game.avatarTeamOne = await this.imageService.findImage(gameDto.avatarTeamOne);
    game.avatarTeamTwo = await this.imageService.findImage(gameDto.avatarTeamTwo);
    return await this.gameRep.save(game);
  }

  async updateGame(gameDto: GameDto, gameId: string): Promise<GameEntity> {
    const findGame = await this.gameRep.findOne({ where: { id: gameId } });
    if (!findGame) throw new BadRequestException('not found game');

    findGame.teamOne = gameDto.teamOne;
    findGame.teamTwo = gameDto.teamTwo;
    findGame.result = gameDto.result;
    findGame.leagueName = gameDto.leagueName;
    findGame.stadium = gameDto.stadium;
    findGame.date = gameDto.date;
    findGame.time = gameDto.time;
    findGame.avatarTeamOne = await this.imageService.findImage(gameDto.avatarTeamOne);
    findGame.avatarTeamTwo = await this.imageService.findImage(gameDto.avatarTeamTwo);
    return await this.gameRep.save(findGame);
  }

  async getOneGame(gameId: string): Promise<GameEntity> {
    const findGame = await this.gameRep.findOne({ where: { id: gameId } });
    if (!findGame) throw new BadRequestException('not found game');
    return findGame;
  }

  async deleteGame(GameId: string): Promise<any> {
    return await this.gameRep.delete({ id: GameId });
  }

  async getAllGame(): Promise<GameEntity[]> {
    return await this.gameRep.find();
  }

}