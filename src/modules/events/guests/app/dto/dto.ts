export class AppGuestDto {
  id: string;
  participantId: string;
  name: string;
  isChild: boolean;
  age: number | null;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}
