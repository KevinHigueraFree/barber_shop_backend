import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1787247355643 implements MigrationInterface {
  name = 'UpdateUser1787247355643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "users" ADD "is_enabled" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "services_id_seq" OWNED BY "services"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "id" SET DEFAULT nextval('"services_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "id" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "id" SET DEFAULT nextval('services_id_seq1')`,
    );
    await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "services_id_seq"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_enabled"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
