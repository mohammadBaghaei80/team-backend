import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from '../../shared/entities/image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('standing')
export class StandingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  rank: string;

  @ApiProperty()
  @Column()
  teamName: string;

  @ApiProperty()
  @Column()
  goalDifference: string;

  @ApiProperty()
  @Column()
  win: string;

  @ApiProperty()
  @Column()
  equal: string;

  @ApiProperty()
  @Column()
  lost: string;

  @ApiProperty()
  @Column()
  goal: string;

  @ApiProperty()
  @Column()
  score: string;

}