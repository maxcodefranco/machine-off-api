import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './shared/authorization/authorization.module.js';
import { DatabaseModule } from './shared/database/database.module.js';

// Events
import { AdminEventsModule } from './modules/events/events/admin/admin-events.module.js';
import { AppEventsModule } from './modules/events/events/app/app-events.module.js';

// Invitations
import { AdminInvitationsModule } from './modules/events/invitations/admin/admin-invitations.module.js';
import { AppInvitationsModule } from './modules/events/invitations/app/app-invitations.module.js';

// Participants
import { AdminParticipantsModule } from './modules/events/participants/admin/admin-participants.module.js';
import { AppParticipantsModule } from './modules/events/participants/app/app-participants.module.js';

// Guests
import { AdminGuestsModule } from './modules/events/guests/admin/admin-guests.module.js';
import { AppGuestsModule } from './modules/events/guests/app/app-guests.module.js';

// Custom Fields
import { AdminCustomFieldsModule } from './modules/events/custom-fields/admin/admin-custom-fields.module.js';
import { AppCustomFieldsModule } from './modules/events/custom-fields/app/app-custom-fields.module.js';

@Module({
  imports: [
    // Database
    DatabaseModule,
    // Authorization
    AuthorizationModule,
    // Events
    AdminEventsModule,
    AppEventsModule,
    // Invitations
    AdminInvitationsModule,
    AppInvitationsModule,
    // Participants
    AdminParticipantsModule,
    AppParticipantsModule,
    // Guests
    AdminGuestsModule,
    AppGuestsModule,
    // Custom Fields
    AdminCustomFieldsModule,
    AppCustomFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
