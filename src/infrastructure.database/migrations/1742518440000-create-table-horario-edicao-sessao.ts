import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHorarioEdicaoSessao1742518440000 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("horario_edicao_sessao", true, true, true);
  }
}
