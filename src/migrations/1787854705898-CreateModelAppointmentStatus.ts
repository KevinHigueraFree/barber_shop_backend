import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelAppointmentStatus1787854705898 implements MigrationInterface {
  name = 'CreateModelAppointmentStatus1787854705898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying(255), "color_code" character varying(7) NOT NULL DEFAULT '#CCCCCC', "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_4fec1f328aaaeb498d77d3d0a34" UNIQUE ("name"), CONSTRAINT "chk_appointment_status_name_not_empty" CHECK (TRIM(name) <> ''), CONSTRAINT "PK_8f42047c7975a9606576ca274e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_31d55b961753e2cc32b7704908a"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "service_id_seq" OWNED BY "service"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ALTER COLUMN "id" SET DEFAULT nextval('"service_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" DROP CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_471186ac31b7c5828be72a99aff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_off" DROP CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db"`,
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "scheduling_setting_id_seq" OWNED BY "scheduling_setting"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scheduling_setting" ALTER COLUMN "id" SET DEFAULT nextval('"scheduling_setting_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "scheduling_setting" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "time_off" ADD CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" ADD CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_471186ac31b7c5828be72a99aff" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_31d55b961753e2cc32b7704908a" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_31d55b961753e2cc32b7704908a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" DROP CONSTRAINT "FK_471186ac31b7c5828be72a99aff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" DROP CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_off" DROP CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scheduling_setting" ALTER COLUMN "id" SET DEFAULT nextval('scheduling_settings_id_seq')`,
    );
    await queryRunner.query(`ALTER TABLE "scheduling_setting" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "scheduling_setting_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq')`,
    );
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "time_off" ADD CONSTRAINT "FK_ba8d23bd9197c3475dbd1fab3db" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_471186ac31b7c5828be72a99aff" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" ADD CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ALTER COLUMN "id" SET DEFAULT nextval('services_id_seq')`,
    );
    await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "service_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "staff_service" ADD CONSTRAINT "FK_31d55b961753e2cc32b7704908a" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "appointment_status"`);
  }
}
