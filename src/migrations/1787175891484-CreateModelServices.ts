import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModelServices1787175891484 implements MigrationInterface {
  name = 'CreateModelServices1787175891484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "services"`);
  }
}
