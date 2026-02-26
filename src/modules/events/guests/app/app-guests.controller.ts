import { Controller, Post, Patch, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { InvitationCodeGuard } from '../../../../shared/authorization/index.js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppCreateGuestInputDto } from './dto/create-guest.dto.js';
import { AppUpdateGuestInputDto } from './dto/update-guest.dto.js';
import {
  AppCreateGuestCommandInput,
  AppCreateGuestCommandOutput,
  AppUpdateGuestCommandInput,
  AppUpdateGuestCommandOutput,
  AppDeleteGuestCommandInput,
  AppDeleteGuestCommandOutput,
} from './commands/commands.js';
import {
  AppListGuestsByParticipantQueryInput,
  AppListGuestsByParticipantQueryOutput,
} from './queries/queries.js';

@ApiTags('App / Guests')
@ApiHeader({ name: 'x-invitation-code', required: true })
@UseGuards(InvitationCodeGuard)
@Controller('app/guests')
export class AppGuestsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createGuest(
    @Body() input: AppCreateGuestInputDto,
  ): Promise<AppCreateGuestCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppCreateGuestCommandInput(), input),
    );
  }

  @Patch(':id')
  async updateGuest(
    @Param('id') id: string,
    @Body() input: AppUpdateGuestInputDto,
  ): Promise<AppUpdateGuestCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppUpdateGuestCommandInput(), {
        ...input,
        guestId: id,
      }),
    );
  }

  @Delete(':id')
  async deleteGuest(
    @Param('id') id: string,
  ): Promise<AppDeleteGuestCommandOutput> {
    return this.commandBus.execute(
      Object.assign(new AppDeleteGuestCommandInput(), { guestId: id }),
    );
  }

  @Get('by-participant/:participantId')
  async listByParticipant(
    @Param('participantId') participantId: string,
  ): Promise<AppListGuestsByParticipantQueryOutput> {
    return this.queryBus.execute(
      Object.assign(new AppListGuestsByParticipantQueryInput(), {
        participantId,
      }),
    );
  }
}
