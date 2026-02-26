export class AdminGuestDto {
  id: string;
  participantId: string;
  participantName: string;
  name: string;
  isChild: boolean;
  age?: number;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
  createdAt: Date;
}
