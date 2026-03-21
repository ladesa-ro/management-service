import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCalendarioLetivoEtapa1742516760000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "calendario_letivo_etapa",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, default: "gen_random_uuid()" },
          { name: "data_inicio", type: "date", isNullable: false },
          { name: "data_termino", type: "date", isNullable: false },
          { name: "id_oferta_formacao_periodo_etapa_fk", type: "uuid", isNullable: false },
          { name: "id_calendario_letivo_fk", type: "uuid", isNullable: false },
          { name: "date_created", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_updated", type: "timestamptz", isNullable: false, default: "NOW()" },
          { name: "date_deleted", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "fk__calendario_letivo_etapa__depende__oferta_formacao_periodo_etapa",
            columnNames: ["id_oferta_formacao_periodo_etapa_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "oferta_formacao_periodo_etapa",
          },
          {
            name: "fk__calendario_letivo_etapa__depende__calendario_letivo",
            columnNames: ["id_calendario_letivo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "calendario_letivo",
          },
        ],
      }),
    );
    await queryRunner.query(`CALL ensure_change_date_trigger('calendario_letivo_etapa')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("calendario_letivo_etapa", true, true, true);
  }
}
