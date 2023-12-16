/**
 * @name Mapper
 * @description
 * Its functionality is to implement the two methods
 * and adapt external variables to those handled internally.
 * Here, the Entity will be converted to the Model and vice versa.
 */
export abstract class Mapper<Entity, Model> {
  /**
   * @name mapFrom
   * @description
   * Transforms our entity into a model
   * @param param I
   * @returns O
   */
  abstract mapFrom(param: Entity): Model;

  /**
   * @name mapFrom
   * @description
   * Transforms our model into an entity
   * @param param O
   * @returns I
   */
  abstract mapTo(param: Model): Entity;
}
