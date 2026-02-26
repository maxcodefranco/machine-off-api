import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppInvitationsController } from './app-invitations.controller.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { AppLookupInvitationByCodeQueryHandler } from './queries/lookup-invitation-by-code.handler.js';
import { AppLookupInvitationByCodeService } from './services/lookup-invitation-by-code.service.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([InvitationEntity]),
  ],
  controllers: [AppInvitationsController],
  providers: [
    AppLookupInvitationByCodeQueryHandler,
    AppLookupInvitationByCodeService,
  ],
})
export class AppInvitationsModule {}
