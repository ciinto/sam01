import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar', length: '20', unique: true })
  userName: string;

  @Column({ name: 'first_name', type: 'varchar', length: '20' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '20' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: '60' })
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
