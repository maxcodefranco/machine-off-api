import { AdminCustomFieldDto } from '../dto/dto.js';

export class AdminListCustomFieldsQueryInput {
  eventId: string;
}

export class AdminListCustomFieldsQueryOutput {
  customFields: AdminCustomFieldDto[];
}

export class AdminListCustomFieldResponsesQueryInput {
  customFieldId: string;
  page?: number;
  limit?: number;
}

export class AdminListCustomFieldResponsesQueryOutput {
  responses: { participantId: string; participantName: string; value: string }[];
  total: number;
}
