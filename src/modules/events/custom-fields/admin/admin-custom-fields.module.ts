import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../../../shared/authorization/authorization.module.js';
import { AdminCustomFieldsController } from './admin-custom-fields.controller.js';

@Module({
  imports: [CqrsModule, AuthorizationModule],
  controllers: [AdminCustomFieldsController],
  providers: [],
})
export class AdminCustomFieldsModule {}
