import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from '../entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerDto } from '../dto/player.dto';
import { ImageService } from '../../shared/service/image.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity) private playerRep: Repository<PlayerEntity>,
    private imageService: ImageService) {
  }

  async createPlayer(playerDto: PlayerDto): Promise<PlayerEntity> {
    const findPlayer = await this.playerRep.findOne({ where: { name: playerDto.name } });
    if (findPlayer) throw new BadRequestException('conflict player');

    const player = new PlayerEntity();
    player.name = playerDto.name;
    player.number = playerDto.number;
    player.age = playerDto.age;
    player.post = playerDto.post;
    player.nationality = playerDto.nationality;
    player.gameCount = playerDto.gameCount;
    player.goal = playerDto.goal;
    player.avatar = await this.imageService.findImage(playerDto.imageId);
    return await this.playerRep.save(player);
  }

  async updatePlayer(playerDto: PlayerDto, playerId: string): Promise<PlayerEntity> {
    const findPlayer = await this.playerRep.findOne({ where: { id: playerId } });
    if (!findPlayer) throw new BadRequestException('not found player');

    findPlayer.name = playerDto.name;
    findPlayer.number = playerDto.number;
    findPlayer.age = playerDto.age;
    findPlayer.post = playerDto.post;
    findPlayer.nationality = playerDto.nationality;
    findPlayer.gameCount = playerDto.gameCount;
    findPlayer.goal = playerDto.goal;
    findPlayer.avatar = await this.imageService.findImage(playerDto.imageId);
    return await this.playerRep.save(findPlayer);
  }

  async getOnePlayer(playerId: string): Promise<PlayerEntity> {
    const findPlayer = await this.playerRep.findOne({ where: { id: playerId } });
    if (!findPlayer) throw new BadRequestException('not found player');
    return findPlayer;
  }

  async deletePlayer(playerId: string): Promise<any> {
    return await this.playerRep.delete({ id: playerId });
  }

  async getAllPlayer(): Promise<PlayerEntity[]> {
    return await this.playerRep.find();
  }
}