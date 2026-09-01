import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelPermission1788283507886 implements MigrationInterface {
  name = 'CreateModelPermission1788283507886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "module_id" integer NOT NULL, "action_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_9b0b5d512656563cef9f0236a77" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39" FOREIGN KEY ("action_id") REFERENCES "action"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_558a8b5ec76ab386a4c2e903f39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_9b0b5d512656563cef9f0236a77"`,
    );
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
