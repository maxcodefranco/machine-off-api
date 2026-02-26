import { CustomFieldType } from '../../../../../domain/index.js';

export class AdminCreateCustomFieldCommandInput {
  eventId: string;
  key: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export class AdminCreateCustomFieldCommandOutput {
  id: string;
}

export class AdminUpdateCustomFieldCommandInput {
  customFieldId: string;
  label?: string;
  required?: boolean;
  options?: string[];
  order?: number;
}

export class AdminUpdateCustomFieldCommandOutput {
  id: string;
}

export class AdminDeleteCustomFieldCommandInput {
  customFieldId: string;
}

export class AdminDeleteCustomFieldCommandOutput {
  success: boolean;
}
