import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';

@ApiTags('Admin / Participants')
@Controller('admin/participants')
@UseGuards(PoliciesGuard)
export class AdminParticipantsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.read, 'Participant'))
  async fetchParticipant(@Param('id') id: string) {
    // TODO: dispatch AdminFetchParticipantQuery
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, 'Participant'))
  async listParticipants(
    @Query('eventId') eventId: string,
    @Query('shift') shift?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // TODO: dispatch AdminListParticipantsQuery
  }
}
