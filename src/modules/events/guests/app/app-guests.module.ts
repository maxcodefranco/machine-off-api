import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGuestsController } from './app-guests.controller.js';
import { ParticipantEntity } from '../../../../shared/database/entities/participant.entity.js';
import { GuestEntity } from '../../../../shared/database/entities/guest.entity.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { InvitationCodeGuard } from '../../../../shared/authorization/invitation-code.guard.js';
import { AppCreateGuestCommandHandler } from './commands/create-guest.handler.js';
import { AppCreateGuestService } from './services/create-guest.service.js';
import { AppUpdateGuestCommandHandler } from './commands/update-guest.handler.js';
import { AppUpdateGuestService } from './services/update-guest.service.js';
import { AppDeleteGuestCommandHandler } from './commands/delete-guest.handler.js';
import { AppDeleteGuestService } from './services/delete-guest.service.js';
import { AppListGuestsByParticipantQueryHandler } from './queries/list-guests-by-participant.handler.js';
import { AppListGuestsByParticipantService } from './services/list-guests-by-participant.service.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ParticipantEntity, GuestEntity, InvitationEntity]),
  ],
  controllers: [AppGuestsController],
  providers: [
    AppCreateGuestCommandHandler,
    AppCreateGuestService,
    AppUpdateGuestCommandHandler,
    AppUpdateGuestService,
    AppDeleteGuestCommandHandler,
    AppDeleteGuestService,
    AppListGuestsByParticipantQueryHandler,
    AppListGuestsByParticipantService,
    InvitationCodeGuard,
  ],
})
export class AppGuestsModule {}
