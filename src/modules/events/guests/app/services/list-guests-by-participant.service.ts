import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AppListGuestsByParticipantQueryInput,
  AppListGuestsByParticipantQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AppListGuestsByParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AppListGuestsByParticipantQueryInput,
  ): Promise<AppListGuestsByParticipantQueryOutput> {
    const participant = await this.participantRepository.findOne({
      where: { id: input.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id "${input.participantId}" not found.`,
      );
    }

    const guests = await this.guestRepository.find({
      where: { participantId: input.participantId },
      order: { createdAt: 'ASC' },
    });

    return {
      guests: guests.map((guest) => ({
        id: guest.id,
        participantId: guest.participantId,
        name: guest.name,
        isChild: guest.isChild,
        age: guest.age,
        hasDietaryRestriction: guest.hasDietaryRestriction,
        dietaryRestrictionDescription: guest.dietaryRestrictionDescription,
        createdAt: guest.createdAt,
        updatedAt: guest.updatedAt,
      })),
    };
  }
}
