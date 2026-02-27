import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCheckedInAtToGuests1740588100000 implements MigrationInterface {
  name = 'AddCheckedInAtToGuests1740588100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "guests" ADD "checkedInAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "checkedInAt"`);
  }
}
