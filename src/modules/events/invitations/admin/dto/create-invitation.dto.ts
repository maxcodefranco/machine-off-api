import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AdminCreateInvitationInputDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  guestName: string;

  @IsOptional()
  @IsString()
  guestPhone?: string;
}

export class AdminCreateInvitationOutputDto {
  id: string;
  code: string;
  createdAt: Date;
}
