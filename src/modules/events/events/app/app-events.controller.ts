import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  AppFetchEventByInvitationCodeQueryInput,
  AppFetchEventByInvitationCodeQueryOutput,
} from './queries/queries.js';

@ApiTags('App / Events')
@Controller('app/events')
export class AppEventsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('by-invitation/:code')
  async fetchEventByInvitationCode(
    @Param('code') code: string,
  ): Promise<AppFetchEventByInvitationCodeQueryOutput> {
    return this.queryBus.execute(
      Object.assign(new AppFetchEventByInvitationCodeQueryInput(), {
        invitationCode: code,
      }),
    );
  }
}
