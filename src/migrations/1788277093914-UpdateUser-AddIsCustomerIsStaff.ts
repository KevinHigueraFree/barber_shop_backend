import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAddIsCustomerIsStaff1788277093914 implements MigrationInterface {
  name = 'UpdateUserAddIsCustomerIsStaff1788277093914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "is_customer" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "user" ADD "is_staff" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_staff"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_customer"`);
  }
}
