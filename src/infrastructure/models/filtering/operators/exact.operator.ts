import { IComparisonOperator } from './comparison.operator.interface';
import { Filtering } from '../filtering.model';

export class ExactComparisonOperator implements IComparisonOperator {
  constructor(private filtering: Filtering) {}
  toJson(): {} {
    const result = {};
    if (typeof this.filtering.value == typeof true) {
      result[this.filtering.field] = this.filtering.value;
    } else {
      result[this.filtering.field] = { $regex: `${this.filtering.value}` };
    }
    return result;
  }
}
