import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AppLookupInvitationByCodeQueryInput,
  AppLookupInvitationByCodeQueryOutput,
} from './queries.js';
import { AppLookupInvitationByCodeService } from '../services/lookup-invitation-by-code.service.js';

@QueryHandler(AppLookupInvitationByCodeQueryInput)
export class AppLookupInvitationByCodeQueryHandler
  implements IQueryHandler<AppLookupInvitationByCodeQueryInput>
{
  constructor(
    private readonly lookupInvitationByCodeService: AppLookupInvitationByCodeService,
  ) {}

  async execute(
    query: AppLookupInvitationByCodeQueryInput,
  ): Promise<AppLookupInvitationByCodeQueryOutput> {
    return this.lookupInvitationByCodeService.execute(query);
  }
}
