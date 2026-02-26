import { AdminGuestDto } from '../dto/dto.js';

export class AdminListGuestsQueryInput {
  eventId: string;
  page?: number;
  limit?: number;
}

export class AdminListGuestsQueryOutput {
  guests: AdminGuestDto[];
  total: number;
}
