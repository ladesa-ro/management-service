import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOfertaFormacaoNivelFormacao1742516280000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_nivel_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_nivel_formacao_fk", type: "uuid", isNullable: false },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_nivel_formacao__depende__nivel_formacao",
            columnNames: ["id_nivel_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "nivel_formacao",
          },
          {
            name: "fk__oferta_formacao_nivel_formacao__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao_nivel_formacao')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("oferta_formacao_nivel_formacao", true, true, true);
  }
}
