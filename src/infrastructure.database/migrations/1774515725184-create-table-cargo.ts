import { MigrationInterface, QueryRunner, Table } from "typeorm";
const CARGO = "cargo";

export class CreateTableCargo1774515725184 implements MigrationInterface {

      public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(CARGO)) return;

    await queryRunner.createTable(
      new Table({
        name: CARGO,
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "nome", type: "text", isNullable: false, isUnique: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(CARGO)) {
      await queryRunner.dropTable(CARGO);
    }
  }
}
