import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';

@ApiTags('Admin / Guests')
@Controller('admin/guests')
@UseGuards(PoliciesGuard)
export class AdminGuestsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, 'Guest'))
  async listGuests(
    @Query('eventId') eventId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // TODO: dispatch AdminListGuestsQuery
  }
}
