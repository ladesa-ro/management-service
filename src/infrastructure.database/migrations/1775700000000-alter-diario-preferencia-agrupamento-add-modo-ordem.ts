import { type MigrationInterface, type QueryRunner, TableColumn } from "typeorm";

export class AlterDiarioPreferenciaAgrupamentoAddModoOrdem1775700000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar coluna 'modo' (enum: DEFINIDO | POR_DIA_SEMANA)
    await queryRunner.addColumn(
      "diario_preferencia_agrupamento",
      new TableColumn({
        name: "modo",
        type: "varchar",
        length: "20",
        isNullable: false,
        default: "'DEFINIDO'",
      }),
    );

    // Adicionar coluna 'ordem' (sequencial generico para modo DEFINIDO)
    await queryRunner.addColumn(
      "diario_preferencia_agrupamento",
      new TableColumn({
        name: "ordem",
        type: "int",
        isNullable: false,
        default: "1",
      }),
    );

    // Tornar dia_semana_iso nullable (modo DEFINIDO nao requer dia da semana)
    await queryRunner.changeColumn(
      "diario_preferencia_agrupamento",
      "dia_semana_iso",
      new TableColumn({
        name: "dia_semana_iso",
        type: "int",
        isNullable: true,
        default: null,
      }),
    );

    // Backfill: registros existentes tinham dia_semana_iso obrigatorio, portanto sao POR_DIA_SEMANA
    await queryRunner.query(`
      UPDATE diario_preferencia_agrupamento
      SET modo = 'POR_DIA_SEMANA'
      WHERE dia_semana_iso IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar dia_semana_iso como NOT NULL (backfill nulls com default 1)
    await queryRunner.query(`
      UPDATE diario_preferencia_agrupamento
      SET dia_semana_iso = 1
      WHERE dia_semana_iso IS NULL
    `);

    await queryRunner.changeColumn(
      "diario_preferencia_agrupamento",
      "dia_semana_iso",
      new TableColumn({
        name: "dia_semana_iso",
        type: "int",
        isNullable: false,
        default: "1",
      }),
    );

    await queryRunner.dropColumns("diario_preferencia_agrupamento", ["modo", "ordem"]);
  }
}
