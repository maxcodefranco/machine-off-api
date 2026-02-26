export class AdminCreateEventCommandInput {
  name: string;
  location: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  orientacoes: string;
  deadline?: string;
  pricingType?: string;
  pricingValue?: number;
  links?: Record<string, string>;
}

export class AdminCreateEventCommandOutput {
  id: string;
  createdAt: Date;
}

export class AdminUpdateEventCommandInput {
  eventId: string;
  name?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  orientacoes?: string;
  deadline?: string;
  pricingType?: string;
  pricingValue?: number;
  links?: Record<string, string>;
}

export class AdminUpdateEventCommandOutput {
  id: string;
  updatedAt: Date;
}
