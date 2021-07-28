import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { BaseService } from '@infrastructure/services/base.service';
import { SignInRequestDto } from '@modules/auth/dto/sign-in-request.dto';
import { SignUpRequestDto } from '@modules/auth/dto/sign-up-request.dto';
import { TokenDto } from '@modules/auth/dto/token.dto';
import { AuthService } from '@modules/auth/services/auth.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserListRequestDto } from '../dto/user-list-resquest';
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
    const userWithSameEmail = this.authService.getUserByEmail(email);
    if (userWithSameEmail) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_EMAIL' });
    }

    const userWithSamePhoneNumber = await this.userRepository.findOne({ phoneNumber, phoneNumberPrefix });
    if (userWithSamePhoneNumber) {
      throw new BadRequestException({ messageCode: 'DUPLICATED_PHONE' });
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
