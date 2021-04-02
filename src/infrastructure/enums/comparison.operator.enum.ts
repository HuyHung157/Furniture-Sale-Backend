import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperator {
  // Number, String, Date, Enum
  Eq = 0,
  Neq = 1,
  IsNull = 2,
  IsNotNull = 3,

  // String
  IsEmpty = 4,
  IsNotEmpty = 5,
  StartsWith = 6,
  Contains = 7,
  DoesNotContain = 8,
  EndsWith = 9,
  Like = 10,

  // Number, Date
  Gt = 11, // greater than
  Gte = 12, // greater than or equal
  Lt = 13, // less than
  Lte = 14, // less than or equal
  And = 15,
  Or = 16,
}

registerEnumType(ComparisonOperator, {
  name: 'ComparisonOperator', // this one is mandatory
  description: 'The basic comparison operator', // this one is optional
});
