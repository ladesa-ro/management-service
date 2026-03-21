import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableDiario1742516820000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "id_disciplina_fk", type: "uuid", isNullable: false },
          { name: "id_ambiente_padrao_fk", type: "uuid", isNullable: true },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__diario__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
          {
            name: "fk__diario__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
          {
            name: "fk__diario__depende__disciplina",
            columnNames: ["id_disciplina_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "disciplina",
          },
          {
            name: "fk__diario__depende__ambiente",
            columnNames: ["id_ambiente_padrao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
            onDelete: "SET NULL",
          },
          {
            name: "fk__diario__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('diario')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diario", true, true, true);
  }
}
