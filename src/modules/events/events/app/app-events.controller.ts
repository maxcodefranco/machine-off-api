import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
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
    @Req() req: Request,
  ): Promise<AppFetchEventByInvitationCodeQueryOutput> {
    return this.queryBus.execute(
      Object.assign(new AppFetchEventByInvitationCodeQueryInput(), {
        invitationCode: code,
        requestIp: req.ip,
        requestUserAgent: req.headers['user-agent'],
      }),
    );
  }
}
