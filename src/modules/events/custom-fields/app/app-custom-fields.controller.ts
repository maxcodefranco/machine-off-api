import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppSubmitCustomFieldResponseInputDto } from './dto/submit-custom-field-response.dto.js';

@ApiTags('App / Custom Fields')
@Controller('app/custom-fields')
export class AppCustomFieldsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('responses')
  async submitResponse(@Body() input: AppSubmitCustomFieldResponseInputDto) {
    // TODO: dispatch AppSubmitCustomFieldResponseCommand
  }

  @Get('by-event/:eventId')
  async listFieldsForEvent(@Param('eventId') eventId: string) {
    // TODO: dispatch AppListCustomFieldsForEventQuery
  }

  @Get('responses/by-participant/:participantId')
  async fetchResponses(@Param('participantId') participantId: string) {
    // TODO: dispatch AppFetchCustomFieldResponsesQuery
  }
}
