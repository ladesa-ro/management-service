import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableGerarHorario1742517240000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gerar_horario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "status", type: "gerar_horario_status", isNullable: false },
          { name: "duracao", type: "gerar_horario_duracao", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_termino", type: "date", isNullable: true },
          { name: "requisicao_gerador", type: "jsonb", isNullable: true },
          { name: "resposta_gerador", type: "jsonb", isNullable: true },
          { name: "id_usuario_geracao_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
        ],
        foreignKeys: [
          {
            name: "fk__gerar_horario__depende__usuario",
            columnNames: ["id_usuario_geracao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gerar_horario", true, true, true);
  }
}
