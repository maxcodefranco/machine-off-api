import { DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity.js';
import { InvitationEntity } from './entities/invitation.entity.js';
import { ParticipantEntity } from './entities/participant.entity.js';
import { GuestEntity } from './entities/guest.entity.js';
import { CustomFieldEntity } from './entities/custom-field.entity.js';
import { CustomFieldResponseEntity } from './entities/custom-field-response.entity.js';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'machine_off',
  entities: [
    EventEntity,
    InvitationEntity,
    ParticipantEntity,
    GuestEntity,
    CustomFieldEntity,
    CustomFieldResponseEntity,
  ],
  migrations: ['dist/shared/database/migrations/*.js'],
  synchronize: false,
});

export default AppDataSource;
