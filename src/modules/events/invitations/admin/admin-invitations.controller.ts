import { Controller, Post, Patch, Get, Param, Body, Query, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';
import { AdminCreateInvitationInputDto } from './dto/create-invitation.dto.js';
import { AdminCheckinParticipantInputDto, AdminCheckinParticipantOutputDto } from './dto/checkin-participant.dto.js';
import {
  AdminListInvitationsQueryInput,
  AdminListInvitationsQueryOutput,
} from './queries/queries.js';
import { AdminCheckinParticipantCommandInput, AdminCheckinGuestCommandInput } from './commands/commands.js';

@ApiTags('Admin / Invitations')
@Controller('admin/invitations')
export class AdminInvitationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.create, 'Invitation'))
  async createInvitation(@Body() input: AdminCreateInvitationInputDto) {
    // TODO: dispatch AdminCreateInvitationCommand
  }

  @Patch(':id/deactivate')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.update, 'Invitation'))
  async deactivateInvitation(@Param('id') id: string) {
    // TODO: dispatch AdminDeactivateInvitationCommand
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.read, 'Invitation'))
  async fetchInvitation(@Param('id') id: string) {
    // TODO: dispatch AdminFetchInvitationQuery
  }

  @Get()
  @ApiHeader({ name: 'x-admin-password', required: true })
  async listInvitations(
    @Query('eventId') eventId: string,
    @Headers('x-admin-password') password: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<AdminListInvitationsQueryOutput> {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'machineoff2026';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Senha inválida.');
    }

    return this.queryBus.execute(
      Object.assign(new AdminListInvitationsQueryInput(), {
        eventId,
        page,
        limit,
      }),
    );
  }

  @Patch('participants/:participantId/checkin')
  @ApiHeader({ name: 'x-admin-password', required: true })
  async checkinParticipant(
    @Param('participantId') participantId: string,
    @Body() input: AdminCheckinParticipantInputDto,
    @Headers('x-admin-password') password: string,
  ): Promise<AdminCheckinParticipantOutputDto> {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'machineoff2026';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Senha inválida.');
    }

    return this.commandBus.execute(
      Object.assign(new AdminCheckinParticipantCommandInput(), {
        participantId,
        checkin: input.checkin,
      }),
    );
  }

  @Patch('guests/:guestId/checkin')
  @ApiHeader({ name: 'x-admin-password', required: true })
  async checkinGuest(
    @Param('guestId') guestId: string,
    @Body() input: AdminCheckinParticipantInputDto,
    @Headers('x-admin-password') password: string,
  ): Promise<AdminCheckinParticipantOutputDto> {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'machineoff2026';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Senha inválida.');
    }

    return this.commandBus.execute(
      Object.assign(new AdminCheckinGuestCommandInput(), {
        guestId,
        checkin: input.checkin,
      }),
    );
  }
}
