export class AdminParticipantDto {
  id: string;
  invitationId: string;
  name: string;
  document?: string;
  email: string;
  phone: string;
  shifts: string[];
  acceptsImageUsage: boolean;
  guestCount: number;
  createdAt: Date;
  updatedAt: Date;
}
