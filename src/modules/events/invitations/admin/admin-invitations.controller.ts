import { Controller, Post, Patch, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';
import { AdminCreateInvitationInputDto } from './dto/create-invitation.dto.js';

@ApiTags('Admin / Invitations')
@Controller('admin/invitations')
@UseGuards(PoliciesGuard)
export class AdminInvitationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.create, 'Invitation'))
  async createInvitation(@Body() input: AdminCreateInvitationInputDto) {
    // TODO: dispatch AdminCreateInvitationCommand
  }

  @Patch(':id/deactivate')
  @CheckPolicies((ability) => ability.can(Action.update, 'Invitation'))
  async deactivateInvitation(@Param('id') id: string) {
    // TODO: dispatch AdminDeactivateInvitationCommand
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.read, 'Invitation'))
  async fetchInvitation(@Param('id') id: string) {
    // TODO: dispatch AdminFetchInvitationQuery
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, 'Invitation'))
  async listInvitations(
    @Query('eventId') eventId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // TODO: dispatch AdminListInvitationsQuery
  }
}
