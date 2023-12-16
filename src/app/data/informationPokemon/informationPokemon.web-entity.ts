/**
 * @name InformationPokeEntity
 * @description
 * Entity for typing parameters internally in the application
 */

export interface InformationPokeEntity {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}
