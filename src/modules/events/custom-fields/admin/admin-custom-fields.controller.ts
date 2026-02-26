import { Controller, Post, Patch, Delete, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Action } from '../../../../domain/index.js';
import { PoliciesGuard, CheckPolicies } from '../../../../shared/authorization/index.js';
import { AdminCreateCustomFieldInputDto } from './dto/create-custom-field.dto.js';

@ApiTags('Admin / Custom Fields')
@Controller('admin/custom-fields')
@UseGuards(PoliciesGuard)
export class AdminCustomFieldsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.create, 'CustomField'))
  async createCustomField(@Body() input: AdminCreateCustomFieldInputDto) {
    // TODO: dispatch AdminCreateCustomFieldCommand
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.update, 'CustomField'))
  async updateCustomField(@Param('id') id: string, @Body() input: any) {
    // TODO: dispatch AdminUpdateCustomFieldCommand
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.delete, 'CustomField'))
  async deleteCustomField(@Param('id') id: string) {
    // TODO: dispatch AdminDeleteCustomFieldCommand
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.read, 'CustomField'))
  async listCustomFields(@Query('eventId') eventId: string) {
    // TODO: dispatch AdminListCustomFieldsQuery
  }

  @Get(':id/responses')
  @CheckPolicies((ability) => ability.can(Action.read, 'CustomFieldResponse'))
  async listResponses(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    // TODO: dispatch AdminListCustomFieldResponsesQuery
  }
}
