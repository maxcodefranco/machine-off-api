import { Controller, Post, Patch, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';
import { AdminCreateEventInputDto } from './dto/create-event.dto.js';
import { AdminUpdateEventInputDto } from './dto/update-event.dto.js';

@ApiTags('Admin / Events')
@Controller('admin/events')
@UseGuards(PoliciesGuard)
export class AdminEventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.create, 'Event'))
  async createEvent(@Body() input: AdminCreateEventInputDto) {
    // TODO: dispatch AdminCreateEventCommand
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.update, 'Event'))
  async updateEvent(
    @Param('id') id: string,
    @Body() input: AdminUpdateEventInputDto,
  ) {
    // TODO: dispatch AdminUpdateEventCommand
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.read, 'Event'))
  async fetchEvent(@Param('id') id: string) {
    // TODO: dispatch AdminFetchEventQuery
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, 'Event'))
  async listEvents(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // TODO: dispatch AdminListEventsQuery
  }
}
