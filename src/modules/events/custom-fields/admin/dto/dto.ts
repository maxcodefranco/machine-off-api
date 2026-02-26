export class AdminCustomFieldDto {
  id: string;
  eventId: string;
  key: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  order: number;
}
