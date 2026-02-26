import { AdminEventDto } from '../dto/dto.js';

export class AdminFetchEventQueryInput {
  eventId: string;
}

export class AdminFetchEventQueryOutput {
  event: AdminEventDto;
}

export class AdminListEventsQueryInput {
  page?: number;
  limit?: number;
}

export class AdminListEventsQueryOutput {
  events: AdminEventDto[];
  total: number;
}
