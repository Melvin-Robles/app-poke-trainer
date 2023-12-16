/**
 * @name HttpAdapter
 * @description
 * Interface for typing the responses of HTTP requests
 * received from endpoints and services.
 * @param T: Generic
 */


export interface HttpAdapter<T> {
  response: T;
}
