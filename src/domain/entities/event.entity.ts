export interface EventLinks {
  whatsapp?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

export interface Event {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  orientacoes: string;
  deadline: Date | null;
  pricingType: 'fixed' | 'split';
  pricingValue: number | null;
  links: EventLinks;
  createdAt: Date;
  updatedAt: Date;
}
