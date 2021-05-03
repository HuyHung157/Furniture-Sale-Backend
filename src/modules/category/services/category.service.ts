import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseSearchRequestDto } from "src/infrastructure/models/search/base-search-request";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, Repository } from "typeorm";
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

  public async createCategory(input) {
    if (input.index) {
      const query = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.index > :index', { index: input.index })
        .orWhere('category.index = :index', { index: input.index })
        .andWhere('category.isActive = true')
        .andWhere('category.isArchived = false');
      const res = await query.getMany();
      if (res.length > 0) {
        const data = res.map(element => {
          element.index = Number(element.index) + 1;
          return element;
        });
        data.push(input);
        const query = await this.categoryRepository.save(data);
        return query;
      } else {
        const query = await this.categoryRepository.save(input);
        return query;
      }
    } else {
      const query = await this.categoryRepository.save(input);
      return query;
    }
  }

  public async getListCategory(input: BaseSearchRequestDto = undefined) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.isActive = true')
      .andWhere('category.isArchived = false')
      .orderBy('category.index', 'ASC');

    if (input && input.paging) {
      query
        .take(input.paging.pageSize)
        .skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));
    }

    const [items, count] = await query.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }

  public async getCategoryById(id: string) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .andWhere('category.isActive = true')
      .andWhere('category.isArchived = false');
    const result = await query.getOne();
    return result;
  }

  public async updateIndexCategories(input) {
    const query = await this.categoryRepository.save(input.categories);
    return query;
  }

  public async deleteCategory(id) {
    const query = await this.categoryRepository.update(id, {
      isArchived: true,
    });
    return query;
  }

  private getOrder(desc: boolean) {
    return desc ? 'DESC' : 'ASC';
  }
}