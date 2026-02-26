import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { EventEntity } from '../../../../shared/database/entities/event.entity.js';
import { ParticipantEntity } from '../../../../shared/database/entities/participant.entity.js';
import { AdminInvitationsController } from './admin-invitations.controller.js';
import { AdminListInvitationsQueryHandler } from './queries/list-invitations.handler.js';
import { AdminListInvitationsService } from './services/list-invitations.service.js';
import { AdminCheckinParticipantCommandHandler } from './commands/checkin-participant.handler.js';
import { AdminCheckinParticipantService } from './services/checkin-participant.service.js';

@Module({
  imports: [
    CqrsModule,
    AuthorizationModule,
    TypeOrmModule.forFeature([InvitationEntity, EventEntity, ParticipantEntity]),
  ],
  controllers: [AdminInvitationsController],
  providers: [
    AdminListInvitationsQueryHandler,
    AdminListInvitationsService,
    AdminCheckinParticipantCommandHandler,
    AdminCheckinParticipantService,
  ],
})
export class AdminInvitationsModule {}
