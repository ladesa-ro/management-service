import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableBaseEstado1742515440000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "base_estado",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "sigla",
            type: "text",
            isNullable: false,
          },
          {
            name: "nome",
            type: "text",
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("base_estado", true, true, true);
  }
}
