import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEventsController } from './app-events.controller.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { EventEntity } from '../../../../shared/database/entities/event.entity.js';
import { AppFetchEventByInvitationCodeQueryHandler } from './queries/fetch-event-by-invitation-code.handler.js';
import { AppFetchEventByInvitationCodeService } from './services/fetch-event-by-invitation-code.service.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([InvitationEntity, EventEntity]),
  ],
  controllers: [AppEventsController],
  providers: [
    AppFetchEventByInvitationCodeQueryHandler,
    AppFetchEventByInvitationCodeService,
  ],
})
export class AppEventsModule {}
