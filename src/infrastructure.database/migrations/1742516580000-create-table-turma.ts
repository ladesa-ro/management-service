import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTurma1742516580000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "turma",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "periodo", type: "text", isNullable: false },
          { name: "id_ambiente_padrao_aula_fk", type: "uuid", isNullable: true },
          { name: "id_curso_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__turma__depende__ambiente",
            columnNames: ["id_ambiente_padrao_aula_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "ambiente",
            onDelete: "SET NULL",
          },
          {
            name: "fk__turma__depende__curso",
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
          },
          {
            name: "fk__turma__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('turma')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("turma", true, true, true);
  }
}
