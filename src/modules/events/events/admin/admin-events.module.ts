import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { AdminEventsController } from './admin-events.controller.js';

@Module({
  imports: [CqrsModule, AuthorizationModule],
  controllers: [AdminEventsController],
  providers: [],
})
export class AdminEventsModule {}
