import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { AdminInvitationsController } from './admin-invitations.controller.js';

@Module({
  imports: [CqrsModule, AuthorizationModule],
  controllers: [AdminInvitationsController],
  providers: [],
})
export class AdminInvitationsModule {}
