import { EventEmitter } from "events";
import { EventBus, EventPayload } from "../../../domain/events";

export class EventBusEmitterAdapter implements EventBus {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  emitEvent<T>(eventName: string, payload: EventPayload<T>): void {
    this.eventEmitter.emit(eventName, payload);
  }

  subscribeToEvent<T>(eventName: string, listener: (payload: EventPayload<T>) => void): void {
    this.eventEmitter.on(eventName, listener);
  }
}
