import { EventEmitter } from "events";
import { IEventBusPort } from "../../domain/ports/event.port";
import { EventPayload } from "../../domain/models/event.model";

export class EventEmitterAdapter implements IEventBusPort {
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
