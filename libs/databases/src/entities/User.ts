import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar', length: '20' })
  @Index('IDX_USER_NAME', { unique: true })
  userName: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: '60' })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: '20' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '20' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: '60' })
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column({ name: 'dob', type: 'datetime' })
  dob: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
