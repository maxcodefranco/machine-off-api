import { IsBoolean } from 'class-validator';

export class AdminCheckinParticipantInputDto {
  @IsBoolean()
  checkin: boolean;
}

export class AdminCheckinParticipantOutputDto {
  id: string;
  checkedInAt: Date | null;
}
