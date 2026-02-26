import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { EventEntity } from '../../../../shared/database/entities/event.entity.js';
import { AdminEventsController } from './admin-events.controller.js';
import { AdminListEventsQueryHandler } from './queries/list-events.handler.js';
import { AdminListEventsService } from './services/list-events.service.js';

@Module({
  imports: [
    CqrsModule,
    AuthorizationModule,
    TypeOrmModule.forFeature([EventEntity]),
  ],
  controllers: [AdminEventsController],
  providers: [
    AdminListEventsQueryHandler,
    AdminListEventsService,
  ],
})
export class AdminEventsModule {}
