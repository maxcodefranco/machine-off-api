import { IsNotEmpty, IsString, IsDateString, IsOptional, IsObject, IsIn, IsNumber, IsArray } from 'class-validator';

export class AdminCreateEventInputDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsArray()
  shiftOptions?: { key: string; label: string; startTime: string; endTime: string }[];

  @IsNotEmpty()
  @IsString()
  orientacoes: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsIn(['fixed', 'split'])
  pricingType?: string;

  @IsOptional()
  @IsNumber()
  pricingValue?: number;

  @IsOptional()
  @IsObject()
  links?: Record<string, string>;
}

export class AdminCreateEventOutputDto {
  id: string;
  createdAt: Date;
}
