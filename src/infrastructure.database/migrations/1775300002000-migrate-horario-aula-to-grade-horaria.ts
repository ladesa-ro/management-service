import type { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateHorarioAulaToGradeHoraria1775300002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migrar registros existentes de horario_aula_configuracao para grade_horaria
    await queryRunner.query(`
      INSERT INTO grade_horaria (id, identificador_externo, nome, data_inicio, data_fim, ativo, id_campus_fk, date_created, date_updated, date_deleted)
      SELECT
        id,
        gen_random_uuid(),
        'Grade Principal',
        data_inicio,
        data_fim,
        ativo,
        id_campus_fk,
        now(),
        now(),
        CASE WHEN ativo = false THEN now() ELSE NULL END
      FROM horario_aula_configuracao
    `);

    // Migrar intervalos de horario_aula (configuracao_item) para grade_horaria_intervalo
    await queryRunner.query(`
      INSERT INTO grade_horaria_intervalo (id, inicio, fim, id_grade_horaria_fk)
      SELECT
        hai.id,
        hai.inicio,
        hai.fim,
        hai.id_horario_aula_configuracao_fk
      FROM horario_aula_configuracao_item hai
      WHERE EXISTS (
        SELECT 1 FROM grade_horaria gh WHERE gh.id = hai.id_horario_aula_configuracao_fk
      )
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Rollback nao aplicavel — dados migrados nao podem ser revertidos com seguranca
  }
}
