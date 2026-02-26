import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppCreateGuestCommandInput,
  AppCreateGuestCommandOutput,
} from './commands.js';
import { AppCreateGuestService } from '../services/create-guest.service.js';

@CommandHandler(AppCreateGuestCommandInput)
export class AppCreateGuestCommandHandler
  implements ICommandHandler<AppCreateGuestCommandInput>
{
  constructor(private readonly createGuestService: AppCreateGuestService) {}

  async execute(
    command: AppCreateGuestCommandInput,
  ): Promise<AppCreateGuestCommandOutput> {
    return this.createGuestService.execute(command);
  }
}
