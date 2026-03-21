import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableDiarioProfessor1742516880000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diario_professor",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "situacao", type: "boolean", isNullable: false },
          { name: "id_diario_fk", type: "uuid", isNullable: false },
          { name: "id_perfil_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__diario_professor__depende__diario",
            columnNames: ["id_diario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "diario",
          },
          {
            name: "fk__diario_professor__depende__perfil",
            columnNames: ["id_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "perfil",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('diario_professor')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diario_professor", true, true, true);
  }
}
