import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { UserAdminCreateRequestDto } from '@modules/user/dto/user-admin-create-request';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService){

  }

  // @Mutation(() => BaseResponseDto)
  // async createUserAdmin(
  //   @Args('input') input: UserAdminCreateRequestDto
  // ) {
  //   return this.authService.createUserAdmin(input);
  // }
}
