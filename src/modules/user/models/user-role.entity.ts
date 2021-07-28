import { BaseEntity } from "@infrastructure/models/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'user-role'})
export class UserRole extends BaseEntity {
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'role',
    type: 'varchar',
  })
  role: string;

  @ManyToOne( () => User, user => user.userRoles, )
  @JoinColumn({ name: 'user_id' })
  user: User;
}