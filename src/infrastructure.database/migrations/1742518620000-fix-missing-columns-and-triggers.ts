import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class FixMissingColumnsAndTriggers1742518620000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // =====================================================================
    // arquivo: add missing date_updated, date_deleted columns and trigger
    // =====================================================================
    await queryRunner.addColumns("arquivo", [
      new TableColumn({
        name: "date_updated",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
      new TableColumn({ name: "date_deleted", type: "timestamptz", isNullable: true }),
    ]);
    await queryRunner.query(`CALL ensure_change_date_trigger('arquivo')`);

    // =====================================================================
    // diario_preferencia_agrupamento: add missing columns and trigger
    // =====================================================================
    await queryRunner.addColumns("diario_preferencia_agrupamento", [
      new TableColumn({ name: "dia_semana_iso", type: "int", isNullable: false, default: "1" }),
      new TableColumn({ name: "aulas_seguidas", type: "int", isNullable: false, default: "1" }),
      new TableColumn({
        name: "date_created",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
      new TableColumn({
        name: "date_updated",
        type: "timestamptz",
        isNullable: false,
        default: "NOW()",
      }),
      new TableColumn({ name: "date_deleted", type: "timestamptz", isNullable: true }),
    ]);
    await queryRunner.query(`CALL ensure_change_date_trigger('diario_preferencia_agrupamento')`);

    // =====================================================================
    // horario_edicao_sessao: add missing trigger
    // =====================================================================
    await queryRunner.query(`CALL ensure_change_date_trigger('horario_edicao_sessao')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("diario_preferencia_agrupamento", [
      "dia_semana_iso",
      "aulas_seguidas",
      "date_created",
      "date_updated",
      "date_deleted",
    ]);

    await queryRunner.dropColumns("arquivo", ["date_updated", "date_deleted"]);
  }
}
