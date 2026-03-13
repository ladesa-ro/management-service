import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumTypes1773000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "calendario_agendamento_status" AS ENUM ('RASCUNHO', 'ATIVO', 'INATIVO')`);
    await queryRunner.query(`CREATE TYPE "calendario_agendamento_tipo" AS ENUM ('INDISPONIBILIDADE', 'AULA', 'EVENTO', 'RESERVA')`);
    await queryRunner.query(`CREATE TYPE "gerar_horario_status" AS ENUM ('SOLICITADO', 'PENDENTE', 'SUCESSO', 'ERRO')`);
    await queryRunner.query(`CREATE TYPE "gerar_horario_duracao" AS ENUM ('TEMPORARIO', 'PERMANENTE')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS "gerar_horario_duracao"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "gerar_horario_status"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_agendamento_tipo"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_agendamento_status"`);
  }
}
