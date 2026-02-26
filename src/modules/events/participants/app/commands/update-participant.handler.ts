import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppUpdateParticipantCommandInput,
  AppUpdateParticipantCommandOutput,
} from './commands.js';
import { AppUpdateParticipantService } from '../services/update-participant.service.js';

@CommandHandler(AppUpdateParticipantCommandInput)
export class AppUpdateParticipantCommandHandler
  implements ICommandHandler<AppUpdateParticipantCommandInput>
{
  constructor(
    private readonly updateParticipantService: AppUpdateParticipantService,
  ) {}

  async execute(
    command: AppUpdateParticipantCommandInput,
  ): Promise<AppUpdateParticipantCommandOutput> {
    return this.updateParticipantService.execute(command);
  }
}
