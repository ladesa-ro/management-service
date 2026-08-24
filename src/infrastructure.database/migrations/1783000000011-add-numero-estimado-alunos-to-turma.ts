import { type MigrationInterface, type QueryRunner, TableColumn } from "typeorm";

export class AddNumeroEstimadoAlunosToTurma1783000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "turma",
      new TableColumn({
        name: "numero_estimado_alunos",
        type: "integer",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("turma", "numero_estimado_alunos");
  }
}
