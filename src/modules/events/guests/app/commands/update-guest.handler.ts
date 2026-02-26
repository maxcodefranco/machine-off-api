import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppUpdateGuestCommandInput,
  AppUpdateGuestCommandOutput,
} from './commands.js';
import { AppUpdateGuestService } from '../services/update-guest.service.js';

@CommandHandler(AppUpdateGuestCommandInput)
export class AppUpdateGuestCommandHandler
  implements ICommandHandler<AppUpdateGuestCommandInput>
{
  constructor(private readonly updateGuestService: AppUpdateGuestService) {}

  async execute(
    command: AppUpdateGuestCommandInput,
  ): Promise<AppUpdateGuestCommandOutput> {
    return this.updateGuestService.execute(command);
  }
}
