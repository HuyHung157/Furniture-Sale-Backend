import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResponseDto } from 'src/infrastructure/models/base-response.dto'
import { BaseSearchRequestDto } from 'src/infrastructure/models/search/base-search-request';
import { CategoryCreateRequestDto } from '../dto/category-create-request'
import { CategoryResponseDto } from '../dto/category-item-response';
import { CategoryListResponseDto } from '../dto/category-list-response';
import { CategoryUpdateRequestDto } from '../dto/category-update-request';
import { CategoryService } from '../services/category.service'

@Resolver()
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) { }

	@Query(() => CategoryListResponseDto)
  async getCategoryList(): Promise<CategoryListResponseDto> {
    return await this.categoryService.getListCategory();
  }

  @Query(() => CategoryListResponseDto)
  // @UseGuards(GqlAuthGuard, UserOwnerAdminGuard)
  async getCategoryListWithPaging(
    @Args('input') input: BaseSearchRequestDto,
  ): Promise<CategoryListResponseDto> {
    return await this.categoryService.getListCategory(input);
  }

  @Query(() => CategoryResponseDto)
  async getCategoryById(@Args('id') id: string): Promise<CategoryResponseDto> {
    return await this.categoryService.getCategoryById(id);
  }

	@Mutation(() => BaseResponseDto)
	async createCategory(@Args('input') input: CategoryCreateRequestDto): Promise<BaseResponseDto>   {
		await this.categoryService.createCategory(input)
		return new BaseResponseDto('Create Success', 200);
	}

  @Mutation(() => BaseResponseDto)
	async updateCategory(@Args('input') input: CategoryUpdateRequestDto): Promise<BaseResponseDto>   {
		await this.categoryService.updateCategory(input)
		return new BaseResponseDto('Update Success', 200);
	}

  @Mutation(() => BaseResponseDto)
	async deleteCategory(@Args('id') id: string): Promise<BaseResponseDto>  {
		await this.categoryService.deleteCategory(id)
		return new BaseResponseDto('Delete success !', 200);
	}
}