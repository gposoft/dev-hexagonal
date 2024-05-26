import { EventPayload } from "../models/event.model";

export interface IEventBusPort {
  emitEvent<T>(eventName: string, payload: EventPayload<T>): void;
  subscribeToEvent<T>(eventName: string, listener: (payload: EventPayload<T>) => void): void;
}
