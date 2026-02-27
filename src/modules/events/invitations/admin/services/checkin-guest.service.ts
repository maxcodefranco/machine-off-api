import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AdminCheckinGuestCommandInput,
  AdminCheckinGuestCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AdminCheckinGuestService {
  constructor(
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AdminCheckinGuestCommandInput,
  ): Promise<AdminCheckinGuestCommandOutput> {
    const guest = await this.guestRepository.findOne({
      where: { id: input.guestId },
    });

    if (!guest) {
      throw new NotFoundException(
        `Guest with id "${input.guestId}" not found.`,
      );
    }

    guest.checkedInAt = input.checkin ? new Date() : null;
    await this.guestRepository.save(guest);

    return {
      id: guest.id,
      checkedInAt: guest.checkedInAt,
    };
  }
}
