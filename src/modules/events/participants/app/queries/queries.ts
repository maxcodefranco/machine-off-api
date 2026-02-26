import { ApiPropertyOptional } from '@nestjs/swagger';
import { AppParticipantDto } from '../dto/dto.js';

export class AppFetchParticipantByInvitationCodeQueryInput {
  invitationCode: string;
}

export class AppFetchParticipantByInvitationCodeQueryOutput {
  @ApiPropertyOptional({ type: () => AppParticipantDto, nullable: true })
  participant: AppParticipantDto | null;
}
