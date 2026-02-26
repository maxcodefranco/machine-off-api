import { AppGuestDto } from '../dto/dto.js';

export class AppListGuestsByParticipantQueryInput {
  participantId: string;
}

export class AppListGuestsByParticipantQueryOutput {
  guests: AppGuestDto[];
}
