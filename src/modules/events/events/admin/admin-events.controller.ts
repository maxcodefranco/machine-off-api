import { Controller, Post, Patch, Get, Param, Body, Query, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';
import { AdminCreateEventInputDto } from './dto/create-event.dto.js';
import { AdminUpdateEventInputDto } from './dto/update-event.dto.js';
import {
  AdminListEventsQueryInput,
  AdminListEventsQueryOutput,
} from './queries/queries.js';

@ApiTags('Admin / Events')
@Controller('admin/events')
export class AdminEventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.create, 'Event'))
  async createEvent(@Body() input: AdminCreateEventInputDto) {
    // TODO: dispatch AdminCreateEventCommand
  }

  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.update, 'Event'))
  async updateEvent(
    @Param('id') id: string,
    @Body() input: AdminUpdateEventInputDto,
  ) {
    // TODO: dispatch AdminUpdateEventCommand
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.read, 'Event'))
  async fetchEvent(@Param('id') id: string) {
    // TODO: dispatch AdminFetchEventQuery
  }

  @Get()
  @ApiHeader({ name: 'x-admin-password', required: true })
  async listEvents(
    @Headers('x-admin-password') password: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<AdminListEventsQueryOutput> {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'machineoff2026';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Senha inválida.');
    }

    return this.queryBus.execute(
      Object.assign(new AdminListEventsQueryInput(), { page, limit }),
    );
  }
}
