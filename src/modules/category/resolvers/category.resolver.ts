import { Resolver } from '@nestjs/graphql'
import { CategoryService } from '../services/category.service'

@Resolver()
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) { }

}