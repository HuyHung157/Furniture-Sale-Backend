import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { SignUpByProviderRequestDto } from '@modules/auth/dto/sign-in-provider-request.dto';
import { SignInRequestDto } from '@modules/auth/dto/sign-in-request.dto';
import { SignUpRequestDto } from '@modules/auth/dto/sign-up-request.dto';
import { TokenDto } from '@modules/auth/dto/token.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckEmailUsedDto } from '../dto/check-email-used.dto';
import { UserListResponseDto } from '../dto/user-list-response';
import { UserListRequestDto } from '../dto/user-list-resquest';
import { UserService } from '../services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService){}

  @Query(() => UserListResponseDto)
  async getUserList(
    @Args('input') input: UserListRequestDto
  ): Promise<UserListResponseDto> {
    const result = await this.userService.getUserList(input)
    return {
      totalItems: result.count,
      items: result.items,
    }
  }

  @Mutation(() => BaseResponseDto)
  async signUp(
    @Args('input') input: SignUpRequestDto
  ){
    return this.userService.signUp(input);
  }

  @Mutation(() => TokenDto )
  async signIn(
    @Args('input') input: SignInRequestDto
  ){
    return this.userService.signIn(input);
  }

  @Mutation(() => TokenDto )
  async signInWithProvider(
    @Args('input') input: SignUpByProviderRequestDto
  ){
    return this.userService.signInWithProvider(input);

  }

  @Query(() => CheckEmailUsedDto)
  async checkEmailUsed(
    @Args('email') email: string,
  ): Promise<CheckEmailUsedDto> {
    const isEmailUsed = await this.userService.checkEmailUsed(email);
    return { isEmailUsed };
  }
}
