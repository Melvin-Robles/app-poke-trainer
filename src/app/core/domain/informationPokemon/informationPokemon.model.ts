/**
 * @name InformationPokeModel
 * @description
 * Model for typing parameters externally in the application
 */


export interface InformationPokeModel {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}
