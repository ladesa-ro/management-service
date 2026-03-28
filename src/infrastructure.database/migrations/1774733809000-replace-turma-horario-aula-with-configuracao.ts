import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReplaceTurmaHorarioAulaWithConfiguracao1774733809000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Dropar tabela antiga turma_horario_aula
    await queryRunner.dropTable("turma_horario_aula", true, true, true);

    // Criar turma_horario_aula_configuracao (container per turma)
    await queryRunner.createTable(
      new Table({
        name: "turma_horario_aula_configuracao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__turma_horario_aula_configuracao__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );

    // Criar turma_horario_aula_configuracao_item (time slots per turma config)
    await queryRunner.createTable(
      new Table({
        name: "turma_horario_aula_configuracao_item",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
          {
            name: "id_turma_horario_aula_configuracao_fk",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "fk__turma_horario_aula_configuracao_item__depende__turma_horario_aula_configuracao",
            columnNames: ["id_turma_horario_aula_configuracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma_horario_aula_configuracao",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma_horario_aula_configuracao_item", true, true, true);
    await queryRunner.dropTable("turma_horario_aula_configuracao", true, true, true);

    // Recriar tabela antiga
    await queryRunner.createTable(
      new Table({
        name: "turma_horario_aula",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_horario_aula_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__turma_horario_aula__depende__horario_aula",
            columnNames: ["id_horario_aula_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_aula_configuracao_item",
          },
          {
            name: "fk__turma_horario_aula__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );
  }
}
