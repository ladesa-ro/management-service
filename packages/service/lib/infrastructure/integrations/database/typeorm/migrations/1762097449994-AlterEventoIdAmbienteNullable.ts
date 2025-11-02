import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterEventoIdAmbienteNullable1762097449994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "evento",
      "id_ambiente_fk",
      new TableColumn({
        name: "id_ambiente_fk",
        type: "uuid",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "evento",
      "id_ambiente_fk",
      new TableColumn({
        name: "id_ambiente_fk",
        type: "uuid",
        isNullable: false,
      }),
    );
  }
}
