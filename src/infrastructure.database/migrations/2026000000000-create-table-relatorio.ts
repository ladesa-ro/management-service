import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTableRelatorio2026000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "relatorio",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_estagio_fk",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_updated",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_deleted",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "conteudo_json",
            type: "jsonb",
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "relatorio",
      new TableIndex({
        name: "UQ_relatorio_estagio",
        columnNames: ["id_estagio_fk"],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      "relatorio",
      new TableForeignKey({
        columnNames: ["id_estagio_fk"],
        referencedColumnNames: ["id"],
        referencedTableName: "estagio",
        onDelete: "NO ACTION",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("relatorio");
    if (table) {
      const fk = table.foreignKeys.find((fk) => fk.columnNames.includes("id_estagio_fk"));
      if (fk) await queryRunner.dropForeignKey("relatorio", fk);
      const idx = table.indices.find((idx) => idx.name === "UQ_relatorio_estagio");
      if (idx) await queryRunner.dropIndex("relatorio", idx);
      await queryRunner.dropTable("relatorio");
    }
  }
}
