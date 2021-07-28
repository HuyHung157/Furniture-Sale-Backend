import { BaseEntity } from "@infrastructure/models/base.entity";
import { User } from "@modules/user/models/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'account'})
export class Account extends BaseEntity{
  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar'
  })
  password: string;

  @OneToOne( () => User, entity => entity.account, { nullable: true })
  user: User
}