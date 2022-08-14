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
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'provider_id',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  providerId: string;

  @Column({
    name: 'firebase_uid',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  firebaseUid: string;

  @OneToOne( () => User, entity => entity.account, { nullable: true })
  user: User
}