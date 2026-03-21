import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOfertaFormacaoPeriodo1742516340000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_periodo",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_oferta_formacao_fk", type: "uuid", isNullable: false },
          { name: "numero_periodo", type: "integer", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_periodo__depende__oferta_formacao",
            columnNames: ["id_oferta_formacao_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("oferta_formacao_periodo", true, true, true);
  }
}
