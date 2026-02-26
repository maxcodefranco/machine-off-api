import { IsOptional, IsString, IsEmail, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { ShiftType } from '../../../../../domain/index.js';

export class AppUpdateParticipantInputDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(ShiftType, { each: true })
  shifts?: ShiftType[];

  @IsOptional()
  @IsBoolean()
  acceptsImageUsage?: boolean;

  @IsOptional()
  @IsBoolean()
  hasDietaryRestriction?: boolean;

  @IsOptional()
  @IsString()
  dietaryRestrictionDescription?: string;
}

export class AppUpdateParticipantOutputDto {
  id: string;
  updatedAt: Date;
}
