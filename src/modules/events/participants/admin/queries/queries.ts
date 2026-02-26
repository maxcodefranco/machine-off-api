import { AdminParticipantDto } from '../dto/dto.js';

export class AdminListParticipantsQueryInput {
  eventId: string;
  shift?: string;
  page?: number;
  limit?: number;
}

export class AdminListParticipantsQueryOutput {
  participants: AdminParticipantDto[];
  total: number;
}

export class AdminFetchParticipantQueryInput {
  participantId: string;
}

export class AdminFetchParticipantQueryOutput {
  participant: AdminParticipantDto;
}
