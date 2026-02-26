import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import {
  AdminListInvitationsQueryInput,
  AdminListInvitationsQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AdminListInvitationsService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  async execute(
    input: AdminListInvitationsQueryInput,
  ): Promise<AdminListInvitationsQueryOutput> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 100;

    const [invitations, total] = await this.invitationRepository.findAndCount({
      where: { eventId: input.eventId },
      relations: ['participant', 'participant.guests'],
      order: { guestName: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      invitations: invitations.map((inv) => ({
        id: inv.id,
        eventId: inv.eventId,
        code: inv.code,
        guestName: inv.guestName,
        guestPhone: inv.guestPhone ?? undefined,
        status: inv.status,
        hasParticipant: !!inv.participant,
        participant: inv.participant
          ? {
              id: inv.participant.id,
              name: inv.participant.name,
              email: inv.participant.email,
              phone: inv.participant.phone,
              document: inv.participant.document ?? undefined,
              shifts: inv.participant.shifts,
              acceptsImageUsage: inv.participant.acceptsImageUsage,
              hasDietaryRestriction: inv.participant.hasDietaryRestriction,
              dietaryRestrictionDescription:
                inv.participant.dietaryRestrictionDescription,
              guests: (inv.participant.guests ?? []).map((g) => ({
                id: g.id,
                name: g.name,
                isChild: g.isChild,
                age: g.age,
                hasDietaryRestriction: g.hasDietaryRestriction,
                dietaryRestrictionDescription:
                  g.dietaryRestrictionDescription,
              })),
            }
          : undefined,
        createdAt: inv.createdAt,
        updatedAt: inv.updatedAt,
      })),
      total,
    };
  }
}
