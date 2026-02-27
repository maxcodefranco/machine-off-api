import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import { EventEntity } from '../../../../../shared/database/entities/event.entity.js';
import {
  AdminListInvitationsQueryInput,
  AdminListInvitationsQueryOutput,
} from '../queries/queries.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

@Injectable()
export class AdminListInvitationsService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(
    input: AdminListInvitationsQueryInput,
  ): Promise<AdminListInvitationsQueryOutput> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 100;

    // Resolve eventId: accept UUID or slug
    let resolvedEventId = input.eventId;
    if (!UUID_REGEX.test(input.eventId)) {
      const event = await this.eventRepository.findOne({
        where: { slug: input.eventId },
        select: ['id'],
      });
      if (!event) {
        throw new NotFoundException(`Event with slug "${input.eventId}" not found.`);
      }
      resolvedEventId = event.id;
    }

    const [invitations, total] = await this.invitationRepository.findAndCount({
      where: { eventId: resolvedEventId },
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
              checkedInAt: inv.participant.checkedInAt,
              guests: (inv.participant.guests ?? []).map((g) => ({
                id: g.id,
                name: g.name,
                isChild: g.isChild,
                age: g.age,
                hasDietaryRestriction: g.hasDietaryRestriction,
                dietaryRestrictionDescription:
                  g.dietaryRestrictionDescription,
                checkedInAt: g.checkedInAt,
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
