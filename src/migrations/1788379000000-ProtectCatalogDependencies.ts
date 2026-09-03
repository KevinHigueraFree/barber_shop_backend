import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProtectCatalogDependencies1788379000000 implements MigrationInterface {
  name = 'ProtectCatalogDependencies1788379000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "permission" DROP CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39"',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" ADD CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39" FOREIGN KEY ("action_id") REFERENCES "action"("id") ON DELETE RESTRICT ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" DROP CONSTRAINT "FK_9b0b5d512656563cef9f0236a77"',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" ADD CONSTRAINT "FK_9b0b5d512656563cef9f0236a77" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" DROP CONSTRAINT "FK_9b0b5d512656563cef9f0236a77"',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" ADD CONSTRAINT "FK_9b0b5d512656563cef9f0236a77" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" DROP CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39"',
    );
    await queryRunner.query(
      'ALTER TABLE "permission" ADD CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39" FOREIGN KEY ("action_id") REFERENCES "action"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}
