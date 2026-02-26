import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../../../../../shared/database/entities/invitation.entity.js';
import {
  AppFetchEventByInvitationCodeQueryInput,
  AppFetchEventByInvitationCodeQueryOutput,
} from '../queries/queries.js';

@Injectable()
export class AppFetchEventByInvitationCodeService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  async execute(
    input: AppFetchEventByInvitationCodeQueryInput,
  ): Promise<AppFetchEventByInvitationCodeQueryOutput> {
    const invitation = await this.invitationRepository.findOne({
      where: { code: input.invitationCode },
      relations: ['event'],
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

    const { event } = invitation;

    return {
      event: {
        id: event.id,
        slug: event.slug,
        name: event.name,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        shiftOptions: event.shiftOptions ?? [],
        orientacoes: event.orientacoes,
        deadline: event.deadline,
        pricingType: event.pricingType,
        pricingValue: event.pricingValue ? Number(event.pricingValue) : null,
        links: event.links,
      },
    };
  }
}
