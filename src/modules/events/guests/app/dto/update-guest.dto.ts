import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class AppUpdateGuestInputDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isChild?: boolean;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsBoolean()
  hasDietaryRestriction?: boolean;

  @IsOptional()
  @IsString()
  dietaryRestrictionDescription?: string;
}

export class AppUpdateGuestOutputDto {
  id: string;
  updatedAt: Date;
}
