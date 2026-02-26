import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { AdminParticipantsController } from './admin-participants.controller.js';

@Module({
  imports: [CqrsModule, AuthorizationModule],
  controllers: [AdminParticipantsController],
  providers: [],
})
export class AdminParticipantsModule {}
