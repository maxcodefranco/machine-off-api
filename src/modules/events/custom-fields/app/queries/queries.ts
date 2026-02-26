import { AppCustomFieldDto, AppCustomFieldResponseDto } from '../dto/dto.js';

export class AppListCustomFieldsForEventQueryInput {
  eventId: string;
}

export class AppListCustomFieldsForEventQueryOutput {
  customFields: AppCustomFieldDto[];
}

export class AppFetchCustomFieldResponsesQueryInput {
  participantId: string;
}

export class AppFetchCustomFieldResponsesQueryOutput {
  responses: AppCustomFieldResponseDto[];
}
