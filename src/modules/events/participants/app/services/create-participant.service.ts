import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import { ParticipantEntity } from '../../../../../shared/database/entities/participant.entity.js';
import {
  AppCreateParticipantCommandInput,
  AppCreateParticipantCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppCreateParticipantService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  async execute(
    input: AppCreateParticipantCommandInput,
  ): Promise<AppCreateParticipantCommandOutput> {
    const invitation = await this.invitationRepository.findOne({
      where: { code: input.invitationCode },
      relations: ['participant'],
    });

    if (!invitation) {
      throw new NotFoundException(
        `Invitation with code "${input.invitationCode}" not found.`,
      );
    }

    if (invitation.status !== 'active') {
      throw new NotFoundException(
        `Invitation with code "${input.invitationCode}" is not active.`,
      );
    }

    if (invitation.participant) {
      throw new ConflictException(
        `A participant already exists for invitation code "${input.invitationCode}".`,
      );
    }

    const participant = this.participantRepository.create({
      invitationId: invitation.id,
      name: input.name,
      document: input.document,
      email: input.email,
      phone: input.phone,
      shifts: input.shifts as string[],
      acceptsImageUsage: input.acceptsImageUsage,
      hasDietaryRestriction: input.hasDietaryRestriction,
      dietaryRestrictionDescription: input.dietaryRestrictionDescription,
    });

    const saved = await this.participantRepository.save(participant);

    return {
      id: saved.id,
      createdAt: saved.createdAt,
    };
  }
}
