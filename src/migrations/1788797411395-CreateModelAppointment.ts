import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelAppointment1788797411395 implements MigrationInterface {
  name = 'CreateModelAppointment1788797411395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "appointment_date" date NOT NULL, "staff_id" integer NOT NULL, "customer_id" integer NOT NULL, "status_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_6093cfbc767de74a62b7368b279" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_43177b2ccf4d809a8582ca6a6b1" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_8f42047c7975a9606576ca274e7" FOREIGN KEY ("status_id") REFERENCES "appointment_status"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_8f42047c7975a9606576ca274e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_43177b2ccf4d809a8582ca6a6b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_6093cfbc767de74a62b7368b279"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
    await queryRunner.query(`DROP TABLE "appointment"`);
  }
}
