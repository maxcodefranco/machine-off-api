export class AdminInvitationDto {
  id: string;
  eventId: string;
  code: string;
  guestName: string;
  guestPhone?: string;
  status: string;
  hasParticipant: boolean;
  createdAt: Date;
  updatedAt: Date;
}
