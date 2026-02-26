export class AppCreateGuestCommandInput {
  participantId: string;
  name: string;
  isChild: boolean;
  age?: number;
  hasDietaryRestriction: boolean;
  dietaryRestrictionDescription?: string;
}

export class AppCreateGuestCommandOutput {
  id: string;
  createdAt: Date;
}

export class AppUpdateGuestCommandInput {
  guestId: string;
  name?: string;
  isChild?: boolean;
  age?: number;
  hasDietaryRestriction?: boolean;
  dietaryRestrictionDescription?: string;
}

export class AppUpdateGuestCommandOutput {
  id: string;
  updatedAt: Date;
}

export class AppDeleteGuestCommandInput {
  guestId: string;
}

export class AppDeleteGuestCommandOutput {
  success: boolean;
}
