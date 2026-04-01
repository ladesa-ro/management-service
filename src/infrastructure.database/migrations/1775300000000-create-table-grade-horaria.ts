import { type MigrationInterface, type QueryRunner, Table, TableCheck, TableIndex } from "typeorm";

export class CreateTableGradeHoraria1775300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "grade_horaria",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "identificador_externo", type: "uuid", isNullable: false },
          { name: "nome", type: "varchar", length: "255", isNullable: false },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_fim", type: "date", isNullable: true },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "now()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "now()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__grade_horaria__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );

    await queryRunner.createCheckConstraint(
      "grade_horaria",
      new TableCheck({
        name: "chk__grade_horaria__data_fim_gte_data_inicio",
        expression: "data_fim IS NULL OR data_fim >= data_inicio",
      }),
    );

    await queryRunner.createIndex(
      "grade_horaria",
      new TableIndex({
        name: "idx__grade_horaria__campus_ativo",
        columnNames: ["id_campus_fk", "ativo"],
      }),
    );

    await queryRunner.createIndex(
      "grade_horaria",
      new TableIndex({
        name: "idx__grade_horaria__identificador_externo",
        columnNames: ["identificador_externo"],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "grade_horaria_intervalo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "inicio", type: "time", isNullable: false },
          { name: "fim", type: "time", isNullable: false },
          { name: "id_grade_horaria_fk", type: "uuid", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__grade_horaria_intervalo__depende__grade_horaria",
            columnNames: ["id_grade_horaria_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "grade_horaria",
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      "grade_horaria_intervalo",
      new TableIndex({
        name: "idx__grade_horaria_intervalo__grade_horaria",
        columnNames: ["id_grade_horaria_fk"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("grade_horaria_intervalo", true, true, true);
    await queryRunner.dropTable("grade_horaria", true, true, true);
  }
}
