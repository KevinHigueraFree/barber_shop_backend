import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyUserEmailUniqueConditional1787601675805 implements MigrationInterface {
  name = 'ModifyUserEmailUniqueConditional1787601675805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_users_email_active_unique" ON "users" ("email") WHERE "deleted_at" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_users_email_active_unique"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
  }
}
