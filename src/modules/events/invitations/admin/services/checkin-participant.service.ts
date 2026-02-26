import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import {
  AdminCheckinParticipantCommandInput,
  AdminCheckinParticipantCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AdminCheckinParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  async execute(
    input: AdminCheckinParticipantCommandInput,
  ): Promise<AdminCheckinParticipantCommandOutput> {
    const participant = await this.participantRepository.findOne({
      where: { id: input.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id "${input.participantId}" not found.`,
      );
    }

    participant.checkedInAt = input.checkin ? new Date() : null;
    await this.participantRepository.save(participant);

    return {
      id: participant.id,
      checkedInAt: participant.checkedInAt,
    };
  }
}
