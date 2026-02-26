import { AppInvitationDto } from '../dto/dto.js';

export class AppLookupInvitationByCodeQueryInput {
  invitationCode: string;
}

export class AppLookupInvitationByCodeQueryOutput {
  invitation: AppInvitationDto;
}
