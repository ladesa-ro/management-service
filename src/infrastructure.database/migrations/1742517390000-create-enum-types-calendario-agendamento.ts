import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnumTypesCalendarioAgendamento1742517390000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "calendario_agendamento_status" AS ENUM ('RASCUNHO', 'ATIVO', 'INATIVO')`,
    );
    await queryRunner.query(
      `CREATE TYPE "calendario_agendamento_tipo" AS ENUM ('INDISPONIBILIDADE', 'AULA', 'EVENTO', 'RESERVA')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_agendamento_tipo"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "calendario_agendamento_status"`);
  }
}
