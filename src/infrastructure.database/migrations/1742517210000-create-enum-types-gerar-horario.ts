import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumTypesGerarHorario1742517210000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "gerar_horario_status" AS ENUM ('SOLICITADO', 'PENDENTE', 'SUCESSO', 'ERRO')`,
    );
    await queryRunner.query(
      `CREATE TYPE "gerar_horario_duracao" AS ENUM ('TEMPORARIO', 'PERMANENTE')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS "gerar_horario_duracao"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "gerar_horario_status"`);
  }
}
