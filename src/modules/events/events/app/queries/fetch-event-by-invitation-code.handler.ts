import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AppFetchEventByInvitationCodeQueryInput,
  AppFetchEventByInvitationCodeQueryOutput,
} from './queries.js';
import { AppFetchEventByInvitationCodeService } from '../services/fetch-event-by-invitation-code.service.js';

@QueryHandler(AppFetchEventByInvitationCodeQueryInput)
export class AppFetchEventByInvitationCodeQueryHandler
  implements IQueryHandler<AppFetchEventByInvitationCodeQueryInput>
{
  constructor(
    private readonly fetchEventByInvitationCodeService: AppFetchEventByInvitationCodeService,
  ) {}

  async execute(
    query: AppFetchEventByInvitationCodeQueryInput,
  ): Promise<AppFetchEventByInvitationCodeQueryOutput> {
    return this.fetchEventByInvitationCodeService.execute(query);
  }
}
