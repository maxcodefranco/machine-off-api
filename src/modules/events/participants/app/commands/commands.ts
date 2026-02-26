export class AppCreateParticipantCommandInput {
  invitationCode: string;
  name: string;
  document?: string;
  email: string;
  phone: string;
  shifts: string[];
  acceptsImageUsage: boolean;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
}

export class AppCreateParticipantCommandOutput {
  id: string;
  createdAt: Date;
}

export class AppUpdateParticipantCommandInput {
  participantId: string;
  name?: string;
  document?: string;
  email?: string;
  phone?: string;
  shifts?: string[];
  acceptsImageUsage?: boolean;
  hasDietaryRestriction?: boolean;
  dietaryRestrictionDescription?: string;
}

export class AppUpdateParticipantCommandOutput {
  id: string;
  updatedAt: Date;
}

export class AppDeleteParticipantCommandInput {
  participantId: string;
}

export class AppDeleteParticipantCommandOutput {
  success: boolean;
}
