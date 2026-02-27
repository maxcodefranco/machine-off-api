import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AdminCheckinGuestCommandInput,
  AdminCheckinGuestCommandOutput,
} from './commands.js';
import { AdminCheckinGuestService } from '../services/checkin-guest.service.js';

@CommandHandler(AdminCheckinGuestCommandInput)
export class AdminCheckinGuestCommandHandler
  implements ICommandHandler<AdminCheckinGuestCommandInput, AdminCheckinGuestCommandOutput>
{
  constructor(private readonly service: AdminCheckinGuestService) {}

  async execute(
    command: AdminCheckinGuestCommandInput,
  ): Promise<AdminCheckinGuestCommandOutput> {
    return this.service.execute(command);
  }
}
