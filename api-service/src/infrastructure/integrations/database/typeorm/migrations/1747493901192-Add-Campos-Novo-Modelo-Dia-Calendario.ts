import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCamposNovoModeloDiaCalendario1710189999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "dia_calendario",
      new TableColumn({
        name: "dia_presencial",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.addColumn(
      "dia_calendario",
      new TableColumn({
        name: "tipo",
        type: "varchar",
        length: "50",
        isNullable: false,
        default: `'Outro'`,
      }),
    );

    await queryRunner.addColumn(
      "dia_calendario",
      new TableColumn({
        name: "extra_curricular",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.changeColumn(
      "dia_calendario",
      "feriado",
      new TableColumn({
        name: "feriado",
        type: "varchar",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("dia_calendario", "dia_presencial");
    await queryRunner.dropColumn("dia_calendario", "tipo");
    await queryRunner.dropColumn("dia_calendario", "extra_curricular");

    await queryRunner.changeColumn(
      "dia_calendario",
      "feriado",
      new TableColumn({
        name: "feriado",
        type: "bool",
        isNullable: false,
      }),
    );
  }
}
