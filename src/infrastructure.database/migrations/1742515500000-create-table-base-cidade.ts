import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBaseCidade1742515500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "base_cidade",
        columns: [
          { name: "id", type: "int", isPrimary: true },
          { name: "nome", type: "text", isNullable: false },
          { name: "id_estado_fk", type: "int", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__base_cidade__depende__base_estado",
            columnNames: ["id_estado_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "base_estado",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("base_cidade", true, true, true);
  }
}
