export interface EventPayload<T> {
  transactionId: string;
  data: T;
}
