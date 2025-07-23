import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "endereco";

export class CreateTableEndereco1710183783857 implements MigrationInterface {
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

          //

          {
            name: "cep",
            type: "text",
            isNullable: false,
          },

          {
            name: "logradouro",
            type: "text",
            isNullable: false,
          },

          {
            name: "numero",
            type: "int",
            isNullable: false,
          },

          {
            name: "bairro",
            type: "text",
            isNullable: false,
          },

          {
            name: "complemento",
            type: "text",
            isNullable: true,
          },

          {
            name: "ponto_referencia",
            type: "text",
            isNullable: true,
          },

          //

          {
            name: "id_cidade_fk",
            type: "int",
          },

          //

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
            name: "fk_endereco_tem_cidade",
            columnNames: ["id_cidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "base_cidade",
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
