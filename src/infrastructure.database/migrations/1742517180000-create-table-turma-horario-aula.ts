import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTurmaHorarioAula1742517180000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
            referencedTableName: "horario_aula",
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma_horario_aula", true, true, true);
  }
}
