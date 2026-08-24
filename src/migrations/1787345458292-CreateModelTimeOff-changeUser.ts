import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelTimeOffChangeUser1787345458292 implements MigrationInterface {
  name = 'CreateModelTimeOffChangeUser1787345458292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "is_admin" TO "role_id"`);
    await queryRunner.query(
      `CREATE TABLE "time_off" ("id" SERIAL NOT NULL, "staff_id" integer NOT NULL, "reason" character varying(200) NOT NULL, "start_datetime" TIMESTAMP NOT NULL, "end_datetime" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e80a790cc96026d0f557a78f83d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer NOT NULL`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "services_id_seq" OWNED BY "services"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "id" SET DEFAULT nextval('"services_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_off" ADD CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "time_off" DROP CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db"`,
    );
    await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "services_id_seq"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "role_id" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`DROP TABLE "time_off"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role_id" TO "is_admin"`);
  }
}
