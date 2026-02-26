export class EventCreatedEvent {
  constructor(public readonly payload: { eventId: string }) {}
}

export class EventUpdatedEvent {
  constructor(public readonly payload: { eventId: string }) {}
}
