import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelStaffService1787600578772 implements MigrationInterface {
  name = 'CreateModelStaffService1787600578772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff_service" ("id" SERIAL NOT NULL, "staff_id" integer NOT NULL, "service_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_538b8a85f169c8f37e4bb08c871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_471186ac31b7c5828be72a99aff" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_31d55b961753e2cc32b7704908a" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_31d55b961753e2cc32b7704908a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_471186ac31b7c5828be72a99aff"`,
    );
    await queryRunner.query(`DROP TABLE "staff_service"`);
  }
}
