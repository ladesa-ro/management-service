import type { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCalendarioLetivoDiaFeriadoToText1775600001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "calendario_letivo_dia"
      ALTER COLUMN "feriado" TYPE text USING CASE WHEN feriado = true THEN 'Feriado' WHEN feriado = false THEN NULL END;
    `);

    await queryRunner.query(`
      ALTER TABLE "calendario_letivo_dia"
      ALTER COLUMN "feriado" DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "calendario_letivo_dia"
      ALTER COLUMN "feriado" TYPE boolean USING (feriado IS NOT NULL);
    `);

    await queryRunner.query(`
      ALTER TABLE "calendario_letivo_dia"
      ALTER COLUMN "feriado" SET NOT NULL;
    `);
  }
}
