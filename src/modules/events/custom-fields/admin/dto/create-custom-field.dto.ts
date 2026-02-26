import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray, IsEnum, IsNumber } from 'class-validator';
import { CustomFieldType } from '../../../../../domain/index.js';

export class AdminCreateCustomFieldInputDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsEnum(CustomFieldType)
  type: CustomFieldType;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsNumber()
  order: number;
}

export class AdminCreateCustomFieldOutputDto {
  id: string;
}
