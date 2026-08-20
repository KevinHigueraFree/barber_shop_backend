import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDurationOnService1787242153235 implements MigrationInterface {
  name = 'AddDurationOnService1787242153235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" ADD "duration" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "duration"`);
  }
}
