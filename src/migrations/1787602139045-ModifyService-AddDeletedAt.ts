import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyServiceAddDeletedAt1787602139045 implements MigrationInterface {
  name = 'ModifyServiceAddDeletedAt1787602139045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "deleted_at"`);
  }
}
