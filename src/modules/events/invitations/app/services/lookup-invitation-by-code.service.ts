import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import {
  AppLookupInvitationByCodeQueryInput,
  AppLookupInvitationByCodeQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AppLookupInvitationByCodeService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  async execute(
    input: AppLookupInvitationByCodeQueryInput,
  ): Promise<AppLookupInvitationByCodeQueryOutput> {
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

    return {
      invitation: {
        id: invitation.id,
        guestName: invitation.guestName,
        eventId: invitation.eventId,
        hasExistingParticipant: !!invitation.participant,
      },
    };
  }
}
