import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class AddSnapshotVersioningToCalendarioLetivoEtapa1776000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Snapshot columns
    await queryRunner.addColumns("calendario_letivo_etapa", [
      new TableColumn({
        name: "nome",
        type: "text",
        isNullable: false,
        default: "''",
      }),
      new TableColumn({
        name: "cor",
        type: "text",
        isNullable: false,
        default: "'#000000'",
      }),
      new TableColumn({
        name: "ordem",
        type: "integer",
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: "numero_periodo",
        type: "integer",
        isNullable: false,
        default: 1,
      }),
    ]);

    // IVersioned columns
    await queryRunner.addColumns("calendario_letivo_etapa", [
      new TableColumn({
        name: "identificador_externo",
        type: "uuid",
        isNullable: false,
        default: "gen_random_uuid()",
      }),
      new TableColumn({
        name: "version",
        type: "integer",
        isNullable: false,
        default: 1,
      }),
      new TableColumn({
        name: "previous_version_id",
        type: "uuid",
        isNullable: true,
      }),
      new TableColumn({
        name: "valid_from",
        type: "timestamptz",
        isNullable: false,
        default: "now()",
      }),
      new TableColumn({
        name: "valid_to",
        type: "timestamptz",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "calendario_letivo_etapa",
      new TableForeignKey({
        name: "fk__calendario_letivo_etapa__depende__calendario_letivo_etapa_previous_version",
        columnNames: ["previous_version_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "calendario_letivo_etapa",
      }),
    );

    // Backfill: snapshot columns from joined tables, versioning from own dates
    await queryRunner.query(`
      UPDATE calendario_letivo_etapa cle SET
        nome = COALESCE(ofpe.nome, ''),
        cor = COALESCE(ofpe.cor, '#000000'),
        ordem = COALESCE(ofpe.ordem, 0),
        numero_periodo = COALESCE(ofp.numero_periodo, 1),
        identificador_externo = cle.id,
        version = 1,
        valid_from = cle.date_created,
        valid_to = cle.date_deleted
      FROM oferta_formacao_periodo_etapa ofpe
      JOIN oferta_formacao_periodo ofp ON ofp.id = ofpe.id_oferta_formacao_periodo_fk
      WHERE cle.id_oferta_formacao_periodo_etapa_fk = ofpe.id
    `);

    // Backfill registros que nao fizeram join (orfaos): versioning columns only
    await queryRunner.query(`
      UPDATE calendario_letivo_etapa cle SET
        identificador_externo = cle.id,
        version = 1,
        valid_from = cle.date_created,
        valid_to = cle.date_deleted
      WHERE NOT EXISTS (
        SELECT 1 FROM oferta_formacao_periodo_etapa ofpe
        WHERE cle.id_oferta_formacao_periodo_etapa_fk = ofpe.id
      )
    `);

    await queryRunner.createIndex(
      "calendario_letivo_etapa",
      new TableIndex({
        name: "idx__calendario_letivo_etapa__identificador_externo",
        columnNames: ["identificador_externo"],
      }),
    );

    // Partial unique index: apenas uma versao vigente por identificador_externo
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq__calendario_letivo_etapa__identificador_externo_active"
        ON "calendario_letivo_etapa" ("identificador_externo")
        WHERE "date_deleted" IS NULL AND "valid_to" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq__calendario_letivo_etapa__identificador_externo_active"`,
    );
    await queryRunner.dropIndex(
      "calendario_letivo_etapa",
      "idx__calendario_letivo_etapa__identificador_externo",
    );
    await queryRunner.dropForeignKey(
      "calendario_letivo_etapa",
      "fk__calendario_letivo_etapa__depende__calendario_letivo_etapa_previous_version",
    );
    await queryRunner.dropColumns("calendario_letivo_etapa", [
      "identificador_externo",
      "version",
      "previous_version_id",
      "valid_from",
      "valid_to",
      "nome",
      "cor",
      "ordem",
      "numero_periodo",
    ]);
  }
}
