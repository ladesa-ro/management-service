import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class AddVersioningColumnsToGradeHoraria1775500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("grade_horaria", [
      new TableColumn({
        name: "version",
        type: "integer",
        isNullable: false,
        default: 1,
      }),
      new TableColumn({
        name: "previous_version_id",
        type: "uuid",
        isNullable: true,
      }),
      new TableColumn({
        name: "valid_from",
        type: "timestamptz",
        isNullable: false,
        default: "now()",
      }),
      new TableColumn({
        name: "valid_to",
        type: "timestamptz",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "grade_horaria",
      new TableForeignKey({
        name: "fk__grade_horaria__depende__grade_horaria_previous_version",
        columnNames: ["previous_version_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "grade_horaria",
      }),
    );

    // Backfill: registros existentes recebem version=1, valid_from=date_created, valid_to=date_deleted
    await queryRunner.query(`
      UPDATE grade_horaria SET
        version = 1,
        valid_from = date_created,
        valid_to = date_deleted
    `);

    await queryRunner.createIndex(
      "grade_horaria",
      new TableIndex({
        name: "idx__grade_horaria__identificador_externo_valid",
        columnNames: ["identificador_externo", "valid_from", "valid_to"],
      }),
    );

    // Partial unique index: apenas uma versao vigente por identificador_externo
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq__grade_horaria__identificador_externo_active"
        ON "grade_horaria" ("identificador_externo")
        WHERE "valid_to" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq__grade_horaria__identificador_externo_active"`,
    );
    await queryRunner.dropIndex("grade_horaria", "idx__grade_horaria__identificador_externo_valid");
    await queryRunner.dropForeignKey(
      "grade_horaria",
      "fk__grade_horaria__depende__grade_horaria_previous_version",
    );
    await queryRunner.dropColumns("grade_horaria", [
      "version",
      "previous_version_id",
      "valid_from",
      "valid_to",
    ]);
  }
}
