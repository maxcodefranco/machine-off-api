import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class AppCreateGuestInputDto {
  @IsNotEmpty()
  @IsString()
  participantId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  isChild: boolean;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsBoolean()
  hasDietaryRestriction: boolean;

  @IsOptional()
  @IsString()
  dietaryRestrictionDescription?: string;
}

export class AppCreateGuestOutputDto {
  id: string;
  createdAt: Date;
}
