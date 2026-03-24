import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnNomeToTurma1742518740000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "turma",
      new TableColumn({
        name: "nome",
        type: "text",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("turma", "nome");
  }
}
