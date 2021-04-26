import { ComparisonOperator } from '../../enums/comparison.operator.enum';
import { Filtering } from './filtering.model';
import { IComparisonOperator } from './operators/comparison.operator.interface';
import { ExactComparisonOperator } from './operators/exact.operator';
import { StartWithComparisonOperator } from './operators/startWith.operator';

export class FilterBuilder {
  static build(filterings: Filtering[]): {} {
    const conditions = filterings.map(x => {
      return FilterBuilder.getFactory(x).toJson();
    });
    return { $and: conditions };
  }

  static addFilterActive(filterings: Filtering[]): void {
    filterings.push(new Filtering('active', ComparisonOperator.Eq, true));
  }

  private static getFactory(filtering: Filtering): IComparisonOperator {
    switch (filtering.operator.toString()) {
      case ComparisonOperator[ComparisonOperator.StartsWith]:
        return new StartWithComparisonOperator(filtering);
      default:
        return new ExactComparisonOperator(filtering);
    }
  }
}
