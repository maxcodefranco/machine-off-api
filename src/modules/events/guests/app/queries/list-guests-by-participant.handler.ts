import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AppListGuestsByParticipantQueryInput,
  AppListGuestsByParticipantQueryOutput,
} from './queries.js';
import { AppListGuestsByParticipantService } from '../services/list-guests-by-participant.service.js';

@QueryHandler(AppListGuestsByParticipantQueryInput)
export class AppListGuestsByParticipantQueryHandler
  implements IQueryHandler<AppListGuestsByParticipantQueryInput>
{
  constructor(
    private readonly listGuestsByParticipantService: AppListGuestsByParticipantService,
  ) {}

  async execute(
    query: AppListGuestsByParticipantQueryInput,
  ): Promise<AppListGuestsByParticipantQueryOutput> {
    return this.listGuestsByParticipantService.execute(query);
  }
}
