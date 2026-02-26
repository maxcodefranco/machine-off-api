import { AdminInvitationDto } from '../dto/dto.js';

export class AdminListInvitationsQueryInput {
  eventId: string;
  page?: number;
  limit?: number;
}

export class AdminListInvitationsQueryOutput {
  invitations: AdminInvitationDto[];
  total: number;
}

export class AdminFetchInvitationQueryInput {
  invitationId: string;
}

export class AdminFetchInvitationQueryOutput {
  invitation: AdminInvitationDto;
}
