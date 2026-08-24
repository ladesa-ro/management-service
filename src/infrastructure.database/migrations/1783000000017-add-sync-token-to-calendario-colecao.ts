import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSyncTokenToCalendarioColecao1783000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "calendario_colecao",
      new TableColumn({
        name: "sync_token",
        type: "bigint",
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("calendario_colecao", "sync_token");
  }
}
