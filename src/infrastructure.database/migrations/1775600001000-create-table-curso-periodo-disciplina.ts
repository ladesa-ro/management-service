import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCursoPeriodoDisciplina1775600001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "curso_periodo_disciplina",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_curso_fk", type: "uuid", isNullable: false },
          { name: "numero_periodo", type: "integer", isNullable: false },
          { name: "id_disciplina_fk", type: "uuid", isNullable: false },
          { name: "carga_horaria", type: "integer", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__curso_periodo_disciplina__depende__curso",
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
            onDelete: "CASCADE",
          },
          {
            name: "fk__curso_periodo_disciplina__depende__disciplina",
            columnNames: ["id_disciplina_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disciplina",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("curso_periodo_disciplina", true, true, true);
  }
}
