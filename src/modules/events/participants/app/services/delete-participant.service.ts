import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AppDeleteParticipantCommandInput,
  AppDeleteParticipantCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppDeleteParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AppDeleteParticipantCommandInput,
  ): Promise<AppDeleteParticipantCommandOutput> {
    const participant = await this.participantRepository.findOne({
      where: { id: input.participantId },
    });

    if (!participant) {
      throw new NotFoundException(
        `Participant with id "${input.participantId}" not found.`,
      );
    }

    // Delete related guests first
    await this.guestRepository.delete({ participantId: participant.id });

    await this.participantRepository.remove(participant);

    return { success: true };
  }
}
