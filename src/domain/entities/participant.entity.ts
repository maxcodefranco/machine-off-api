import { ShiftType } from '../enums/shift-type.enum.js';

export interface Participant {
  id: string;
  invitationId: string;
  name: string;
  document?: string;
  email: string;
  phone: string;
  shifts: ShiftType[];
  acceptsImageUsage: boolean;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}
