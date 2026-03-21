import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsuario1742515800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuario",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: true },
          { name: "matricula", type: "text", isNullable: true },
          { name: "email", type: "text", isNullable: true },
          { name: "id_imagem_perfil_fk", type: "uuid", isNullable: true },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "is_super_user", type: "boolean", isNullable: false, default: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__usuario__depende__imagem_perfil",
            columnNames: ["id_imagem_perfil_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "fk__usuario__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('usuario')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuario", true, true, true);
  }
}
