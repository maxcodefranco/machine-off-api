export class InvitationCreatedEvent {
  constructor(
    public readonly payload: {
      invitationId: string;
      eventId: string;
      code: string;
    },
  ) {}
}
