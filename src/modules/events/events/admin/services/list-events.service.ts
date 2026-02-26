import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../../../../../shared/database/entities/event.entity.js';
import {
  AdminListEventsQueryInput,
  AdminListEventsQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AdminListEventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(
    input: AdminListEventsQueryInput,
  ): Promise<AdminListEventsQueryOutput> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 100;

    const [events, total] = await this.eventRepository.findAndCount({
      order: { startDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      events: events.map((e) => ({
        id: e.id,
        slug: e.slug,
        name: e.name,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        startTime: e.startTime,
        endTime: e.endTime,
        shiftOptions: e.shiftOptions ?? [],
        orientacoes: e.orientacoes,
        deadline: e.deadline,
        pricingType: e.pricingType,
        pricingValue: e.pricingValue,
        links: e.links,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      })),
      total,
    };
  }
}
