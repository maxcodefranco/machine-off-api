export interface Participant {
  id: string;
  invitationId: string;
  name: string;
  document?: string;
  email: string;
  phone: string;
  shifts: string[];
  acceptsImageUsage: boolean;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
  checkedInAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
