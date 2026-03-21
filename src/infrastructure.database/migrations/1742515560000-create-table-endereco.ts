import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEndereco1742515560000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "endereco",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "cep", type: "text", isNullable: false },
          { name: "logradouro", type: "text", isNullable: false },
          { name: "numero", type: "text", isNullable: false },
          { name: "bairro", type: "text", isNullable: false },
          { name: "complemento", type: "text", isNullable: true },
          { name: "ponto_referencia", type: "text", isNullable: true },
          { name: "id_cidade_fk", type: "int", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false },
          { name: "date_updated", type: "timestamptz", isNullable: false },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__endereco__depende__base_cidade",
            columnNames: ["id_cidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "base_cidade",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('endereco')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("endereco", true, true, true);
  }
}
