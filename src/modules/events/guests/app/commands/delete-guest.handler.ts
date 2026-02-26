import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppDeleteGuestCommandInput,
  AppDeleteGuestCommandOutput,
} from './commands.js';
import { AppDeleteGuestService } from '../services/delete-guest.service.js';

@CommandHandler(AppDeleteGuestCommandInput)
export class AppDeleteGuestCommandHandler
  implements ICommandHandler<AppDeleteGuestCommandInput>
{
  constructor(private readonly deleteGuestService: AppDeleteGuestService) {}

  async execute(
    command: AppDeleteGuestCommandInput,
  ): Promise<AppDeleteGuestCommandOutput> {
    return this.deleteGuestService.execute(command);
  }
}
