import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDatedColumnsToCalendarioAgendamento1742518800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("calendario_agendamento", [
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
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_agendamento')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS change_date_updated ON calendario_agendamento`,
    );
    await queryRunner.dropColumns("calendario_agendamento", [
      "date_created",
      "date_updated",
      "date_deleted",
    ]);
  }
}
