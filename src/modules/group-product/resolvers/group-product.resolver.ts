import { Resolver } from '@nestjs/graphql';
import { GroupProductService } from '../services/group-product.service';

@Resolver()
export class GroupProductResolver {
  constructor(private readonly groupProductService: GroupProductService) {}
}
