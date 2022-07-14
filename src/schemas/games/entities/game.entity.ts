import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from '../../shared/entities/image.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamOne: string;

  @Column()
  teamTwo: string;

  @Column()
  result: string;

  @Column()
  leagueName: string;

  @Column()
  stadium: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @OneToOne(() => ImageEntity, { cascade: true, eager: true })
  @JoinColumn()
  avatarTeamOne: ImageEntity;

  @OneToOne(() => ImageEntity, { cascade: true, eager: true })
  @JoinColumn()
  avatarTeamTwo: ImageEntity;

}