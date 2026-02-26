import { ApiProperty } from '@nestjs/swagger';

export class AppEventDto {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  startTime: string;
  endTime: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        label: { type: 'string' },
        startTime: { type: 'string' },
        endTime: { type: 'string' },
      },
    },
  })
  shiftOptions: { key: string; label: string; startTime: string; endTime: string }[];

  orientacoes: string;
  deadline: Date | null;

  @ApiProperty({ enum: ['fixed', 'split'] })
  pricingType: string;

  @ApiProperty({ type: 'number', nullable: true })
  pricingValue: number | null;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  links: Record<string, string>;
}
