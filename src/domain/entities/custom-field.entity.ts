import { CustomFieldType } from '../enums/custom-field-type.enum.js';

export interface CustomField {
  id: string;
  eventId: string;
  key: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
  options?: string[];
  order: number;
}
