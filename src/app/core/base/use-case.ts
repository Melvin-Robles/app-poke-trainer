
/**
 * @name UseCase
 * @description
 * Action related to the class, main method of the
 * class.
 */
export interface UseCase<Params, Returns> {
  /**
   * @name execute
   * @description
   * Main action to be performed by the class
   * @param params Params Generic
   * @returns Returns Generic
   */
  execute(params: Params): Promise<Returns> | void;
}
