import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReorderUsersColumns1787251000000 implements MigrationInterface {
  name = 'ReorderUsersColumns1787251000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "users_old"`);
    await queryRunner.query(`ALTER SEQUENCE "users_id_seq" RENAME TO "users_id_seq_old"`);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "phone" character varying,
        "is_admin" boolean NOT NULL DEFAULT false,
        "is_enabled" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3_temp" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433_temp" PRIMARY KEY ("id")
      )
    `);

    // No hay datos que copiar (ya se borraron), pero por si acaso queda algo
    await queryRunner.query(`
      INSERT INTO "users" (id, name, email, password, phone, is_admin, is_enabled, created_at, updated_at, deleted_at)
      SELECT id, name, email, password, phone, is_admin, is_enabled, created_at, updated_at, deleted_at
      FROM "users_old"
    `);

    await queryRunner.query(`
      SELECT setval(pg_get_serial_sequence('"users"', 'id'), COALESCE(MAX(id), 1))
      FROM "users"
    `);

    await queryRunner.query(`DROP TABLE "users_old"`);
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "users_id_seq_old"`);

    await queryRunner.query(`
      ALTER TABLE "users" RENAME CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3_temp" TO "UQ_97672ac88f789774dd47f7c8be3"
    `);
    await queryRunner.query(`
      ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433_temp" TO "PK_a3ffb1c0c8416b9fc6f907b7433"
    `);
  }

  public down(): Promise<void> {
    throw new Error('This migration is not reversible in a meaningful way.');
  }
}
