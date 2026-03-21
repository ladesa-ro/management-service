import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableImagemArquivo1742515740000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "imagem_arquivo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "largura", type: "int", isNullable: false },
          { name: "altura", type: "int", isNullable: false },
          { name: "formato", type: "text", isNullable: false },
          { name: "mime_type", type: "text", isNullable: false },
          { name: "id_imagem_fk", type: "uuid", isNullable: false },
          { name: "id_arquivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__imagem_arquivo__depende__imagem",
            columnNames: ["id_imagem_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
          },
          {
            name: "fk__imagem_arquivo__depende__arquivo",
            columnNames: ["id_arquivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "arquivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('imagem_arquivo')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("imagem_arquivo", true, true, true);
  }
}
