import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "estagio";

export class CreateTableEstagio1771257085550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          {
            name: "id_empresa_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "id_estagiario_fk",
            type: "uuid",
            isNullable: true, // null enquanto for apenas vaga
          },
          {
            name: "carga_horaria",
            type: "integer",
            isNullable: false,
          },
          {
            name: "data_inicio",
            type: "date",
            isNullable: true,
          },
          {
            name: "data_fim",
            type: "date",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"],
            default: "'ABERTA'",
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_updated",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_deleted",
            type: "timestamptz",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_empresa_fk"],
            referencedTableName: "empresa",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["id_estagiario_fk"],
            referencedTableName: "estagiario",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
