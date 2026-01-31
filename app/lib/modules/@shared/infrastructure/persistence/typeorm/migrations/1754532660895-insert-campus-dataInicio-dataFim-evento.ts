import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class InsertCampusDataInicioDataFimEvento1754532660895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("evento", [
      new TableColumn({
        name: "data_inicio",
        type: "timestamptz",
        isNullable: true,
      }),
      new TableColumn({
        name: "data_fim",
        type: "timestamptz",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("evento", ["data_inicio", "data_fim"]);
  }
}
