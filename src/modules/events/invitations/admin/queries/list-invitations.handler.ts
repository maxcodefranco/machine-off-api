import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AdminListInvitationsQueryInput,
  AdminListInvitationsQueryOutput,
} from './queries.js';
import { AdminListInvitationsService } from '../services/list-invitations.service.js';

@QueryHandler(AdminListInvitationsQueryInput)
export class AdminListInvitationsQueryHandler
  implements IQueryHandler<AdminListInvitationsQueryInput>
{
  constructor(
    private readonly listInvitationsService: AdminListInvitationsService,
  ) {}

  async execute(
    query: AdminListInvitationsQueryInput,
  ): Promise<AdminListInvitationsQueryOutput> {
    return this.listInvitationsService.execute(query);
  }
}
