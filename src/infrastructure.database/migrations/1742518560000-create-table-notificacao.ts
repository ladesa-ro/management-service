import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableNotificacao1742518560000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notificacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "titulo", type: "text", isNullable: false },
          { name: "conteudo", type: "text", isNullable: false },
          { name: "lida", type: "boolean", isNullable: false, default: false },
          { name: "id_usuario_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
        ],
        foreignKeys: [
          {
            name: "fk__notificacao__depende__usuario",
            columnNames: ["id_usuario_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuario",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notificacao", true, true, true);
  }
}
