import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationEntity } from '../database/entities/invitation.entity.js';
import { Role } from '../../domain/enums/role.enum.js';
import type { AuthUser } from './casl-ability.factory.js';

@Injectable()
export class InvitationCodeGuard implements CanActivate {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const code = request.headers['x-invitation-code'] as string | undefined;

    if (!code) {
      throw new UnauthorizedException(
        'Header "x-invitation-code" is required.',
      );
    }

    const invitation = await this.invitationRepository.findOne({
      where: { code },
      relations: ['event', 'participant'],
    });

    if (!invitation) {
      throw new UnauthorizedException(
        `Invitation with code "${code}" not found.`,
      );
    }

    if (invitation.status !== 'active') {
      throw new UnauthorizedException(
        `Invitation with code "${code}" is not active.`,
      );
    }

    // Check deadline only for write operations (POST, PATCH, DELETE)
    if (request.method !== 'GET') {
      const { event } = invitation;
      if (event.deadline && new Date() > new Date(event.deadline)) {
        throw new ForbiddenException(
          'Prazo para alterações encerrado.',
        );
      }
    }

    const user: AuthUser = {
      role: Role.invitee,
      context: {
        eventId: invitation.eventId,
        invitationId: invitation.id,
        participantId: invitation.participant?.id,
      },
    };

    request.user = user;
    return true;
  }
}
