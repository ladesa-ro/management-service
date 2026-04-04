import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrdemToOfertaFormacaoPeriodoEtapa1775800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "oferta_formacao_periodo_etapa"
      ADD COLUMN "ordem" integer NOT NULL DEFAULT 0;
    `);

    // Preencher ordem baseada na ordem atual dos IDs (UUIDv7 preserva ordem de criação)
    await queryRunner.query(`
      WITH ranked AS (
        SELECT id, ROW_NUMBER() OVER (
          PARTITION BY id_oferta_formacao_periodo_fk
          ORDER BY id ASC
        ) AS rn
        FROM oferta_formacao_periodo_etapa
      )
      UPDATE oferta_formacao_periodo_etapa
      SET ordem = ranked.rn
      FROM ranked
      WHERE oferta_formacao_periodo_etapa.id = ranked.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "oferta_formacao_periodo_etapa"
      DROP COLUMN "ordem";
    `);
  }
}
