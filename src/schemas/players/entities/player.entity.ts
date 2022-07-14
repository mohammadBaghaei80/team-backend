import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from '../../shared/entities/image.entity';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  age: string;

  @Column()
  post: string;

  @Column()
  nationality: string;

  @Column()
  gameCount: string;

  @Column()
  goal: string;

  @OneToOne(() => ImageEntity, { cascade: true, eager: true })
  @JoinColumn()
  avatar: ImageEntity;

}