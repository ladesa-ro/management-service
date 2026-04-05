import type { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCalendarioLetivoOfertaFormacaoNullable1775600002000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "calendario_letivo"
      ALTER COLUMN "id_oferta_formacao_fk" DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "calendario_letivo"
      SET "id_oferta_formacao_fk" = (SELECT id FROM "oferta_formacao" LIMIT 1)
      WHERE "id_oferta_formacao_fk" IS NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "calendario_letivo"
      ALTER COLUMN "id_oferta_formacao_fk" SET NOT NULL;
    `);
  }
}
