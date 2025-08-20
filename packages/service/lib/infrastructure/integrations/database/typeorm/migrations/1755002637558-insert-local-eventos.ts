import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class InsertLocalEvento1755002637558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("evento", [
      new TableColumn({
        name: "local",
        type: "varchar",
        length: "80",
        default: "NULL",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("evento", ["local"]);
  }
}
