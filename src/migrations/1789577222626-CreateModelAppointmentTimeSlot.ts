import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelAppointmentTimeSlot1789577222626 implements MigrationInterface {
  name = 'CreateModelAppointmentTimeSlot1789577222626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment_time_slot" ("id" SERIAL NOT NULL, "appointment_id" integer NOT NULL, "time_slot_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e0b33b07a7c731e82a1d9772244" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_appointment_time_slot_active_unique" ON "appointment_time_slot" ("appointment_id", "time_slot_id") WHERE "deleted_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_time_slot" ADD CONSTRAINT "FK_30dff086a7fd65115f4e7b5fe55" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_time_slot" ADD CONSTRAINT "FK_d2d4bf224fd1082728d445c3ab4" FOREIGN KEY ("time_slot_id") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment_time_slot" DROP CONSTRAINT "FK_d2d4bf224fd1082728d445c3ab4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_time_slot" DROP CONSTRAINT "FK_30dff086a7fd65115f4e7b5fe55"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_appointment_time_slot_active_unique"`);
    await queryRunner.query(`DROP TABLE "appointment_time_slot"`);
  }
}
