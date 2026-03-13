import { MigrationInterface, QueryRunner } from "typeorm";

const tableName = "usuario";

export class RenameColumnMatriculaSiapToMatricula1772894364770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    if (table?.findColumnByName("matricula_siap")) {
      await queryRunner.renameColumn(tableName, "matricula_siap", "matricula");
      return;
    }

    if (table?.findColumnByName("matricula_siape")) {
      await queryRunner.renameColumn(tableName, "matricula_siape", "matricula");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(tableName);

    if (table?.findColumnByName("matricula")) {
      await queryRunner.renameColumn(tableName, "matricula", "matricula_siap");
    }
  }
}
