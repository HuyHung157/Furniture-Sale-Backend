import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { BaseService } from '@infrastructure/services/base.service';
import { SignInRequestDto } from '@modules/auth/dto/sign-in-request.dto';
import { SignUpRequestDto } from '@modules/auth/dto/sign-up-request.dto';
import { TokenDto } from '@modules/auth/dto/token.dto';
import { Account } from '@modules/auth/models/account.entity';
import { AuthService } from '@modules/auth/services/auth.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { UserListRequestDto } from '../dto/user-list-resquest';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserRole } from '../models/user-role.entity';
import { User } from '../models/user.entity';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    protected readonly connection: Connection,
  ) {
    super(connection)
  }

  async getUserList(input: UserListRequestDto): Promise<any> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.isActive = TRUE AND user.isArchived = FALSE')

    const [items, count] = await query.getManyAndCount();
    return { items, count };
  }

  async signUp(input: SignUpRequestDto): Promise<BaseResponseDto> {
    const { email, phoneNumber, phoneNumberPrefix } = input;
    const userWithSameEmail = await this.authService.getUserByEmail(email);
    if (userWithSameEmail) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_EMAIL' });
    }

    const userWithSamePhoneNumber = await this.userRepository.findOne({ phoneNumber, phoneNumberPrefix });
    if (userWithSamePhoneNumber) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_PHONE' });
    }

    let user: User;
    const handler = async (queryRunner: QueryRunner) => {
      const manager = queryRunner.manager;

      let accountData = {
        email: input.email,
        password: await this.authService.hashPassword(input.password),
      }

      const account = await manager.save(Account, accountData) as Account;

      const userData = {
        accountId: account.id,
        email: account.email,
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        birthday: input.birthday,
        phoneNumberPrefix: input.phoneNumberPrefix,
        phoneNumber: input.phoneNumber,
        city: input.city,
        district: input.district,
        ward: input.ward,
        address: input.address,
      }

      user = await manager.save(User, userData) as User;

      await manager.save(UserRole, {
        userId: user.id,
        role: UserRoleEnum.USER,
      });
    }

    await this.performActionInTransaction(handler);

    if (user) {
      //TODO send mail create to email create
    }

    return new BaseResponseDto('Created success !', 200);
  }

  async signIn(input: SignInRequestDto): Promise<TokenDto> {
    const { email, password } = input;
    const query = this.userRepository.
      createQueryBuilder('user')
      .where('user.isActive = TRUE AND user.isArchived = FALSE')
      .leftJoinAndSelect(
        'user.account',
        'account',
        'account.isActive = TRUE AND account.isArchived = FALSE'
      )
      .leftJoinAndSelect(
        'user.userRoles',
        'userRoles',
        'userRoles.isActive = TRUE AND userRoles.isArchived = FALSE'
      )
      .andWhere('account.email = :email', { email });

    const user = await query.getOne();
    if (!user) {
      throw new BadRequestException({
        messageCode: 'ACCOUNT_INVALID',
        message: 'User is not exist or has been deactivated'
      });
    }

    const account = user.account;
    if (!account) {
      throw new ForbiddenException({
        messageCode: 'ACCOUNT_INVALID',
        message: 'User is not exist or has been deactivated'
      });
    }

    const isPasswordMatch = this.authService.isPasswordMatch(password, account.password);
    if (!isPasswordMatch) {
      throw new ForbiddenException({
        messageCode: 'ACCOUNT_INVALID',
        message: 'Wrong password'
      });
    }

    const [token, refreshToken] = await this.authService.generateToken({
      ...user.account,
      user
    })

    return { token, refreshToken };
  }


}
