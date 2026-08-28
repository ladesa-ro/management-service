import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingValuesToGerarHorarioStatus2026082800001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "gerar_horario_status" ADD VALUE IF NOT EXISTS 'ACEITO'`);
    await queryRunner.query(`ALTER TYPE "gerar_horario_status" ADD VALUE IF NOT EXISTS 'REJEITADO'`);
  }

  public async down(): Promise<void> {
    // PostgreSQL não suporta remover valor de enum. Reverter exigiria recriar o tipo
    // do zero (criar novo tipo sem os valores, migrar a coluna, apagar o tipo antigo),
    // arriscado se alguma linha já usa "ACEITO"/"REJEITADO". Sem down por decisao.
  }
}
