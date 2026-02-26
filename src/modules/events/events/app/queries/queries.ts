import { AppEventDto } from '../dto/dto.js';

export class AppFetchEventByInvitationCodeQueryInput {
  invitationCode: string;
}

export class AppFetchEventByInvitationCodeQueryOutput {
  event: AppEventDto;
}
