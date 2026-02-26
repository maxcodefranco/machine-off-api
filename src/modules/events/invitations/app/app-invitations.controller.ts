import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  AppLookupInvitationByCodeQueryInput,
  AppLookupInvitationByCodeQueryOutput,
} from './queries/queries.js';

@ApiTags('App / Invitations')
@Controller('app/invitations')
export class AppInvitationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('lookup/:code')
  async lookupByCode(
    @Param('code') code: string,
  ): Promise<AppLookupInvitationByCodeQueryOutput> {
    return this.queryBus.execute(
      Object.assign(new AppLookupInvitationByCodeQueryInput(), {
        invitationCode: code,
      }),
    );
  }
}
