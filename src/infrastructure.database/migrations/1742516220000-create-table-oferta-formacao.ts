import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOfertaFormacao1742516220000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "oferta_formacao",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "nome", type: "text", isNullable: false },
          { name: "apelido", type: "text", isNullable: false },
          { name: "duracao_periodo_em_meses", type: "integer", isNullable: true },
          { name: "id_modalidade_fk", type: "uuid", isNullable: false },
          { name: "id_campus_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__oferta_formacao__depende__modalidade",
            columnNames: ["id_modalidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "modalidade",
          },
          {
            name: "fk__oferta_formacao__depende__campus",
            columnNames: ["id_campus_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "campus",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('oferta_formacao')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("oferta_formacao", true, true, true);
  }
}
