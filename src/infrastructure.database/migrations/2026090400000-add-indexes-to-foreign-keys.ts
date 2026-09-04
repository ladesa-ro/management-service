import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AddIndexesToForeignKeys2026090400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const indexes: { table: string; columns: string[]; name: string }[] = [
      {
        table: "perfil",
        columns: ["id_usuario_fk"],
        name: "idx__perfil__id_usuario_fk",
      },
      {
        table: "perfil",
        columns: ["id_campus_fk"],
        name: "idx__perfil__id_campus_fk",
      },
      {
        table: "bloco",
        columns: ["id_campus_fk"],
        name: "idx__bloco__id_campus_fk",
      },
      {
        table: "ambiente",
        columns: ["id_bloco_fk"],
        name: "idx__ambiente__id_bloco_fk",
      },
      {
        table: "curso",
        columns: ["id_campus_fk"],
        name: "idx__curso__id_campus_fk",
      },
      {
        table: "turma",
        columns: ["id_curso_fk"],
        name: "idx__turma__id_curso_fk",
      },
      {
        table: "diario",
        columns: ["id_calendario_letivo_fk"],
        name: "idx__diario__id_calendario_letivo_fk",
      },
      {
        table: "diario",
        columns: ["id_turma_fk"],
        name: "idx__diario__id_turma_fk",
      },
      {
        table: "diario",
        columns: ["id_disciplina_fk"],
        name: "idx__diario__id_disciplina_fk",
      },
      {
        table: "diario_professor",
        columns: ["id_diario_fk"],
        name: "idx__diario_professor__id_diario_fk",
      },
      {
        table: "diario_professor",
        columns: ["id_perfil_fk"],
        name: "idx__diario_professor__id_perfil_fk",
      },
      {
        table: "calendario_letivo",
        columns: ["id_campus_fk"],
        name: "idx__calendario_letivo__id_campus_fk",
      },
    ];

    for (const { table, columns, name } of indexes) {
      await queryRunner.createIndex(
        table,
        new TableIndex({
          name,
          columnNames: columns,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const indexes: { table: string; name: string }[] = [
      { table: "perfil", name: "idx__perfil__id_usuario_fk" },
      { table: "perfil", name: "idx__perfil__id_campus_fk" },
      { table: "bloco", name: "idx__bloco__id_campus_fk" },
      { table: "ambiente", name: "idx__ambiente__id_bloco_fk" },
      { table: "curso", name: "idx__curso__id_campus_fk" },
      { table: "turma", name: "idx__turma__id_curso_fk" },
      { table: "diario", name: "idx__diario__id_calendario_letivo_fk" },
      { table: "diario", name: "idx__diario__id_turma_fk" },
      { table: "diario", name: "idx__diario__id_disciplina_fk" },
      { table: "diario_professor", name: "idx__diario_professor__id_diario_fk" },
      { table: "diario_professor", name: "idx__diario_professor__id_perfil_fk" },
      { table: "calendario_letivo", name: "idx__calendario_letivo__id_campus_fk" },
    ];

    for (const { table, name } of indexes) {
      await queryRunner.dropIndex(table, name);
    }
  }
}
