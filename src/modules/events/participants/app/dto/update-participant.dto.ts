import { IsOptional, IsString, IsEmail, IsBoolean, IsArray } from 'class-validator';

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
  @IsString({ each: true })
  shifts?: string[];

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
