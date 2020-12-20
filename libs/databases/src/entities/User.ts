import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "user_name",type: "varchar", length: "20", unique: true})
  userName: string;

  @Column({name: "first_name",type: "varchar", length: "20"})
  firstName: string;

  @Column({name: "last_name",type: "varchar", length: "20"})
  lastName: string;

  @Column({name: "is_active", type: "boolean"})
  isActive: boolean;
}
