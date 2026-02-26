import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AppCreateParticipantCommandInput,
  AppCreateParticipantCommandOutput,
} from './commands.js';
import { AppCreateParticipantService } from '../services/create-participant.service.js';

@CommandHandler(AppCreateParticipantCommandInput)
export class AppCreateParticipantCommandHandler
  implements ICommandHandler<AppCreateParticipantCommandInput>
{
  constructor(
    private readonly createParticipantService: AppCreateParticipantService,
  ) {}

  async execute(
    command: AppCreateParticipantCommandInput,
  ): Promise<AppCreateParticipantCommandOutput> {
    return this.createParticipantService.execute(command);
  }
}
