import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AppDeleteGuestCommandInput,
  AppDeleteGuestCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppDeleteGuestService {
  constructor(
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AppDeleteGuestCommandInput,
  ): Promise<AppDeleteGuestCommandOutput> {
    const guest = await this.guestRepository.findOne({
      where: { id: input.guestId },
    });

    if (!guest) {
      throw new NotFoundException(
        `Guest with id "${input.guestId}" not found.`,
      );
    }

    await this.guestRepository.remove(guest);

    return { success: true };
  }
}
