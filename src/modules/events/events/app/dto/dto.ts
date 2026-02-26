import { ApiProperty } from '@nestjs/swagger';

export class AppEventDto {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  orientacoes: string;
  deadline: Date | null;

  @ApiProperty({ enum: ['fixed', 'split', 'rateio'] })
  pricingType: string;

  @ApiProperty({ type: 'number', nullable: true })
  pricingValue: number | null;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  links: Record<string, string>;
}
