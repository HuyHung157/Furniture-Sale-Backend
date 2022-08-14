import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { BaseService } from '@infrastructure/services/base.service';
import { SignUpRequestDto } from '@modules/auth/dto/sign-up-request.dto';
import { Account } from '@modules/auth/models/account.entity';
import { AuthService } from '@modules/auth/services/auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { UserAdminCreateRequestDto } from '../dto/user-admin-create-request';
import { UserListRequestDto } from '../dto/user-list-resquest';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserRole } from '../models/user-role.entity';
import { User } from '../models/user.entity';

@Injectable()
export class UserAdminService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  async getUserAdminList(input: UserListRequestDto): Promise<any> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.isActive = true')
      .andWhere('user.isArchived = false');

    const [items, count] = await query.getManyAndCount();
    return { items, count };
  }

  public async createUserAdmin(
    input: UserAdminCreateRequestDto,
  ): Promise<BaseResponseDto> {
    const { email, phoneNumber, phoneNumberPrefix } = input;
    const userWithSameEmail = await this.authService.getUserByEmail(email);
    if (userWithSameEmail) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_EMAIL' });
    }

    const userWithSamePhoneNumber = await this.userRepository.findOneBy({
      phoneNumber,
      phoneNumberPrefix,
    });
    if (userWithSamePhoneNumber) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_PHONE' });
    }

    let user: User;
    const handler = async (queryRunner: QueryRunner) => {
      const manager = queryRunner.manager;

      const accountData = {
        email: input.email,
        password: await this.authService.hashPassword(input.password),
      };

      const account = (await manager.save(Account, accountData)) as Account;

      const userData = {
        accountId: account.id,
        email: account.email,
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        birthday: input.birthday,
        phoneNumberPrefix: input.phoneNumberPrefix,
        phoneNumber: input.phoneNumber,
        profileUrl: input.profileUrl,
        city: input.city,
        district: input.district,
        ward: input.ward,
        address: input.address,
      };

      user = (await manager.save(User, userData)) as User;

      await manager.save(UserRole, {
        userId: user.id,
        role: UserRoleEnum.STAFF,
      });
    };

    await this.performActionInTransaction(handler);

    if (user) {
      //TODO send mail create to email create
    }

    return new BaseResponseDto('Created success !', 200);
  }
}
