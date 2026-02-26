import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AppFetchParticipantByInvitationCodeQueryInput,
  AppFetchParticipantByInvitationCodeQueryOutput,
} from './queries.js';
import { AppFetchParticipantByInvitationCodeService } from '../services/fetch-participant-by-invitation-code.service.js';

@QueryHandler(AppFetchParticipantByInvitationCodeQueryInput)
export class AppFetchParticipantByInvitationCodeQueryHandler
  implements IQueryHandler<AppFetchParticipantByInvitationCodeQueryInput>
{
  constructor(
    private readonly fetchParticipantByInvitationCodeService: AppFetchParticipantByInvitationCodeService,
  ) {}

  async execute(
    query: AppFetchParticipantByInvitationCodeQueryInput,
  ): Promise<AppFetchParticipantByInvitationCodeQueryOutput> {
    return this.fetchParticipantByInvitationCodeService.execute(query);
  }
}
