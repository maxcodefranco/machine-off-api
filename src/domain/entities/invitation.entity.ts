import { InvitationStatus } from '../enums/invitation-status.enum.js';

export interface Invitation {
  id: string;
  eventId: string;
  code: string;
  guestName: string;
  guestPhone?: string;
  status: InvitationStatus;
  createdAt: Date;
  updatedAt: Date;
}
