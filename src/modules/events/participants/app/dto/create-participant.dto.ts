import { IsNotEmpty, IsString, IsOptional, IsEmail, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { ShiftType } from '../../../../../domain/index.js';

export class AppCreateParticipantInputDto {
  @IsNotEmpty()
  @IsString()
  invitationCode: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsArray()
  @IsEnum(ShiftType, { each: true })
  shifts: ShiftType[];

  @IsBoolean()
  acceptsImageUsage: boolean;

  @IsBoolean()
  hasDietaryRestriction: boolean;

  @IsOptional()
  @IsString()
  dietaryRestrictionDescription?: string;
}

export class AppCreateParticipantOutputDto {
  id: string;
  createdAt: Date;
}
