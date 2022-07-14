import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamOne: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamTwo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  leagueName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stadium: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatarTeamOne: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatarTeamTwo: string;

}