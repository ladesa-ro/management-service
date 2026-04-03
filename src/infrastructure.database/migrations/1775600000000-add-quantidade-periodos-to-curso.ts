import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddQuantidadePeriodosToCurso1775600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "curso",
      new TableColumn({
        name: "quantidade_periodos",
        type: "integer",
        isNullable: false,
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("curso", "quantidade_periodos");
  }
}
