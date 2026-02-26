import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppParticipantsController } from './app-participants.controller.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { ParticipantEntity } from '../../../../shared/database/entities/participant.entity.js';
import { InvitationCodeGuard } from '../../../../shared/authorization/invitation-code.guard.js';
import { AppCreateParticipantCommandHandler } from './commands/create-participant.handler.js';
import { AppCreateParticipantService } from './services/create-participant.service.js';
import { AppUpdateParticipantCommandHandler } from './commands/update-participant.handler.js';
import { AppUpdateParticipantService } from './services/update-participant.service.js';
import { AppFetchParticipantByInvitationCodeQueryHandler } from './queries/fetch-participant-by-invitation-code.handler.js';
import { AppFetchParticipantByInvitationCodeService } from './services/fetch-participant-by-invitation-code.service.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([InvitationEntity, ParticipantEntity]),
  ],
  controllers: [AppParticipantsController],
  providers: [
    AppCreateParticipantCommandHandler,
    AppCreateParticipantService,
    AppUpdateParticipantCommandHandler,
    AppUpdateParticipantService,
    AppFetchParticipantByInvitationCodeQueryHandler,
    AppFetchParticipantByInvitationCodeService,
    InvitationCodeGuard,
  ],
})
export class AppParticipantsModule {}
