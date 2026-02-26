import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { InvitationEntity } from '../../../../shared/database/entities/invitation.entity.js';
import { AdminInvitationsController } from './admin-invitations.controller.js';
import { AdminListInvitationsQueryHandler } from './queries/list-invitations.handler.js';
import { AdminListInvitationsService } from './services/list-invitations.service.js';

@Module({
  imports: [
    CqrsModule,
    AuthorizationModule,
    TypeOrmModule.forFeature([InvitationEntity]),
  ],
  controllers: [AdminInvitationsController],
  providers: [
    AdminListInvitationsQueryHandler,
    AdminListInvitationsService,
  ],
})
export class AdminInvitationsModule {}
