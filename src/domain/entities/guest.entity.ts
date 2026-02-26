export interface Guest {
  id: string;
  participantId: string;
  name: string;
  isChild: boolean;
  age?: number;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}
