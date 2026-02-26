export class CustomFieldCreatedEvent {
  constructor(
    public readonly payload: { customFieldId: string; eventId: string },
  ) {}
}

export class CustomFieldResponseSubmittedEvent {
  constructor(
    public readonly payload: {
      responseId: string;
      participantId: string;
      customFieldId: string;
    },
  ) {}
}
