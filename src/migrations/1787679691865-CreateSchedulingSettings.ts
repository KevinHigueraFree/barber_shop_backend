import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchedulingSettings1787679691865 implements MigrationInterface {
  name = 'CreateSchedulingSettings1787679691865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scheduling_settings" ("id" SERIAL NOT NULL, "slot_duration_minutes" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "chk_slot_duration_positive" CHECK (slot_duration_minutes > 0), CONSTRAINT "PK_69f3feca8446517c7a9b969c2d5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "scheduling_settings"`);
  }
}
