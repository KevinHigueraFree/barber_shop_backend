import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelStaffSchedule1787596051241 implements MigrationInterface {
  name = 'CreateModelStaffSchedule1787596051241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff_schedule" ("id" SERIAL NOT NULL, "staff_id" integer NOT NULL, "day_of_week" date NOT NULL, "work_start_time" TIME NOT NULL, "work_end_time" TIME NOT NULL, "break_start_time" TIME, "break_end_time" TIME, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8214368794d51de1fe438639567" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" ADD CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c" FOREIGN KEY ("staff_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_schedule" DROP CONSTRAINT "FK_5c22fd3482be33f9e2b51f4069c"`,
    );
    await queryRunner.query(`DROP TABLE "staff_schedule"`);
  }
}
