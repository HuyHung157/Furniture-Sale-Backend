
import { Args, Query, Resolver } from "@nestjs/graphql";
import { CityListResponseDto } from "../dto/city-list.response";
import { DistrictListResponseDto } from "../dto/district-list.response";
import { WardListResponseDto } from "../dto/ward-list.response";

import { DataVNService } from "../services/data-vn.service";

@Resolver()
export class DataVNResolver {
	constructor(private readonly dataVNService: DataVNService) { }

	@Query(() => CityListResponseDto)
  async getListCityVN() {
    return await this.dataVNService.getListCityVN();
  }

  @Query(() => DistrictListResponseDto)
  async getListDistrictByCityCode(@Args('cityCode') cityCode: string) {
    return await this.dataVNService.getListDistrictByCityCode(cityCode);
  }

  @Query(() => WardListResponseDto)
  async getListWardByDistrictCode(@Args('districtCode') districtCode: string) {
    return await this.dataVNService.getListWardByDistrictCode(districtCode);
  }
}