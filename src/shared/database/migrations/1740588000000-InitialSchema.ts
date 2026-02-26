import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1740588000000 implements MigrationInterface {
  name = 'InitialSchema1740588000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // ─── Events ────────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "events" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "slug" character varying NOT NULL,
        "name" character varying NOT NULL,
        "location" character varying NOT NULL,
        "startDate" TIMESTAMP NOT NULL,
        "endDate" TIMESTAMP,
        "startTime" character varying NOT NULL,
        "endTime" character varying NOT NULL,
        "shiftOptions" jsonb NOT NULL DEFAULT '[]',
        "orientacoes" text NOT NULL,
        "deadline" TIMESTAMP,
        "pricingType" character varying NOT NULL DEFAULT 'fixed',
        "pricingValue" numeric(10,2),
        "links" jsonb NOT NULL DEFAULT '{}',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"),
        CONSTRAINT "events_slug_key" UNIQUE ("slug")
      )
    `);

    // ─── Invitations ───────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "invitations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "eventId" uuid NOT NULL,
        "code" character varying NOT NULL,
        "guestName" character varying NOT NULL,
        "guestPhone" character varying,
        "status" character varying NOT NULL DEFAULT 'active',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_dfcfae6af22931048ef73078418" UNIQUE ("code")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "invitations"
        ADD CONSTRAINT "FK_8dfdd031adb35b7e19733430b6f"
        FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // ─── Participants ──────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "participants" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "invitationId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "document" character varying,
        "email" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "shifts" jsonb NOT NULL DEFAULT '[]',
        "acceptsImageUsage" boolean NOT NULL DEFAULT false,
        "hasDietaryRestriction" boolean NOT NULL DEFAULT false,
        "dietaryRestrictionDescription" character varying,
        "checkedInAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_1f23670a713dc408d2c384cc83f" UNIQUE ("invitationId")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "participants"
        ADD CONSTRAINT "FK_1f23670a713dc408d2c384cc83f"
        FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // ─── Guests ────────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "guests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "participantId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "isChild" boolean NOT NULL DEFAULT false,
        "age" integer,
        "hasDietaryRestriction" boolean NOT NULL DEFAULT false,
        "dietaryRestrictionDescription" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "guests"
        ADD CONSTRAINT "FK_9d49bd5ba1af390283507164cf8"
        FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // ─── Custom Fields ─────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "custom_fields" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "eventId" uuid NOT NULL,
        "key" character varying NOT NULL,
        "label" character varying NOT NULL,
        "type" character varying NOT NULL,
        "required" boolean NOT NULL DEFAULT false,
        "options" jsonb,
        "order" integer NOT NULL DEFAULT 0,
        CONSTRAINT "PK_35ab958a0baec2e0b2b2b875fdb" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "custom_fields"
        ADD CONSTRAINT "FK_2ef8a1ee32f7ba6fb15b18dc4ee"
        FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // ─── Custom Field Responses ────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "custom_field_responses" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "participantId" uuid NOT NULL,
        "customFieldId" uuid NOT NULL,
        "value" text NOT NULL,
        CONSTRAINT "PK_a79d323ab7f73aabf0a2ff7b5b8" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "custom_field_responses"
        ADD CONSTRAINT "FK_cfa40c54268dc534d774e5dd7cf"
        FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "custom_field_responses"
        ADD CONSTRAINT "FK_bdab176ab7828815b54b88897e5"
        FOREIGN KEY ("customFieldId") REFERENCES "custom_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "custom_field_responses" DROP CONSTRAINT "FK_bdab176ab7828815b54b88897e5"`);
    await queryRunner.query(`ALTER TABLE "custom_field_responses" DROP CONSTRAINT "FK_cfa40c54268dc534d774e5dd7cf"`);
    await queryRunner.query(`DROP TABLE "custom_field_responses"`);

    await queryRunner.query(`ALTER TABLE "custom_fields" DROP CONSTRAINT "FK_2ef8a1ee32f7ba6fb15b18dc4ee"`);
    await queryRunner.query(`DROP TABLE "custom_fields"`);

    await queryRunner.query(`ALTER TABLE "guests" DROP CONSTRAINT "FK_9d49bd5ba1af390283507164cf8"`);
    await queryRunner.query(`DROP TABLE "guests"`);

    await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_1f23670a713dc408d2c384cc83f"`);
    await queryRunner.query(`DROP TABLE "participants"`);

    await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_8dfdd031adb35b7e19733430b6f"`);
    await queryRunner.query(`DROP TABLE "invitations"`);

    await queryRunner.query(`DROP TABLE "events"`);
  }
}
