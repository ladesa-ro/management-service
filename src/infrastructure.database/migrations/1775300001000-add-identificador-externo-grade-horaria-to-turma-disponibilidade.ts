import { type MigrationInterface, type QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddIdentificadorExternoGradeHorariaToTurmaDisponibilidade1775300001000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "turma_disponibilidade_configuracao",
      new TableColumn({
        name: "identificador_externo_grade_horaria",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createIndex(
      "turma_disponibilidade_configuracao",
      new TableIndex({
        name: "idx__turma_disponibilidade_configuracao__identificador_externo_grade_horaria",
        columnNames: ["identificador_externo_grade_horaria"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      "turma_disponibilidade_configuracao",
      "idx__turma_disponibilidade_configuracao__identificador_externo_grade_horaria",
    );
    await queryRunner.dropColumn(
      "turma_disponibilidade_configuracao",
      "identificador_externo_grade_horaria",
    );
  }
}
