import { BaseService } from "@infrastructure/services/base.service";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4, v5 } from 'uuid';
import { User } from "@modules/user/models/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Account } from "../models/account.entity";
import { CommonConstants } from "@constants/common.constants";
import { EnvironmentService } from "@infrastructure/environment/environment.service";
import { AuthConstants } from "../constants/auth.constants";
import { TokenData } from "../interfaces/token-data.interface";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<User>,
    protected readonly connection: Connection,
    private readonly environmentService: EnvironmentService,
    private readonly redisService: RedisService,
  ) {
    super(connection);
  }

  async getUserByEmail(email: string): Promise<any> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .andWhere('user.email = :email', { email })
      .andWhere('user.isActive = TRUE AND user.isArchived = FALSE');
    const entity = await query.getOne();
    return entity;
  }

  async hashPassword(passwordInput: string): Promise<string> {
    const password = await bcrypt.hash(
      passwordInput,
      parseInt(this.environmentService.getKey(CommonConstants.SALT_ROUNDS), 10),
    );
    return password;
  }

  public isPasswordMatch(candidatePassword: string, password: string) {
    const isMatch: boolean = bcrypt.compareSync(candidatePassword, password);
    return isMatch;
  }

  /**
   * Return JWT [Token, RefreshToken] pair for account
   *
   * @param account account data used for signing the token
   * @param tokenExpireTime token expire time, default 60m
   */
  public async generateToken(account: Account, tokenExpireTime: string = AuthConstants.DEFAULT_TOKEN_EXPIRE_TIME): Promise<string[]> {
    const user = account.user;

    const userRoles = (user.userRoles || []).map(r => r.role);

    const userData: TokenData = {
      id: account.id,
      user: {
        id: user.id,
        accountId: account.id,
        roles: userRoles
      }
    };

    // Sign a token
    const token = jwt.sign(
      userData,
      this.environmentService.getKey(CommonConstants.JWT_SECRET_KEY),
      { expiresIn: tokenExpireTime },
    );

    // Create never expired refresh token
    const refreshToken = v5(
      this.environmentService.getKey(CommonConstants.JWT_SECRET_KEY),
      v4(),
    );
    this.redisService.setRefreshTokenForId(refreshToken, account.id);

    return Promise.all([token, refreshToken]);
  }
}