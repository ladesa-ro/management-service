import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstagio1742518080000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estagio",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_empresa_fk", type: "uuid", isNullable: false },
          { name: "id_estagiario_fk", type: "uuid", isNullable: true },
          { name: "carga_horaria", type: "integer", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: true },
          { name: "data_fim", type: "date", isNullable: true },
          {
            name: "status",
            type: "enum",
            enum: ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"],
            default: "'ABERTA'",
          },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagio__depende__empresa",
            columnNames: ["id_empresa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "empresa",
            onDelete: "CASCADE",
          },
          {
            name: "fk__estagio__depende__estagiario",
            columnNames: ["id_estagiario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "estagiario",
            onDelete: "SET NULL",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('estagio')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estagio", true, true, true);
  }
}
