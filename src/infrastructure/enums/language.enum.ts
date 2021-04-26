import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  EN = 'EN',
  FR = 'FR',
}

registerEnumType(Language, {
  name: 'Language',
});
