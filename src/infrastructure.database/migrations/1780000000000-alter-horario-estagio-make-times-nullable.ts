import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterHorarioEstagioMakeTimesNullable1780000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "horario_estagio" ALTER COLUMN "hora_inicio" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "horario_estagio" ALTER COLUMN "hora_fim" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "horario_estagio" ALTER COLUMN "hora_inicio" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "horario_estagio" ALTER COLUMN "hora_fim" SET NOT NULL`);
  }
}
