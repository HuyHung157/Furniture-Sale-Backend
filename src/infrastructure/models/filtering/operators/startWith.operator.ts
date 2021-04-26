import { IComparisonOperator } from './comparison.operator.interface';
import { Filtering } from '../filtering.model';

export class StartWithComparisonOperator implements IComparisonOperator {
  constructor(private filtering: Filtering) {}
  toJson(): {} {
    const result = {};
    result[this.filtering.field] = { $regex: `^${this.filtering.value}` };
    return result;
  }
}
