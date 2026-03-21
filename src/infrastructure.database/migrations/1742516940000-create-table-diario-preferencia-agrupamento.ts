import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableDiarioPreferenciaAgrupamento1742516940000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diario_preferencia_agrupamento",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "ativo", type: "boolean", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__diario_preferencia_agrupamento__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diario_preferencia_agrupamento", true, true, true);
  }
}
