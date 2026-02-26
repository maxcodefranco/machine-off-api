import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  AdminListEventsQueryInput,
  AdminListEventsQueryOutput,
} from './queries.js';
import { AdminListEventsService } from '../services/list-events.service.js';

@QueryHandler(AdminListEventsQueryInput)
export class AdminListEventsQueryHandler
  implements IQueryHandler<AdminListEventsQueryInput>
{
  constructor(private readonly service: AdminListEventsService) {}

  async execute(
    query: AdminListEventsQueryInput,
  ): Promise<AdminListEventsQueryOutput> {
    return this.service.execute(query);
  }
}
