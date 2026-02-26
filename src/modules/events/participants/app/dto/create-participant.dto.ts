import { IsNotEmpty, IsString, IsOptional, IsEmail, IsBoolean, IsArray } from 'class-validator';

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
  @IsString({ each: true })
  shifts: string[];

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
