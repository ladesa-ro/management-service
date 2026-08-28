import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddMissingColumnsToCalendarioLetivoDia2026082800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "calendario_letivo_dia",
      new TableColumn({
        name: "dia_presencial",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.addColumn(
      "calendario_letivo_dia",
      new TableColumn({
        name: "tipo",
        type: "varchar",
        length: "50",
        isNullable: false,
        default: "'Outro'",
      }),
    );

    await queryRunner.addColumn(
      "calendario_letivo_dia",
      new TableColumn({
        name: "extra_curricular",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("calendario_letivo_dia", "extra_curricular");
    await queryRunner.dropColumn("calendario_letivo_dia", "tipo");
    await queryRunner.dropColumn("calendario_letivo_dia", "dia_presencial");
  }
}
