import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultNowToArquivoDateCreated1775800001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arquivo" ALTER COLUMN "date_created" SET DEFAULT NOW()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arquivo" ALTER COLUMN "date_created" DROP DEFAULT`);
  }
}
