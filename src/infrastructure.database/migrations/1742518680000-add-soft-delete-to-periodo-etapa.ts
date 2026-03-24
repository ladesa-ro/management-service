import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const createDateColumns = () => [
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
];

export class AddSoftDeleteToPeriodoEtapa1742518680000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("oferta_formacao_periodo", createDateColumns());
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao_periodo')`);

    await queryRunner.addColumns("oferta_formacao_periodo_etapa", createDateColumns());
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao_periodo_etapa')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("oferta_formacao_periodo_etapa", [
      "date_created",
      "date_updated",
      "date_deleted",
    ]);
    await queryRunner.dropColumns("oferta_formacao_periodo", [
      "date_created",
      "date_updated",
      "date_deleted",
    ]);
  }
}
