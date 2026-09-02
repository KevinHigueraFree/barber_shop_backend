import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDescriptionOnModules1788371585482 implements MigrationInterface {
  name = 'UpdateDescriptionOnModules1788371585482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "service" ADD "description" character varying(250)`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying(250)`);
    await queryRunner.query(`ALTER TABLE "appointment_status" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "appointment_status" ADD "description" character varying(250)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointment_status" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "appointment_status" ADD "description" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying(200) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "service" ADD "description" character varying`);
  }
}
