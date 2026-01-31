import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstado1710183444192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "base_estado",

        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: false,
          },

          // ...

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
    await queryRunner.dropDatabase("base_estado", true);
  }
}
