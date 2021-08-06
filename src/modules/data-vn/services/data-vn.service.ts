import { Injectable } from "@nestjs/common";
import fs from 'fs-extra';

@Injectable()
export class DataVNService {
  constructor() { }

  public async getListCityVN() {
    const path = `./json/vn-city.json`;
    const cityVnData = await this.getDataInFile(path)
    const dataFile = Object.values(cityVnData);
    const items = this.formatData(dataFile, true).filter(i => i.code);
    return {
      totalItems: items.length,
      items,
    };
  }

  public async getListDistrictByCityCode(cityCode: string) {
    const path = `./json/vn-district.json`;
    const districtVnData = await this.getDataInFile(path)
    const dataFile = Object.values(districtVnData);
    const dataFormat = this.formatData(dataFile);
    const items = dataFormat.filter(x => x.parent_code === cityCode);
    return {
      totalItems: items.length,
      items,
    };
  }

  public async getListWardByDistrictCode(districtCode: string) {
    const path = `./json/vn-ward_list/${districtCode}.json`;
    const data = await this.getDataInFile(path)
    const wardList = data;
    const dataFile = Object.values(wardList);
    const items = this.formatData(dataFile);
    return {
      totalItems: items.length,
      items,
    };
  }

  private async getDataInFile(path: string) {
    const myJsonObject = await fs.readJson(path);
    return myJsonObject;
  }

  private formatData(data, isCity = false): any[] {
    const dataFormat = data.map(o => {
      if (isCity) {
        return {
          ...o,
          nameWithType: o.name_with_type,
        }
      }
      return {
        ...o,
        nameWithType: o.name_with_type,
        pathWithType: o.path_with_type,
        parentCode: o.parent_code,
      }
    });
    return dataFormat;
  }

}