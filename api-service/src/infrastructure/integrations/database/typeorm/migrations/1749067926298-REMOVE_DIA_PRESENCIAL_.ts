import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveDiaPresencial implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("dia_calendario", "dia_presencial");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "dia_calendario",
      new TableColumn({
        name: "dia_presencial",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );
  }
}