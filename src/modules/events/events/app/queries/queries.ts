import { ApiHideProperty } from '@nestjs/swagger';
import { AppEventDto } from '../dto/dto.js';

export class AppFetchEventByInvitationCodeQueryInput {
  invitationCode: string;

  @ApiHideProperty()
  requestIp?: string;

  @ApiHideProperty()
  requestUserAgent?: string;
}

export class AppFetchEventByInvitationCodeQueryOutput {
  event: AppEventDto;
}
