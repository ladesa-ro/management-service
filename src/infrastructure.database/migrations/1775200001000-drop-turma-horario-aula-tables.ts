import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class DropTurmaHorarioAulaTables1775200001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma_horario_aula_configuracao_item", true, true, true);
    await queryRunner.dropTable("turma_horario_aula_configuracao", true, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
}
