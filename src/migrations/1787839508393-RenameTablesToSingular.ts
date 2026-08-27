import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReanemTableNamesFromPluralToSingular1787839508393 implements MigrationInterface {
  name = 'RenameTablesToSingular1787839508393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
    await queryRunner.query(`ALTER TABLE "services" RENAME TO "service"`);
    await queryRunner.query(`ALTER TABLE "scheduling_settings" RENAME TO "scheduling_setting"`);
    await queryRunner.query(
      `ALTER INDEX "IDX_users_email_active_unique" RENAME TO "IDX_user_email_active_unique"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER INDEX "IDX_user_email_active_unique" RENAME TO "IDX_users_email_active_unique"`,
    );
    await queryRunner.query(`ALTER TABLE "scheduling_setting" RENAME TO "scheduling_settings"`);
    await queryRunner.query(`ALTER TABLE "service" RENAME TO "services"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
  }
}
