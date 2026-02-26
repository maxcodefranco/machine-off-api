import type { MongoAbility, MongoQuery } from '@casl/ability';
import type { Action } from '../../domain/enums/action.enum.js';

type Subjects =
  | 'Event'
  | 'Invitation'
  | 'Participant'
  | 'Guest'
  | 'CustomField'
  | 'CustomFieldResponse'
  | 'all';

export type AppAbility = MongoAbility<
  [Action, Subjects],
  MongoQuery<Record<string, unknown>>
>;

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
