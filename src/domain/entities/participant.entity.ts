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
  createdAt: Date;
  updatedAt: Date;
}
