export class GuestCreatedEvent {
  constructor(
    public readonly payload: { guestId: string; participantId: string },
  ) {}
}

export class GuestUpdatedEvent {
  constructor(public readonly payload: { guestId: string }) {}
}

export class GuestDeletedEvent {
  constructor(
    public readonly payload: { guestId: string; participantId: string },
  ) {}
}
