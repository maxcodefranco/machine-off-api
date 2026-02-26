export class ParticipantCreatedEvent {
  constructor(
    public readonly payload: {
      participantId: string;
      invitationId: string;
      eventId: string;
    },
  ) {}
}

export class ParticipantUpdatedEvent {
  constructor(public readonly payload: { participantId: string }) {}
}
