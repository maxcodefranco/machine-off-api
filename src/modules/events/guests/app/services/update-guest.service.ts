import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestEntity } from '../../../../../shared/database/entities/guest.entity.js';
import {
  AppUpdateGuestCommandInput,
  AppUpdateGuestCommandOutput,
} from '../commands/commands.js';

@Injectable()
export class AppUpdateGuestService {
  constructor(
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  async execute(
    input: AppUpdateGuestCommandInput,
  ): Promise<AppUpdateGuestCommandOutput> {
    const guest = await this.guestRepository.findOne({
      where: { id: input.guestId },
    });

    if (!guest) {
      throw new NotFoundException(
        `Guest with id "${input.guestId}" not found.`,
      );
    }

    if (input.name !== undefined) guest.name = input.name;
    if (input.isChild !== undefined) guest.isChild = input.isChild;
    if (input.age !== undefined) guest.age = input.age;
    if (input.hasDietaryRestriction !== undefined)
      guest.hasDietaryRestriction = input.hasDietaryRestriction;
    if (input.dietaryRestrictionDescription !== undefined)
      guest.dietaryRestrictionDescription = input.dietaryRestrictionDescription;

    const saved = await this.guestRepository.save(guest);

    return {
      id: saved.id,
      updatedAt: saved.updatedAt,
    };
  }
}
