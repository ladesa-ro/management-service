import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOfertaFormacaoPeriodoEtapa1742516400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao_periodo_etapa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "id_oferta_formacao_periodo_fk", type: "uuid", isNullable: false },
          { name: "nome", type: "text", isNullable: false },
          { name: "cor", type: "text", isNullable: false },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao_periodo_etapa__depende__oferta_formacao_periodo",
            columnNames: ["id_oferta_formacao_periodo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao_periodo",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("oferta_formacao_periodo_etapa", true, true, true);
  }
}
