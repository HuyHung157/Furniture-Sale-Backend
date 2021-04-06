import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
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


	private getOrder(desc: boolean) {
		return desc ? 'DESC' : 'ASC';
	}
}