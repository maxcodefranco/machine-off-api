import { Controller, Post, Patch, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { InvitationCodeGuard } from '../../../../shared/authorization/index.js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppCreateParticipantInputDto } from './dto/create-participant.dto.js';
import { AppUpdateParticipantInputDto } from './dto/update-participant.dto.js';
import {
  AppCreateParticipantCommandInput,
  AppCreateParticipantCommandOutput,
  AppUpdateParticipantCommandInput,
  AppUpdateParticipantCommandOutput,
  AppDeleteParticipantCommandInput,
  AppDeleteParticipantCommandOutput,
} from './commands/commands.js';
import {
  AppFetchParticipantByInvitationCodeQueryInput,
  AppFetchParticipantByInvitationCodeQueryOutput,
} from './queries/queries.js';

@ApiTags('App / Participants')
@ApiHeader({ name: 'x-invitation-code', required: true })
@UseGuards(InvitationCodeGuard)
@Controller('app/participants')
export class AppParticipantsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createParticipant(
    @Body() input: AppCreateParticipantInputDto,
  ): Promise<AppCreateParticipantCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppCreateParticipantCommandInput(), input),
    );
  }

  @Patch(':id')
  async updateParticipant(
    @Param('id') id: string,
    @Body() input: AppUpdateParticipantInputDto,
  ): Promise<AppUpdateParticipantCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppUpdateParticipantCommandInput(), {
        ...input,
        participantId: id,
      }),
    );
  }

  @Delete(':id')
  async deleteParticipant(
    @Param('id') id: string,
  ): Promise<AppDeleteParticipantCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppDeleteParticipantCommandInput(), {
        participantId: id,
      }),
    );
  }

  @Get('by-invitation/:code')
  async fetchByInvitationCode(
    @Param('code') code: string,
  ): Promise<AppFetchParticipantByInvitationCodeQueryOutput> {
    return this.queryBus.execute(
      Object.assign(new AppFetchParticipantByInvitationCodeQueryInput(), {
        invitationCode: code,
      }),
    );
  }
}
