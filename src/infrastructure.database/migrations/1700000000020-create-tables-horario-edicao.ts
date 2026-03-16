import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablesHorarioEdicao1700000000020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "horario_edicao_sessao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "status", type: "varchar", length: "20", isNullable: false, default: "'ABERTA'" },
          { name: "id_usuario_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
        ],
        foreignKeys: [
          {
            name: "fk__horario_edicao_sessao__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "horario_edicao_mudanca",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_sessao_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_agendamento_fk", type: "uuid", isNullable: true },
          { name: "tipo_operacao", type: "varchar", length: "20", isNullable: false },
          { name: "dados", type: "jsonb", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
        ],
        foreignKeys: [
          {
            name: "fk__horario_edicao_mudanca__depende__sessao",
            columnNames: ["id_sessao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "horario_edicao_sessao",
          },
          {
            name: "fk__horario_edicao_mudanca__depende__calendario_agendamento",
            columnNames: ["id_calendario_agendamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_agendamento",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_edicao_mudanca", true, true, true);
    await queryRunner.dropTable("horario_edicao_sessao", true, true, true);
  }
}
