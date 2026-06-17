import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDisponivelToEstagioStatus1781000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE estagio_status_enum ADD VALUE IF NOT EXISTS 'DISPONIVEL';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
