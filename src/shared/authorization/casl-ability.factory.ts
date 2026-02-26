import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Role } from '../../domain/enums/role.enum.js';
import { Action } from '../../domain/enums/action.enum.js';
import type { AppAbility } from './policy-handler.interface.js';

export interface InviteeContext {
  eventId: string;
  invitationId: string;
  participantId?: string;
}

export interface AuthUser {
  role: Role;
  context?: InviteeContext;
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: AuthUser): AppAbility {
    const builder = new AbilityBuilder(createMongoAbility);
    const { can } = builder;

    if (user.role === Role.admin) {
      can(Action.manage, 'all');
      return builder.build() as AppAbility;
    }

    if (user.role === Role.invitee && user.context) {
      const { eventId, invitationId, participantId } = user.context;

      // Event — leitura apenas do próprio evento
      can(Action.read, 'Event', { id: eventId });

      // Invitation — leitura apenas do próprio convite
      can(Action.read, 'Invitation', { id: invitationId });

      // Participant — criar, ler e atualizar o próprio
      can(Action.create, 'Participant', { invitationId });
      can(Action.read, 'Participant', { invitationId });
      can(Action.update, 'Participant', { invitationId });

      // Guest — gerenciar convidados do próprio participante
      if (participantId) {
        can(Action.create, 'Guest', { participantId });
        can(Action.read, 'Guest', { participantId });
        can(Action.update, 'Guest', { participantId });
        can(Action.delete, 'Guest', { participantId });
      }

      // CustomField — leitura dos campos do evento
      can(Action.read, 'CustomField', { eventId });

      // CustomFieldResponse — gerenciar respostas do próprio participante
      if (participantId) {
        can(Action.create, 'CustomFieldResponse', { participantId });
        can(Action.read, 'CustomFieldResponse', { participantId });
        can(Action.update, 'CustomFieldResponse', { participantId });
      }
    }

    return builder.build() as AppAbility;
  }
}
