import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDiaCalendarioToCalendarioLetivoDia1773000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE dia_calendario RENAME TO calendario_letivo_dia`);
    await queryRunner.query(`DROP TRIGGER IF EXISTS change_date_updated_table_dia_calendario ON calendario_letivo_dia`);
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo_dia')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS change_date_updated_table_calendario_letivo_dia ON dia_calendario`);
    await queryRunner.query(`ALTER TABLE calendario_letivo_dia RENAME TO dia_calendario`);
    await queryRunner.query(`CALL ensure_change_date_trigger('dia_calendario')`);
  }
}
