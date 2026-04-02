import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class AddVersioningColumnsToCalendarioAgendamento1775500001000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("calendario_agendamento", [
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
      "calendario_agendamento",
      new TableForeignKey({
        name: "fk__calendario_agendamento__depende__calendario_agendamento_previous_version",
        columnNames: ["previous_version_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "calendario_agendamento",
      }),
    );

    // Backfill: identificador_externo = id (primeira versao), valid_from = date_created
    // valid_to derivado de date_deleted ou status INATIVO
    await queryRunner.query(`
      UPDATE calendario_agendamento SET
        identificador_externo = id,
        version = 1,
        valid_from = date_created,
        valid_to = COALESCE(
          date_deleted,
          CASE WHEN status = 'INATIVO' THEN date_updated ELSE NULL END
        )
    `);

    await queryRunner.createIndex(
      "calendario_agendamento",
      new TableIndex({
        name: "idx__calendario_agendamento__identificador_externo",
        columnNames: ["identificador_externo"],
      }),
    );

    // Partial unique index: apenas uma versao vigente por identificador_externo
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq__calendario_agendamento__identificador_externo_active"
        ON "calendario_agendamento" ("identificador_externo")
        WHERE "valid_to" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq__calendario_agendamento__identificador_externo_active"`,
    );
    await queryRunner.dropIndex(
      "calendario_agendamento",
      "idx__calendario_agendamento__identificador_externo",
    );
    await queryRunner.dropForeignKey(
      "calendario_agendamento",
      "fk__calendario_agendamento__depende__calendario_agendamento_previous_version",
    );
    await queryRunner.dropColumns("calendario_agendamento", [
      "identificador_externo",
      "version",
      "previous_version_id",
      "valid_from",
      "valid_to",
    ]);
  }
}
