import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { AdminGuestsController } from './admin-guests.controller.js';

@Module({
  imports: [CqrsModule, AuthorizationModule],
  controllers: [AdminGuestsController],
  providers: [],
})
export class AdminGuestsModule {}
