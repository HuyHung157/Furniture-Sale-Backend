import { BaseResponseDto } from '@infrastructure/models/base-response.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAdminCreateRequestDto } from '../dto/user-admin-create-request';
import { UserListResponseDto } from '../dto/user-list-response';
import { UserListRequestDto } from '../dto/user-list-resquest';
import { UserAdminService } from '../services/user-admin.service';

@Resolver()
export class UserAdminResolver {
  constructor(private readonly userAdminService: UserAdminService){}

  @Query(() => UserListResponseDto)
  async getUserAdminList(
    @Args('input') input: UserListRequestDto
  ): Promise<UserListResponseDto> {
    const result = await this.userAdminService.getUserAdminList(input)
    return {
      totalItems: result.count,
      items: result.items,
    }
  }

  @Mutation(() => BaseResponseDto)
  async createUserAdmin(
    @Args('input') input: UserAdminCreateRequestDto
  ){
    return this.userAdminService.createUserAdmin(input);
  }
}
