import { IsOptional, IsString, IsDateString, IsObject, IsIn, IsNumber } from 'class-validator';

export class AdminUpdateEventInputDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsString()
  orientacoes?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsIn(['fixed', 'split', 'rateio'])
  pricingType?: string;

  @IsOptional()
  @IsNumber()
  pricingValue?: number;

  @IsOptional()
  @IsObject()
  links?: Record<string, string>;
}

export class AdminUpdateEventOutputDto {
  id: string;
  updatedAt: Date;
}
