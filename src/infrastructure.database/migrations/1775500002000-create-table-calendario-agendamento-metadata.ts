import { type MigrationInterface, type QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableCalendarioAgendamentoMetadata1775500002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_metadata",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          {
            name: "identificador_externo_calendario_agendamento",
            type: "uuid",
            isNullable: false,
            isUnique: true,
          },
          { name: "nome", type: "text", isNullable: true },
          { name: "cor", type: "text", isNullable: true },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "now()" },
        ],
      }),
    );

    await queryRunner.createIndex(
      "calendario_agendamento_metadata",
      new TableIndex({
        name: "idx__calendario_agendamento_metadata__identificador_externo",
        columnNames: ["identificador_externo_calendario_agendamento"],
      }),
    );

    // Backfill: copiar nome/cor de cada agendamento distinto por identificador_externo
    await queryRunner.query(`
      INSERT INTO calendario_agendamento_metadata
        (identificador_externo_calendario_agendamento, nome, cor, date_updated)
      SELECT DISTINCT ON (identificador_externo)
        identificador_externo, nome, cor, date_updated
      FROM calendario_agendamento
      ORDER BY identificador_externo, version DESC
    `);

    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_agendamento_metadata')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS change_date_updated ON calendario_agendamento_metadata`,
    );
    await queryRunner.dropTable("calendario_agendamento_metadata", true, true, true);
  }
}
