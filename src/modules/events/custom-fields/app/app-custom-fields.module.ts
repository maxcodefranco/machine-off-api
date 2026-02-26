import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppCustomFieldsController } from './app-custom-fields.controller.js';

@Module({
  imports: [CqrsModule],
  controllers: [AppCustomFieldsController],
  providers: [],
})
export class AppCustomFieldsModule {}
