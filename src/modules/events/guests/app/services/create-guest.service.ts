import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AppCreateGuestCommandInput,
  AppCreateGuestCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppCreateGuestService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AppCreateGuestCommandInput,
  ): Promise<AppCreateGuestCommandOutput> {
    const participant = await this.participantRepository.findOne({
      where: { id: input.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id "${input.participantId}" not found.`,
      );
    }

    const guest = this.guestRepository.create({
      participantId: participant.id,
      name: input.name,
      isChild: input.isChild,
      age: input.age,
      hasDietaryRestriction: input.hasDietaryRestriction,
      dietaryRestrictionDescription: input.dietaryRestrictionDescription,
    });

    const saved = await this.guestRepository.save(guest);

    return {
      id: saved.id,
      createdAt: saved.createdAt,
    };
  }
}
