import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAmbiente1742515980000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ambiente",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "descricao", type: "text", isNullable: true },
          { name: "codigo", type: "text", isNullable: false },
          { name: "capacidade", type: "int", isNullable: true },
          { name: "tipo", type: "text", isNullable: true },
          { name: "id_bloco_fk", type: "uuid", isNullable: false },
          { name: "id_imagem_capa_fk", type: "uuid", isNullable: true },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__ambiente__depende__bloco",
            columnNames: ["id_bloco_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "bloco",
          },
          {
            name: "fk__ambiente__depende__imagem_capa",
            columnNames: ["id_imagem_capa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "imagem",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('ambiente')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ambiente", true, true, true);
  }
}
