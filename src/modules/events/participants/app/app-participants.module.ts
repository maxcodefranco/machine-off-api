import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppParticipantsController } from './app-participants.controller.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { ParticipantEntity } from '../../../../shared/database/entities/participant.entity.js';
import { GuestEntity } from '../../../../shared/database/entities/guest.entity.js';
import { InvitationCodeGuard } from '../../../../shared/authorization/invitation-code.guard.js';
import { AppCreateParticipantCommandHandler } from './commands/create-participant.handler.js';
import { AppCreateParticipantService } from './services/create-participant.service.js';
import { AppUpdateParticipantCommandHandler } from './commands/update-participant.handler.js';
import { AppUpdateParticipantService } from './services/update-participant.service.js';
import { AppDeleteParticipantCommandHandler } from './commands/delete-participant.handler.js';
import { AppDeleteParticipantService } from './services/delete-participant.service.js';
import { AppFetchParticipantByInvitationCodeQueryHandler } from './queries/fetch-participant-by-invitation-code.handler.js';
import { AppFetchParticipantByInvitationCodeService } from './services/fetch-participant-by-invitation-code.service.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([InvitationEntity, ParticipantEntity, GuestEntity]),
  ],
  controllers: [AppParticipantsController],
  providers: [
    AppCreateParticipantCommandHandler,
    AppCreateParticipantService,
    AppUpdateParticipantCommandHandler,
    AppUpdateParticipantService,
    AppDeleteParticipantCommandHandler,
    AppDeleteParticipantService,
    AppFetchParticipantByInvitationCodeQueryHandler,
    AppFetchParticipantByInvitationCodeService,
    InvitationCodeGuard,
  ],
})
export class AppParticipantsModule {}
