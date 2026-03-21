import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioAgendamento1742517420000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_agendamento",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "tipo", type: "calendario_agendamento_tipo", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "dia_inteiro", type: "boolean", isNullable: false },
          { name: "horario_inicio", type: "time", isNullable: false },
          { name: "horario_fim", type: "time", isNullable: false },
          { name: "repeticao", type: "text", isNullable: true },
          { name: "nome", type: "text", isNullable: true },
          { name: "cor", type: "text", isNullable: true },
          { name: "status", type: "calendario_agendamento_status", isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_agendamento", true, true, true);
  }
}
