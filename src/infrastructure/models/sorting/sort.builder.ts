import { Sorting } from './sorting.model';

export class SortBuilder {
  static build(sortings: Sorting[]): {} {
    const result = {};
    sortings.forEach(x => {
      result[x.sortFieldName] = x.descending ? -1 : 1;
    });
    return result;
  }
}
