import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../enums/gender.enum';

@Entity('profile')
export class UserInfoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  city: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}