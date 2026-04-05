import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSituacaoToCalendarioLetivo1775900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "calendario_letivo_situacao_enum" AS ENUM ('ATIVO', 'INATIVO')`,
    );

    await queryRunner.addColumn(
      "calendario_letivo",
      new TableColumn({
        name: "situacao",
        type: "calendario_letivo_situacao_enum",
        default: `'ATIVO'`,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("calendario_letivo", "situacao");
    await queryRunner.query(`DROP TYPE "calendario_letivo_situacao_enum"`);
  }
}
