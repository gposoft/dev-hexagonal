export interface Validation<T> {
  validate(param: T): Promise<void>;
}
