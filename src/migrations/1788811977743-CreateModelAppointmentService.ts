import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelAppointmentService1788811977743 implements MigrationInterface {
  name = 'CreateModelAppointmentService1788811977743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointment_service" ("id" SERIAL NOT NULL, "appointment_id" integer NOT NULL, "service_id" integer NOT NULL, "price_at_service" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "total" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a170b01d5845a629233fb80a51a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_appointment_service_active_unique" ON "appointment_service" ("appointment_id", "service_id") WHERE "deleted_at" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_58b8e2ad0205bb5b1222fe92a02" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" ADD CONSTRAINT "FK_5afa325f92c7cf97afe840a879d" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_5afa325f92c7cf97afe840a879d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment_service" DROP CONSTRAINT "FK_58b8e2ad0205bb5b1222fe92a02"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_appointment_service_active_unique"`);
    await queryRunner.query(`DROP TABLE "appointment_service"`);
  }
}
