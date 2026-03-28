import { type MigrationInterface, type QueryRunner } from "typeorm";

export class RenameHorarioAulaToConfiguracaoItem1774733808000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Dropar FK que referencia horario_aula antes de renomear
    await queryRunner.query(
      `ALTER TABLE "turma_horario_aula" DROP CONSTRAINT "fk__turma_horario_aula__depende__horario_aula"`,
    );

    // Renomear tabela
    await queryRunner.renameTable("horario_aula", "horario_aula_configuracao_item");

    // Renomear FK da tabela renomeada
    await queryRunner.query(
      `ALTER TABLE "horario_aula_configuracao_item" RENAME CONSTRAINT "fk__horario_aula__depende__horario_aula_configuracao" TO "fk__horario_aula_configuracao_item__depende__horario_aula_configuracao"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "horario_aula_configuracao_item" RENAME CONSTRAINT "fk__horario_aula_configuracao_item__depende__horario_aula_configuracao" TO "fk__horario_aula__depende__horario_aula_configuracao"`,
    );

    await queryRunner.renameTable("horario_aula_configuracao_item", "horario_aula");

    await queryRunner.query(
      `ALTER TABLE "turma_horario_aula" ADD CONSTRAINT "fk__turma_horario_aula__depende__horario_aula" FOREIGN KEY ("id_horario_aula_fk") REFERENCES "horario_aula"("id")`,
    );
  }
}
