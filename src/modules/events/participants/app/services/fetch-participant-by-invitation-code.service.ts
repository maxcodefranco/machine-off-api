import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import {
  AppFetchParticipantByInvitationCodeQueryInput,
  AppFetchParticipantByInvitationCodeQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AppFetchParticipantByInvitationCodeService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  async execute(
    input: AppFetchParticipantByInvitationCodeQueryInput,
  ): Promise<AppFetchParticipantByInvitationCodeQueryOutput> {
    const invitation = await this.invitationRepository.findOne({
      where: { code: input.invitationCode },
      relations: ['participant', 'participant.guests'],
    });

    if (!invitation) {
      throw new NotFoundException(
        `Invitation with code "${input.invitationCode}" not found.`,
      );
    }

    if (!invitation.participant) {
      return { participant: null };
    }

    const { participant } = invitation;

    return {
      participant: {
        id: participant.id,
        invitationId: participant.invitationId,
        name: participant.name,
        document: participant.document,
        email: participant.email,
        phone: participant.phone,
        shifts: participant.shifts,
        acceptsImageUsage: participant.acceptsImageUsage,
        hasDietaryRestriction: participant.hasDietaryRestriction,
        dietaryRestrictionDescription: participant.dietaryRestrictionDescription,
        createdAt: participant.createdAt,
        updatedAt: participant.updatedAt,
      },
    };
  }
}
