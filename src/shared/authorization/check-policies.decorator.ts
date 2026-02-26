import { SetMetadata } from '@nestjs/common';
import type { PolicyHandler } from './policy-handler.interface.js';

export const CHECK_POLICIES_KEY = 'check_policy';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
