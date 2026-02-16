import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "responsavel_empresa";
export class CreateTableResponsaveEmpresa1771246482001 implements MigrationInterface {
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
            name: "nome_responsavel",
            type: "varchar",
            length: "35",
            isNullable: false,
          },
          {
            name: "email",
            type: "text",
            isNullable: false,
          },
          {
            name: "telefone",
            type: "varchar",
            length: "15",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isNullable: false,
          },
          {
            name: "cargo",
            type: "text",
            isNullable: false,
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
