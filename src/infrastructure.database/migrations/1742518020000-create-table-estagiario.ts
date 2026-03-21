import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEstagiario1742518020000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estagiario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "id_curso_fk", type: "uuid", isNullable: false },
          { name: "id_turma_fk", type: "uuid", isNullable: false },
          { name: "telefone", type: "varchar(15)", isNullable: false },
          { name: "data_nascimento", type: "date", isNullable: false },
          { name: "email_institucional", type: "text", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__estagiario__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
          {
            name: "fk__estagiario__depende__curso",
            columnNames: ["id_curso_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "curso",
          },
          {
            name: "fk__estagiario__depende__turma",
            columnNames: ["id_turma_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('estagiario')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estagiario", true, true, true);
  }
}
