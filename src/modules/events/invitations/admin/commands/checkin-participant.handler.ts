import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AdminCheckinParticipantCommandInput,
  AdminCheckinParticipantCommandOutput,
} from './commands.js';
import { AdminCheckinParticipantService } from '../services/checkin-participant.service.js';

@CommandHandler(AdminCheckinParticipantCommandInput)
export class AdminCheckinParticipantCommandHandler
  implements ICommandHandler<AdminCheckinParticipantCommandInput, AdminCheckinParticipantCommandOutput>
{
  constructor(private readonly service: AdminCheckinParticipantService) {}

  async execute(
    command: AdminCheckinParticipantCommandInput,
  ): Promise<AdminCheckinParticipantCommandOutput> {
    return this.service.execute(command);
  }
}
