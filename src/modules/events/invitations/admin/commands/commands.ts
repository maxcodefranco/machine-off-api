export class AdminCreateInvitationCommandInput {
  eventId: string;
  guestName: string;
  guestPhone?: string;
}

export class AdminCreateInvitationCommandOutput {
  id: string;
  code: string;
  createdAt: Date;
}

export class AdminDeactivateInvitationCommandInput {
  invitationId: string;
}

export class AdminDeactivateInvitationCommandOutput {
  id: string;
  updatedAt: Date;
}
