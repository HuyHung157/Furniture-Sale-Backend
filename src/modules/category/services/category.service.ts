import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, Repository } from "typeorm";
import { CategoryCreateRequestDto } from "../dto/category-create-request";
import { Category } from "../models/category.entity";

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  public async isCategoriesExist(categoriesId: string[]) {
    const categoriesCount = await this.categoryRepository
    .createQueryBuilder('category')
    .andWhere('category.isActive = TRUE')
    .andWhere('category.isArchived = FALSE')
    .andWhere('category.id IN (:...ids)', {
      ids: categoriesId,
    })
    .getCount();
    return categoriesCount > 0;;
  }

  public createCategory(input: CategoryCreateRequestDto){
    
  }

	private getOrder(desc: boolean) {
		return desc ? 'DESC' : 'ASC';
	}
}