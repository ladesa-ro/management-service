import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioAgendamentoTurma1742517780000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_turma",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_turma__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
          {
            name: "fk__calendario_agendamento_turma__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_agendamento_turma", true, true, true);
  }
}
