import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReorderServicesColumns1787250000000 implements MigrationInterface {
  name = 'ReorderServicesColumns1787250000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "services" RENAME TO "services_old"`);

    // NUEVO: libera el nombre antes de crear la tabla nueva
    await queryRunner.query(`ALTER SEQUENCE "services_id_seq" RENAME TO "services_id_seq_old"`);

    await queryRunner.query(`
    CREATE TABLE "services" (
      "id" SERIAL NOT NULL,
      "name" character varying NOT NULL,
      "description" character varying,
      "price" numeric(10,2) NOT NULL,
      "duration" integer NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2_temp" PRIMARY KEY ("id")
    )
  `);

    // Como ya no hay datos, este INSERT no copiará nada, pero no hace daño dejarlo
    await queryRunner.query(`
    INSERT INTO "services" (id, name, description, price, duration, created_at, updated_at)
    SELECT id, name, description, price, duration, created_at, updated_at
    FROM "services_old"
  `);

    await queryRunner.query(`
    SELECT setval(pg_get_serial_sequence('"services"', 'id'), COALESCE(MAX(id), 1))
    FROM "services"
  `);

    await queryRunner.query(`DROP TABLE "services_old"`);

    // NUEVO: limpia la secuencia vieja ya sin uso
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "services_id_seq_old"`);

    await queryRunner.query(`
    ALTER TABLE "services" RENAME CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2_temp" TO "PK_ba2d347a3168a296416c6c5ccb2"
  `);
  }
  public down(): Promise<void> {
    throw new Error('This migration is not reversible in a meaningful way.');
  }
}
