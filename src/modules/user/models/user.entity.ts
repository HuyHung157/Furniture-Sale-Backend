import { BaseEntity } from "@infrastructure/models/base.entity";
import { Account } from "@modules/auth/models/account.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity({ name: 'user'})
export class User extends BaseEntity{
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  country?: string;

  @Column({
    name: 'phone_number_prefix',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  phoneNumberPrefix?: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'profile_url',
    type: 'varchar',
    nullable: true,
  })
  profileUrl?: string;

  @Column({
    name: 'birthday',
    type: 'timestamp without time zone',
    nullable: true,
  })
  birthday?: Date;

  @Column({
    name: 'gender',
    type: 'varchar',
    nullable: true,
  })
  gender?: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
  })
  address?: string;

  @Column({
    name: 'ward',
    type: 'varchar',
    nullable: true,
  })
  ward?: string;

  @Column({
    name: 'district',
    type: 'varchar',
    nullable: true,
  })
  district?: string;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: true,
  })
  city?: string;

  @Column({
    name: 'account_id',
    type: 'uuid'
  })
  accountId: string;

  @OneToOne( () => Account, entity => entity.user, { nullable: true } )
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany( () => UserRole, userRole => userRole.user, { nullable: true }, )
  userRoles?: UserRole[];
}