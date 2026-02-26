import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppDeleteParticipantCommandInput,
  AppDeleteParticipantCommandOutput,
} from './commands.js';
import { AppDeleteParticipantService } from '../services/delete-participant.service.js';

@CommandHandler(AppDeleteParticipantCommandInput)
export class AppDeleteParticipantCommandHandler
  implements ICommandHandler<AppDeleteParticipantCommandInput>
{
  constructor(
    private readonly deleteParticipantService: AppDeleteParticipantService,
  ) {}

  async execute(
    command: AppDeleteParticipantCommandInput,
  ): Promise<AppDeleteParticipantCommandOutput> {
    return this.deleteParticipantService.execute(command);
  }
}
