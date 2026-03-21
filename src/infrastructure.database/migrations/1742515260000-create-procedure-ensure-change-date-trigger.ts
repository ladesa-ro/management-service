import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedureEnsureChangeDateTrigger1742515260000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE PROCEDURE ensure_change_date_trigger(table_name text)
      LANGUAGE plpgsql
      AS $$
      BEGIN
          EXECUTE format(
              'DROP TRIGGER IF EXISTS change_date_updated_table_%I ON %I',
              table_name,
              table_name
          );

          EXECUTE format(
              'CREATE TRIGGER change_date_updated_table_%I
               BEFORE UPDATE ON %I
               FOR EACH ROW
               EXECUTE FUNCTION change_date_updated()',
              table_name,
              table_name
          );
      END;
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP PROCEDURE IF EXISTS ensure_change_date_trigger;
    `);
  }
}
