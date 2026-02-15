import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const tableName = "empresa";

export class CreateTableEmpresa1770849021768 implements MigrationInterface {
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
            name: "razao_social",
            type: "text",
            isNullable: false,
          },
          {
            name: "telefone",
            type: "varchar(12)",
            isNullable: false,
          },
          {
            name: "cnpj",
            type: "varchar(14)",
            isNullable: false,
          },
          {
            name: "nome_fantasia",
            type: "text",
            isNullable: false,
          },
          {
            name: "email",
            type: "text",
            isNullable: false,
          },
          {
            name: "id_endereco_fk",
            type: "uuid",
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
      }),
    );
    await queryRunner.createForeignKey(
      "empresa",
      new TableForeignKey({
        columnNames: ["id_endereco_fk"],
        referencedTableName: "endereco",
        referencedColumnNames: ["id"],
        name: "fk_empresa_endereco",
        onDelete: "RESTRICT",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void>{
    await queryRunner.dropForeignKey("empresa", "fk_empresa_endereco");
    await queryRunner.dropTable("empresa");
  }
}
