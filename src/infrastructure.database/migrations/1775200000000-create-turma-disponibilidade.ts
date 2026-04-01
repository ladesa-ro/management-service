import { type MigrationInterface, type QueryRunner, Table, TableCheck, TableIndex } from "typeorm";

export class CreateTurmaDisponibilidade1775200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "turma_disponibilidade_configuracao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "now()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "now()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__turma_disponibilidade_configuracao__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );

    await queryRunner.createCheckConstraint(
      "turma_disponibilidade_configuracao",
      new TableCheck({
        name: "chk__turma_disponibilidade_configuracao__data_fim_gte_data_inicio",
        expression: "data_fim IS NULL OR data_fim >= data_inicio",
      }),
    );

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao__turma_data_inicio",
        columnNames: ["id_turma_fk", "data_inicio"],
      }),
    );

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao__turma_data_fim",
        columnNames: ["id_turma_fk", "data_fim"],
      }),
    );

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao__turma_ativo",
        columnNames: ["id_turma_fk", "ativo"],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "turma_disponibilidade_configuracao_item",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          {
            name: "id_turma_disponibilidade_configuracao_fk",
            type: "uuid",
            isNullable: false,
          },
          { name: "dia_semana", type: "smallint", isNullable: false },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__turma_disponibilidade_configuracao_item__depende__turma_disponibilidade_configuracao",
            columnNames: ["id_turma_disponibilidade_configuracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma_disponibilidade_configuracao",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao_item",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao_item__configuracao_dia",
        columnNames: ["id_turma_disponibilidade_configuracao_fk", "dia_semana"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma_disponibilidade_configuracao_item", true, true, true);
    await queryRunner.dropTable("turma_disponibilidade_configuracao", true, true, true);
  }
}
