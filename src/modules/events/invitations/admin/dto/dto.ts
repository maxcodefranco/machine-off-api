export class AdminInvitationGuestDto {
  id: string;
  name: string;
  isChild: boolean;
  age: number | null;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription: string | null;
}

export class AdminInvitationParticipantDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  document?: string;
  shifts: string[];
  acceptsImageUsage: boolean;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription: string | null;
  guests: AdminInvitationGuestDto[];
}

export class AdminInvitationDto {
  id: string;
  eventId: string;
  code: string;
  guestName: string;
  guestPhone?: string;
  status: string;
  hasParticipant: boolean;
  participant?: AdminInvitationParticipantDto;
  createdAt: Date;
  updatedAt: Date;
}
