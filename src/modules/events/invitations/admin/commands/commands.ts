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

export class AdminCheckinParticipantCommandInput {
  participantId: string;
  checkin: boolean;
}

export class AdminCheckinParticipantCommandOutput {
  id: string;
  checkedInAt: Date | null;
}

export class AdminCheckinGuestCommandInput {
  guestId: string;
  checkin: boolean;
}

export class AdminCheckinGuestCommandOutput {
  id: string;
  checkedInAt: Date | null;
}
