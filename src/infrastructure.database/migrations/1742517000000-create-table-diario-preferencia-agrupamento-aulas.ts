import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableDiarioPreferenciaAgrupamentoAulas1742517000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diario_preferencia_agrupamento_aulas",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "dia_semana", type: "integer", isNullable: true },
          { name: "aulas_seguidas", type: "integer", isNullable: false },
          { name: "horario_inicio", type: "time", isNullable: true },
          { name: "horario_termino", type: "time", isNullable: true },
          { name: "id_diario_preferencia_agrupamento_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__diario_preferencia_agrupamento_aulas__depende__diario_preferencia_agrupamento",
            columnNames: ["id_diario_preferencia_agrupamento_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario_preferencia_agrupamento",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diario_preferencia_agrupamento_aulas", true, true, true);
  }
}
