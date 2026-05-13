import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnTurmaAtEstagiario1778259503024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "estagiario" DROP CONSTRAINT IF EXISTS "FK_estagiario_turma";
        `);
    await queryRunner.query(`
            ALTER TABLE "estagiario" DROP COLUMN IF EXISTS "id_turma_fk";
        `);

    await queryRunner.addColumn(
      "estagiario",
      new (require("typeorm").TableColumn)({
        name: "periodo",
        type: "varchar",
        length: "20",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("estagiario", "periodo");

    await queryRunner.query(`
            ALTER TABLE "estagiario" ADD COLUMN "id_turma_fk" uuid;
        `);

    await queryRunner.query(`
            ALTER TABLE "estagiario"
            ADD CONSTRAINT "FK_estagiario_turma"
            FOREIGN KEY ("id_turma_fk") REFERENCES "turma"("id");
        `);
  }
}
