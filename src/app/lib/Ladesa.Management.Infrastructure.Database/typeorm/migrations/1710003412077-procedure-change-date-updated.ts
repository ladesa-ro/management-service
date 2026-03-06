import { MigrationInterface, QueryRunner } from "typeorm";

export class ProcedureChangeDateUpdated1710003412077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION change_date_updated() RETURNS TRIGGER
      AS
      $BODY$
      BEGIN
        new.date_updated := now();
        RETURN new;
      END;
      $BODY$
      LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS change_date_updated;
    `);
  }
}
