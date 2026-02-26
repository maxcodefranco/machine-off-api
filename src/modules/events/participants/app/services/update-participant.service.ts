import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import {
  AppUpdateParticipantCommandInput,
  AppUpdateParticipantCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppUpdateParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  async execute(
    input: AppUpdateParticipantCommandInput,
  ): Promise<AppUpdateParticipantCommandOutput> {
    const participant = await this.participantRepository.findOne({
      where: { id: input.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id "${input.participantId}" not found.`,
      );
    }

    if (input.name !== undefined) participant.name = input.name;
    if (input.document !== undefined) participant.document = input.document;
    if (input.email !== undefined) participant.email = input.email;
    if (input.phone !== undefined) participant.phone = input.phone;
    if (input.shifts !== undefined) participant.shifts = input.shifts as string[];
    if (input.acceptsImageUsage !== undefined)
      participant.acceptsImageUsage = input.acceptsImageUsage;
    if (input.hasDietaryRestriction !== undefined)
      participant.hasDietaryRestriction = input.hasDietaryRestriction;
    if (input.dietaryRestrictionDescription !== undefined)
      participant.dietaryRestrictionDescription = input.dietaryRestrictionDescription;

    const saved = await this.participantRepository.save(participant);

    return {
      id: saved.id,
      updatedAt: saved.updatedAt,
    };
  }
}
