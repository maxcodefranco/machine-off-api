export class AppCustomFieldDto {
  id: string;
  key: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  order: number;
}

export class AppCustomFieldResponseDto {
  id: string;
  customFieldId: string;
  value: string;
}
