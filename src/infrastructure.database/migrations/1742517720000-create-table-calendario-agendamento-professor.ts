import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioAgendamentoProfessor1742517720000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_agendamento_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
          {
            name: "fk__calendario_agendamento_professor__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_agendamento_professor", true, true, true);
  }
}
