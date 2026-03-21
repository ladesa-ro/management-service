import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePerfil1742516040000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "perfil",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "ativo", type: "boolean", isNullable: false, default: true },
          { name: "cargo", type: "text", isNullable: false },
          { name: "apelido", type: "text", isNullable: true },
          { name: "id_usuario_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__perfil__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
          {
            name: "fk__perfil__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('perfil')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("perfil", true, true, true);
  }
}
